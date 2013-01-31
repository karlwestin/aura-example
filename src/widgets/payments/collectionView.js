define(['sandbox', './itemView'], function(sandbox, ItemView) {
  return sandbox.mvc.View({
    add: function(model) {
      this.views[model.cid] = new ItemView({ model: model });
      this.$payments.prepend(this.views[model.cid].el);
      this.views[model.cid].edit();
    }, 
    events: {
      "click .js_new": "newPayment"
    },
    initialize: function() {
      this.views = {};
      this.collection.on("add", this.add, this);
      this.collection.on("remove", this.remove, this);
      this.$el.append("<p><button class='js_new'>New Payment</button></p><hr>");
      this.$payments = $("<div class='payments'/>");
      this.$el.append(this.$payments);
    },
    newPayment: function(e) {
      e.preventDefault();
      var model = new this.collection.model();
      this.collection.add(model);
    },
    remove: function(model) {
      var view = this.views[model.cid];
      if(view) {
        view.off();
        view.$el.detach();
        delete this.views[model.cid];
      }
    }
  });
});
