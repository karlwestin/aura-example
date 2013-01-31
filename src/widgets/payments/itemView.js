define(['sandbox', 'text!./payment.html', 'text!./edit-payment.html'], function(sandbox, ItemTmpl, EditTmpl) {
  function renderMethod() {
    var data = this.model.toJSON();
    var content = this.template(data);
    this.$el.html(content);
  }

  var EditView = sandbox.mvc.View({
    "delete": function(e) {
      e.preventDefault();
      this.model.collection.remove(this.model);
    },
    events: {
      "click .js_save": "save",
      "click .js_delete": "delete"
    },
    render: renderMethod,
    save: function(e) {
      e.preventDefault();
      var data = {
        amount: this.$("#amount").val(),
        date: Date.parse(this.$("#date").val())
      };
      if(this.model.set(data, { validate: true })) {
        this.model.trigger("closeEdit"); // force render item view
        this.undelegateEvents();
      }
    },
    template: _.template(EditTmpl)
  });

  return sandbox.mvc.View({
    edit: function(e) {
      var view = new EditView({ model: this.model });
      view.setElement(this.el);
      view.render();
      if(e) { e.preventDefault(); }
    },
    events: {
      "click .js_edit": "edit"
    },
    initialize: function() {
      // why not using 'change'? Because we don't wanna send re-render signals
      // to other widgets if there's really not a change
      this.model.on("closeEdit", this.render, this);
    },        
    render: renderMethod,
    template: _.template(ItemTmpl)
  });
});
