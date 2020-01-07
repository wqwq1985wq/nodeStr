// /*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
// "use strict";
// var test = require("./test")
// var $protobuf = require("protobufjs/minimal");

// // Common aliases
// var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// // Exported root namespace
// var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

// $root.msg = (function() {

//     /**
//      * Namespace msg.
//      * @exports msg
//      * @namespace
//      */
//     var msg = {};

//     msg.Login = (function() {

//         /**
//          * Properties of a Login.
//          * @memberof msg
//          * @interface ILogin
//          * @property {string|null} [name] Login name
//          * @property {string|null} [pwd] Login pwd
//          */

//         /**
//          * Constructs a new Login.
//          * @memberof msg
//          * @classdesc Represents a Login.
//          * @implements ILogin
//          * @constructor
//          * @param {msg.ILogin=} [properties] Properties to set
//          */
//         function Login(properties) {
//             if (properties)
//                 for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
//                     if (properties[keys[i]] != null)
//                         this[keys[i]] = properties[keys[i]];
//         }

//         /**
//          * Login name.
//          * @member {string} name
//          * @memberof msg.Login
//          * @instance
//          */
//         Login.prototype.name = "";

//         /**
//          * Login pwd.
//          * @member {string} pwd
//          * @memberof msg.Login
//          * @instance
//          */
//         Login.prototype.pwd = "";

//         /**
//          * Creates a new Login instance using the specified properties.
//          * @function create
//          * @memberof msg.Login
//          * @static
//          * @param {msg.ILogin=} [properties] Properties to set
//          * @returns {msg.Login} Login instance
//          */
//         Login.create = function create(properties) {
//             return new Login(properties);
//         };

//         /**
//          * Encodes the specified Login message. Does not implicitly {@link msg.Login.verify|verify} messages.
//          * @function encode
//          * @memberof msg.Login
//          * @static
//          * @param {msg.ILogin} message Login message or plain object to encode
//          * @param {$protobuf.Writer} [writer] Writer to encode to
//          * @returns {$protobuf.Writer} Writer
//          */
//         Login.encode = function encode(message, writer) {
//             if (!writer)
//                 writer = $Writer.create();
//             if (message.name != null && message.hasOwnProperty("name"))
//                 writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
//             if (message.pwd != null && message.hasOwnProperty("pwd"))
//                 writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
//             return writer;
//         };

//         /**
//          * Encodes the specified Login message, length delimited. Does not implicitly {@link msg.Login.verify|verify} messages.
//          * @function encodeDelimited
//          * @memberof msg.Login
//          * @static
//          * @param {msg.ILogin} message Login message or plain object to encode
//          * @param {$protobuf.Writer} [writer] Writer to encode to
//          * @returns {$protobuf.Writer} Writer
//          */
//         Login.encodeDelimited = function encodeDelimited(message, writer) {
//             return this.encode(message, writer).ldelim();
//         };

//         /**
//          * Decodes a Login message from the specified reader or buffer.
//          * @function decode
//          * @memberof msg.Login
//          * @static
//          * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
//          * @param {number} [length] Message length if known beforehand
//          * @returns {msg.Login} Login
//          * @throws {Error} If the payload is not a reader or valid buffer
//          * @throws {$protobuf.util.ProtocolError} If required fields are missing
//          */
//         Login.decode = function decode(reader, length) {
//             if (!(reader instanceof $Reader))
//                 reader = $Reader.create(reader);
//             var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg.Login();
//             while (reader.pos < end) {
//                 var tag = reader.uint32();
//                 switch (tag >>> 3) {
//                 case 1:
//                     message.name = reader.string();
//                     break;
//                 case 2:
//                     message.pwd = reader.string();
//                     break;
//                 default:
//                     reader.skipType(tag & 7);
//                     break;
//                 }
//             }
//             return message;
//         };

//         /**
//          * Decodes a Login message from the specified reader or buffer, length delimited.
//          * @function decodeDelimited
//          * @memberof msg.Login
//          * @static
//          * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
//          * @returns {msg.Login} Login
//          * @throws {Error} If the payload is not a reader or valid buffer
//          * @throws {$protobuf.util.ProtocolError} If required fields are missing
//          */
//         Login.decodeDelimited = function decodeDelimited(reader) {
//             if (!(reader instanceof $Reader))
//                 reader = new $Reader(reader);
//             return this.decode(reader, reader.uint32());
//         };

