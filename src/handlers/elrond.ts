import {
    Account,
    Address,
    AddressValue,
    Balance,
    BigUIntType,
    BigUIntValue,
    BinaryCodec,
    BytesValue,
    ContractFunction,
    EnumType,
    EnumVariantDefinition,
    //decodeString,
    GasLimit,
    ISigner,
    ListType,
    NetworkConfig,
    parseUserKey,
    ProxyProvider,
    StructFieldDefinition,
    StructType,
    Transaction,
    TransactionPayload,
    U32Value,
    U8Type,
    UserSigner,
} from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';
import { Socket } from 'socket.io-client';
import { ChainEmitter, ChainListener, ScCallEvent , TransferEvent, UnfreezeEvent } from '../chain_handler';


const unfreeze_event_t = new StructType("Unfreeze", [
    new StructFieldDefinition("to", "", new ListType(new U8Type())),
    new StructFieldDefinition("value", "", new BigUIntType())
]);

const rpc_event_t = new StructType("Rpc", [
    new StructFieldDefinition("to", "", new ListType(new U8Type())),
    new StructFieldDefinition("value", "", new BigUIntType()),
    new StructFieldDefinition("endpoint", "", new ListType(new U8Type())),
    new StructFieldDefinition("args", "", new ListType(new ListType(new U8Type)))
]);

const event_t = new EnumType("Event", [
    new EnumVariantDefinition("Unfreeze", 0),
    new EnumVariantDefinition("Rpc", 1)
])

const event_info_t = new StructType("EventInfo", [
    new StructFieldDefinition("event", "", event_t),
    new StructFieldDefinition("read_cnt", "", new BigUIntType())
]);

export class ElrondHelper implements ChainListener<TransferEvent | ScCallEvent>, ChainEmitter<string, void, UnfreezeEvent | ScCallEvent> {
    private readonly provider: ProxyProvider;
    private readonly sender: Account;
    private readonly signer: ISigner;
    private readonly mintContract: Address;
    private readonly eventSocket: Socket;

    private constructor(provider: ProxyProvider, sender: Account, signer: ISigner, mintContract: Address, eventSocket: Socket) {
        this.provider = provider;
        this.sender = sender;
        this.signer = signer;
        this.mintContract = mintContract;
        this.eventSocket = eventSocket;
    }

    async eventIter(cb: (event: string) => Promise<void>): Promise<void> {
        this.eventSocket.on("elrond:transfer_event", async (id) => await cb(id))
    }

    public static new = async (node_uri: string, secret_key: string, sender: string, minter: string, socket: Socket): Promise<ElrondHelper> => {
        const provider = new ProxyProvider(node_uri);
        await NetworkConfig.getDefault().sync(provider);
        const eMinterAddr = new Address(sender);
        const senderac = new Account(eMinterAddr);
        const signer = new UserSigner(parseUserKey(secret_key));
    
        return new ElrondHelper(
            provider,
            senderac,
            signer,
            new Address(minter),
            socket
        );
    }

    async eventHandler(id: string): Promise<UnfreezeEvent | undefined> {
        const rpc_ev = await this.eventDecoder(id);
        console.log(JSON.stringify(rpc_ev));
        return undefined;
    }

    async emittedEventHandler(event: TransferEvent | ScCallEvent): Promise<void> {
        let tx: Transaction;
        if (event instanceof TransferEvent) {
            tx = await this.transferMintVerify(event);
        } else if (event instanceof ScCallEvent) {
            tx = await this.scCallVerify(event);
        } else {
            throw Error("Unsupported event!");
        }
        console.log(`Elrond event hash: ${tx.getHash().toString()}`)
    }

    private async transferMintVerify({ action_id, to, value }: TransferEvent): Promise<Transaction> {
        await this.sender.sync(this.provider);

        const tx = new Transaction({
            receiver: this.mintContract,
            nonce: this.sender.nonce,
            gasLimit: new GasLimit(50000000),
            data: TransactionPayload.contractCall()
                .setFunction(new ContractFunction('validateSendXp'))
                .addArg(new BigUIntValue(action_id))
                .addArg(new AddressValue(new Address(to)))
                .addArg(new U32Value(value))
                .build(),
        });
    
        this.signer.sign(tx);
        await tx.send(this.provider);

        return tx;
    }

    private async eventDecoder(id: string): Promise<UnfreezeEvent | ScCallEvent | undefined> {
        await this.sender.sync(this.provider);
    
        const tx = new Transaction({
            receiver: this.mintContract,
            nonce: this.sender.nonce,
            gasLimit: new GasLimit(50000000),
            data: TransactionPayload.contractCall()
                .setFunction(new ContractFunction("eventRead"))
                .addArg(new BigUIntValue(new BigNumber(id)))
                .build(),
        });
    
        this.signer.sign(tx);
        await tx.send(this.provider);
    
        await tx.awaitExecuted(this.provider);
        console.log(`tx hash: ${tx.getHash().toString()}`)
        const res =  (await tx.getAsOnNetwork(this.provider)).getSmartContractResults();
        const data = res.getImmediate().outputUntyped();
        const decoder = new BinaryCodec();
        const evi = decoder.decodeTopLevel(data[0], event_info_t).valueOf();
        console.log(`ev: ${JSON.stringify(evi)}`);
        if (evi["info"][0] == 0) {
            const unfreeze = decoder.decodeTopLevel(evi["info"].slice(1), unfreeze_event_t).valueOf();
            return new UnfreezeEvent(
                new BigNumber(id),
                Buffer.from((unfreeze["to"])).toString(),
                new BigNumber(Number(unfreeze["value"] as BigInt))
            )
        } else if (evi["info"][0] == 1) {
            const rpc = decoder.decodeTopLevel(evi["info"].slice(1), rpc_event_t).valueOf();
            return new ScCallEvent(
                new BigNumber(id),
                Buffer.from((rpc["to"])).toString(),
                new BigNumber(Number(rpc["value"] as BigInt)),
                Buffer.from(rpc["endpoint"]).toString(),
                rpc["args"].map((s: any) => Buffer.from(s).toString())
            )
        } else {
            return undefined;
        }
    }

    async scCallVerify({
        action_id,
        to,
        value,
        endpoint,
        args
    }: ScCallEvent): Promise<Transaction> {
        await this.sender.sync(this.provider)
    
        // fn validate_sc_call(action_id: BigUint, to: Address, endpoint: BoxedBytes, #[var_args] args: VarArgs<BoxedBytes>,)
        let payloadBuilder = TransactionPayload.contractCall()
            .setFunction(new ContractFunction("validateSCCall"))
            .addArg(new BigUIntValue(action_id))
            .addArg(new AddressValue(new Address(to)))
            .addArg(BytesValue.fromUTF8(endpoint))
    
        for (const buf of args ?? []) {
            payloadBuilder = payloadBuilder.addArg(BytesValue.fromHex(buf));
        }
    
        console.log(`args: ${JSON.stringify(payloadBuilder)}`)
    
        const tx = new Transaction({
            receiver: this.mintContract,
            nonce: this.sender.nonce,
            gasLimit: new GasLimit(80000000),
            data: payloadBuilder.build(),
            value: Balance.egld(value)
        });
    
        this.signer.sign(tx);
        await tx.send(this.provider);
    
        return tx;
    }
}