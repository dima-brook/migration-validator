"use strict";
// source: nft.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();
goog.exportSymbol('proto.NftEthNative', null, global);
goog.exportSymbol('proto.NftEthNative.NftKind', null, global);
goog.exportSymbol('proto.NftPacked', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.NftPacked = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.NftPacked, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.NftPacked.displayName = 'proto.NftPacked';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.NftEthNative = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.NftEthNative, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.NftEthNative.displayName = 'proto.NftEthNative';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.NftPacked.prototype.toObject = function (opt_includeInstance) {
        return proto.NftPacked.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.NftPacked} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.NftPacked.toObject = function (includeInstance, msg) {
        var f, obj = {
            chainNonce: jspb.Message.getFieldWithDefault(msg, 1, 0),
            data: msg.getData_asB64()
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.NftPacked}
 */
proto.NftPacked.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.NftPacked;
    return proto.NftPacked.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.NftPacked} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.NftPacked}
 */
proto.NftPacked.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {number} */ (reader.readUint32());
                msg.setChainNonce(value);
                break;
            case 2:
                var value = /** @type {!Uint8Array} */ (reader.readBytes());
                msg.setData(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.NftPacked.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.NftPacked.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.NftPacked} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.NftPacked.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getChainNonce();
    if (f !== 0) {
        writer.writeUint32(1, f);
    }
    f = message.getData_asU8();
    if (f.length > 0) {
        writer.writeBytes(2, f);
    }
};
/**
 * optional uint32 chain_nonce = 1;
 * @return {number}
 */
proto.NftPacked.prototype.getChainNonce = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/**
 * @param {number} value
 * @return {!proto.NftPacked} returns this
 */
proto.NftPacked.prototype.setChainNonce = function (value) {
    return jspb.Message.setProto3IntField(this, 1, value);
};
/**
 * optional bytes data = 2;
 * @return {!(string|Uint8Array)}
 */
proto.NftPacked.prototype.getData = function () {
    return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/**
 * optional bytes data = 2;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.NftPacked.prototype.getData_asB64 = function () {
    return /** @type {string} */ (jspb.Message.bytesAsB64(this.getData()));
};
/**
 * optional bytes data = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.NftPacked.prototype.getData_asU8 = function () {
    return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(this.getData()));
};
/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.NftPacked} returns this
 */
proto.NftPacked.prototype.setData = function (value) {
    return jspb.Message.setProto3BytesField(this, 2, value);
};
if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.NftEthNative.prototype.toObject = function (opt_includeInstance) {
        return proto.NftEthNative.toObject(opt_includeInstance, this);
    };
    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.NftEthNative} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.NftEthNative.toObject = function (includeInstance, msg) {
        var f, obj = {
            nftKind: jspb.Message.getFieldWithDefault(msg, 1, 0),
            id: jspb.Message.getFieldWithDefault(msg, 2, ""),
            contractAddr: jspb.Message.getFieldWithDefault(msg, 3, "")
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.NftEthNative}
 */
proto.NftEthNative.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.NftEthNative;
    return proto.NftEthNative.deserializeBinaryFromReader(msg, reader);
};
/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.NftEthNative} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.NftEthNative}
 */
proto.NftEthNative.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = /** @type {!proto.NftEthNative.NftKind} */ (reader.readEnum());
                msg.setNftKind(value);
                break;
            case 2:
                var value = /** @type {string} */ (reader.readString());
                msg.setId(value);
                break;
            case 3:
                var value = /** @type {string} */ (reader.readString());
                msg.setContractAddr(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.NftEthNative.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.NftEthNative.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.NftEthNative} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.NftEthNative.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getNftKind();
    if (f !== 0.0) {
        writer.writeEnum(1, f);
    }
    f = message.getId();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getContractAddr();
    if (f.length > 0) {
        writer.writeString(3, f);
    }
};
/**
 * @enum {number}
 */
proto.NftEthNative.NftKind = {
    ERC721: 0,
    ERC1155: 1
};
/**
 * optional NftKind nft_kind = 1;
 * @return {!proto.NftEthNative.NftKind}
 */
proto.NftEthNative.prototype.getNftKind = function () {
    return /** @type {!proto.NftEthNative.NftKind} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};
/**
 * @param {!proto.NftEthNative.NftKind} value
 * @return {!proto.NftEthNative} returns this
 */
proto.NftEthNative.prototype.setNftKind = function (value) {
    return jspb.Message.setProto3EnumField(this, 1, value);
};
/**
 * optional string id = 2;
 * @return {string}
 */
proto.NftEthNative.prototype.getId = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};
/**
 * @param {string} value
 * @return {!proto.NftEthNative} returns this
 */
proto.NftEthNative.prototype.setId = function (value) {
    return jspb.Message.setProto3StringField(this, 2, value);
};
/**
 * optional string contract_addr = 3;
 * @return {string}
 */
proto.NftEthNative.prototype.getContractAddr = function () {
    return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};
/**
 * @param {string} value
 * @return {!proto.NftEthNative} returns this
 */
proto.NftEthNative.prototype.setContractAddr = function (value) {
    return jspb.Message.setProto3StringField(this, 3, value);
};
goog.object.extend(exports, proto);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0X3BiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2VuY29kaW5nL3Byb3QvbmZ0X3BiLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7R0FPRztBQUNILGlDQUFpQztBQUNqQyxvQkFBb0I7QUFDcEIsY0FBYztBQUVkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztBQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRDs7Ozs7Ozs7O0dBU0c7QUFDSCxLQUFLLENBQUMsU0FBUyxHQUFHLFVBQVMsUUFBUTtJQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7SUFDM0I7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7Q0FDakQ7QUFDRDs7Ozs7Ozs7O0dBU0c7QUFDSCxLQUFLLENBQUMsWUFB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