//         /**
//          * Verifies a Login message.
//          * @function verify
//          * @memberof msg.Login
//          * @static
//          * @param {Object.<string,*>} message Plain object to verify
//          * @returns {string|null} `null` if valid, otherwise the reason why it is not
//          */
//         Login.verify = function verify(message) {
//             if (typeof message !== "object" || message === null)
//                 return "object expected";
//             if (message.name != null && message.hasOwnProperty("name"))
//                 if (!$util.isString(message.name))
//                     return "name: string expected";
//             if (message.pwd != null && message.hasOwnProperty("pwd"))
//                 if (!$util.isString(message.pwd))
//                     return "pwd: string expected";
//             return null;
//         };

//         /**
//          * Creates a Login message from a plain object. Also converts values to their respective internal types.
//          * @function fromObject
//          * @memberof msg.Login
//          * @static
//          * @param {Object.<string,*>} object Plain object
//          * @returns {msg.Login} Login
//          */
//         Login.fromObject = function fromObject(object) {
//             if (object instanceof $root.msg.Login)
//                 return object;
//             var message = new $root.msg.Login();
//             if (object.name != null)
//                 message.name = String(object.name);
//             if (object.pwd != null)
//                 message.pwd = String(object.pwd);
//             return message;
//         };

//         /**
//          * Creates a plain object from a Login message. Also converts values to other types if specified.
//          * @function toObject
//          * @memberof msg.Login
//          * @static
//          * @param {msg.Login} message Login
//          * @param {$protobuf.IConversionOptions} [options] Conversion options
//          * @returns {Object.<string,*>} Plain object
//          */
//         Login.toObject = function toObject(message, options) {
//             if (!options)
//                 options = {};
//             var object = {};
//             if (options.defaults) {
//                 object.name = "";
//                 object.pwd = "";
//             }
//             if (message.name != null && message.hasOwnProperty("name"))
//                 object.name = message.name;
//             if (message.pwd != null && message.hasOwnProperty("pwd"))
//                 object.pwd = message.pwd;
//             return object;
//         };

//         /**
//          * Converts this Login to JSON.
//          * @function toJSON
//          * @memberof msg.Login
//          * @instance
//          * @returns {Object.<string,*>} JSON object
//          */
//         Login.prototype.toJSON = function toJSON() {
//             return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
//         };

//         return Login;
//     })();

//     return msg;
// })();

// $root.msg2 = (function() {

//     /**
//      * Namespace msg2.
//      * @exports msg2
//      * @namespace
//      */
//     var msg2 = {};

//     msg2.Login2 = (function() {

//         /**
//          * Properties of a Login2.
//          * @memberof msg2
//          * @interface ILogin2
//          * @property {string|null} [name2] Login2 name2
//          * @property {string|null} [pwd2] Login2 pwd2
//          */

//         /**
//          * Constructs a new Login2.
//          * @memberof msg2
//          * @classdesc Represents a Login2.
//          * @implements ILogin2
//          * @constructor
//          * @param {msg2.ILogin2=} [properties] Properties to set
//          */
//         function Login2(properties) {
//             if (properties)
//                 for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
//                     if (properties[keys[i]] != null)
//                         this[keys[i]] = properties[keys[i]];
//         }

//         /**
//          * Login2 name2.
//          * @member {string} name2
//          * @memberof msg2.Login2
//          * @instance
//          */
//         Login2.prototype.name2 = "";

//         /**
//          * Login2 pwd2.
//          * @member {string} pwd2
//          * @memberof msg2.Login2
//          * @instance
//          */
//         Login2.prototype.pwd2 = "";

//         /**
//          * Creates a new Login2 instance using the specified properties.
//          * @function create
//          * @memberof msg2.Login2
//          * @static
//          * @param {msg2.ILogin2=} [properties] Properties to set
//          * @returns {msg2.Login2} Login2 instance
//          */
//         Login2.create = function create(properties) {
//             return new Login2(properties);
//         };

//         /**
//          * Encodes the specified Login2 message. Does not implicitly {@link msg2.Login2.verify|verify} messages.
//          * @function encode
//          * @memberof msg2.Login2
//          * @static
//          * @param {msg2.ILogin2} message Login2 message or plain object to encode
//          * @param {$protobuf.Writer} [writer] Writer to encode to
//          * @returns {$protobuf.Writer} Writer
//          */
//         Login2.encode = function encode(message, writer) {
//             if (!writer)
//                 writer = $Writer.create();
//             if (message.name2 != null && message.hasOwnProperty("name2"))
//                 writer.uint32(/* id 1, wireType 2 =*/10).string(message.name2);
//             if (message.pwd2 != null && message.hasOwnProperty("pwd2"))
//                 writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd2);
//             return writer;
//         };

