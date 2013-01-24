define(['sandbox'], function(sandbox) {
  var ErrorView = sandbox.mvc.View({
    initialize: function(options) {
      var str = "Error: " + (options.failedName || "This widget");
      str += " couldn't load";
      this.el.innerHTML = str;
    }
  });
  return function(options) {
    new ErrorView({ 
      el: sandbox.dom.find(options.element), 
      failedName: options.failedName 
    });
  };
});
