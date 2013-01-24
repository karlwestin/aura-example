define(['sandbox'], function(sandbox) {
  var Payment = sandbox.mvc.Model({
    defaults: {
      "amount": 5,
      "date": new Date().getTime()
    },
    validate: function(data) {
      if(!data.amount || data.amount <= 0) {
        return "You need an amount";
      }

      if(!data.date || isNaN(data.date)) {
        return "You need a date for the payment";
      }
    }
  });

  function createEmitter(event) {
    return function(model) {
      sandbox.emit("payments", event, model.toJSON());
    };
  }

  var Collection = sandbox.mvc.Collection({
    emitAdd: createEmitter("new"),
    emitChange: createEmitter("change"),
    emitRemove: createEmitter("remove"),
    initialize: function(models, options) {
      this.on("add", this.emitAdd, this);
      this.on("remove", this.emitRemove, this);
      this.on("change", this.emitChange, this);
    },
    model: Payment
  });

  return new Collection();
});
