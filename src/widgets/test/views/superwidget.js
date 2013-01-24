define(['sandbox'], function(sandbox) {
  var Super = sandbox.mvc.View({
    initialize: function() {
      this.$el.html("superwidget");
    }
  });
  return Super;
});
