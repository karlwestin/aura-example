define(['sandbox', 'uid'], function(sandbox, uid) {
  var Payment = sandbox.mvc.Model({
    defaults: function() {
      return {
        "id": uid(),
        "amount": 5,
        "date": new Date().getTime()
      };
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
      sandbox.emit("payments." + event, model.toJSON());
      console.log("published", event, model.toJSON());
    };
  }

  var Collection = sandbox.mvc.Collection({
    emitAdd: createEmitter("add"),
    emitChange: createEmitter("change"),
    emitRemove: createEmitter("remove"),
    initialize: function(models, options) {
      this.on("add", this.emitAdd, this);
      this.on("remove", this.emitRemove, this);
      this.on("change", this.emitChange, this);
    },
    model: Payment
  });

  window.w2 = sandbox;

  return new Collection();
});
