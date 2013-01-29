define([
  'sandbox',
  'aura_core'
], function(
  sandbox,
  core
) {
  return function(options) {
    sandbox.on("sender.what",  function(e) {
      console.log("message received", "message");
    }, {});

    function what() {
      sandbox.emit("receiver.what", "message from receiver");
    }

    setTimeout(what, 2000);
    console.log("receiver started");
  };
});
