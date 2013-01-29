define([
  'sandbox'
], function(
  sandbox
) {
  return function(options) {
    console.log("sender started");
    function send() {
      sandbox.emit("sender.what", "message");
    }
    setTimeout(send, 1000);

    sandbox.on("receiver.what", function(e) {
      console.log("sender received from receiver", e);
    });

  };
});
