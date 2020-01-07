var protobuf = require("protobufjs");
protobuf.load("awesome.proto", function(err, root) {
    if (err)
        throw err;
 
    // Obtain a message type
    var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
 
    // Exemplary payload
    var payload = { awesomeField: "AwesomeString" };
 
    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);
 
    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
    console.log(message.awesomeField)
    // Encode a message to an Uint8Array (browser) or Buffer (node)
    var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer
 
    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var oriMsg = AwesomeMessage.decode(buffer);
    console.log(oriMsg)
    // ... do something with message
 
    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
 

});