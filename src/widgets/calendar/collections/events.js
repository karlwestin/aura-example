define([
  'sandbox', 
  'aura_perms', 
  '../models/event'
], function(sandbox, permissions, Event) {
  'use strict';

  var Events = sandbox.mvc.Collection({
    addOne: function(model) {
      this.add(model, {});
    },
    initialize: function() {
      sandbox.on("payments.add", this.addOne, this);
      sandbox.on("payments.remove", this.removeOne, this);
    },
    model: Event,

    localStorage: new sandbox.data.Store('events-backbone-require'),

    removeOne: function(model) {
      this.remove(this.get(model.id));
    }
  });

  return Events;
});