//         /**
//          * Encodes the specified Login2 message, length delimited. Does not implicitly {@link msg2.Login2.verify|verify} messages.
//          * @function encodeDelimited
//          * @memberof msg2.Login2
//          * @static
//          * @param {msg2.ILogin2} message Login2 message or plain object to encode
//          * @param {$protobuf.Writer} [writer] Writer to encode to
//          * @returns {$protobuf.Writer} Writer
//          */
//         Login2.encodeDelimited = function encodeDelimited(message, writer) {
//             return this.encode(message, writer).ldelim();
//         };

//         /**
//          * Decodes a Login2 message from the specified reader or buffer.
//          * @function decode
//          * @memberof msg2.Login2
//          * @static
//          * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
//          * @param {number} [length] Message length if known beforehand
//          * @returns {msg2.Login2} Login2
//          * @throws {Error} If the payload is not a reader or valid buffer
//          * @throws {$protobuf.util.ProtocolError} If required fields are missing
//          */
//         Login2.decode = function decode(reader, length) {
//             if (!(reader instanceof $Reader))
//                 reader = $Reader.create(reader);
//             var end = length === undefined ? reader.len : reader.pos + length, message = new $root.msg2.Login2();
//             while (reader.pos < end) {
//                 var tag = reader.uint32();
//                 switch (tag >>> 3) {
//                 case 1:
//                     message.name2 = reader.string();
//                     break;
//                 case 2:
//                     message.pwd2 = reader.string();
//                     break;
//                 default:
//                     reader.skipType(tag & 7);
//                     break;
//                 }
//             }
//             return message;
//         };

//         /**
//          * Decodes a Login2 message from the specified reader or buffer, length delimited.
//          * @function decodeDelimited
//          * @memberof msg2.Login2
//          * @static
//          * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
//          * @returns {msg2.Login2} Login2
//          * @throws {Error} If the payload is not a reader or valid buffer
//          * @throws {$protobuf.util.ProtocolError} If required fields are missing
//          */
//         Login2.decodeDelimited = function decodeDelimited(reader) {
//             if (!(reader instanceof $Reader))
//                 reader = new $Reader(reader);
//             return this.decode(reader, reader.uint32());
//         };

//         /**
//          * Verifies a Login2 message.
//          * @function verify
//          * @memberof msg2.Login2
//          * @static
//          * @param {Object.<string,*>} message Plain object to verify
//          * @returns {string|null} `null` if valid, otherwise the reason why it is not
//          */
//         Login2.verify = function verify(message) {
//             if (typeof message !== "object" || message === null)
//                 return "object expected";
//             if (message.name2 != null && message.hasOwnProperty("name2"))
//                 if (!$util.isString(message.name2))
//                     return "name2: string expected";
//             if (message.pwd2 != null && message.hasOwnProperty("pwd2"))
//                 if (!$util.isString(message.pwd2))
//                     return "pwd2: string expected";
//             return null;
//         };

//         /**
//          * Creates a Login2 message from a plain object. Also converts values to their respective internal types.
//          * @function fromObject
//          * @memberof msg2.Login2
//          * @static
//          * @param {Object.<string,*>} object Plain object
//          * @returns {msg2.Login2} Login2
//          */
//         Login2.fromObject = function fromObject(object) {
//             if (object instanceof $root.msg2.Login2)
//                 return object;
//             var message = new $root.msg2.Login2();
//             if (object.name2 != null)
//                 message.name2 = String(object.name2);
//             if (object.pwd2 != null)
//                 message.pwd2 = String(object.pwd2);
//             return message;
//         };

//         /**
//          * Creates a plain object from a Login2 message. Also converts values to other types if specified.
//          * @function toObject
//          * @memberof msg2.Login2
//          * @static
//          * @param {msg2.Login2} message Login2
//          * @param {$protobuf.IConversionOptions} [options] Conversion options
//          * @returns {Object.<string,*>} Plain object
//          */
//         Login2.toObject = function toObject(message, options) {
//             if (!options)
//                 options = {};
//             var object = {};
//             if (options.defaults) {
//                 object.name2 = "";
//                 object.pwd2 = "";
//             }
//             if (message.name2 != null && message.hasOwnProperty("name2"))
//                 object.name2 = message.name2;
//             if (message.pwd2 != null && message.hasOwnProperty("pwd2"))
//                 object.pwd2 = message.pwd2;
//             return object;
//         };

//         /**
//          * Converts this Login2 to JSON.
//          * @function toJSON
//          * @memberof msg2.Login2
//          * @instance
//          * @returns {Object.<string,*>} JSON object
//          */
//         Login2.prototype.toJSON = function toJSON() {
//             return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
//         };

//         return Login2;
//     })();

//     return msg2;
// })();

// module.exports = $root;
