define([
  'sandbox', 
  'aura_perms', 
  '../models/event'
], function(sandbox, permissions, Event) {
  'use strict';

  function pre(model) {
    model.title = "Payment of $" + model.amount;
    return model;
  }

  var Events = sandbox.mvc.Collection({
    addOne: function(model) {
      this.add(pre(model), {});
    },
    initialize: function() {
      sandbox.on("payments.add", this.addOne, this);
      sandbox.on("payments.remove", this.removeOne, this);
      sandbox.on("payments.change", this.update, this);
    },
    model: Event,

    localStorage: new sandbox.data.Store('events-backbone-require'),

    removeOne: function(model) {
      this.remove(this.get(model.id));
    },

    update: function(model) {
      this.get(model.id).set(pre(model));
    }
  });

  return Events;
});
