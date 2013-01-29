Shared data in client-side apps: Backbone Aura
==========
When building client-side javascript apps ('single page apps'), 
you'll sooner or later have to figure out how to share data between
different views, widgets, or however you like to think of those different
parts. 

There's about as many different ways of doing this as there are apps, 
and they all seem to have different advantages when it comes to speed and 
memory footprint, flexibility, and guarding against unintended side-effects,
a.k.a bugs. 

Number #1: Allow permissions:
Widgets in Aura can only sand data to allowed sandboxes. This is a way
to prevent unintended consequenses of sandbox chaining.

Backbone Aura permissions are very hard to understand,
seem to require permissions 'on both sides'





sharing via pubsub events

// model is a JSON thingee
sandbox.on("payment.add", function(model) {
  this.events.add(model);
});

// we can't do this anymore
model.on("change", this.render, this);
// because the connection between the payment and the calendar event is lost
// this might be a good thing or bad thing, depending on what you're trying to do

Two possibilities for updating calendar items on a payment change:
----

// listen for change
sandbox.on("payment.change", function(model) {
  // providing the id-types are the same
  var event = this.events.get(model.id); 
  event.set(model);
});

// trust backbone to deal w/ old and new
sandbox.on("payment.add", function(model) {
  // the new 'merge' options in backbone 0.9.9 allows us to do this.
  // providing we use the same id-structure
  this.events.add(model, { merge: true }); 
});

Bootstrapping the data in the calendar:
----
Let's say the calendar is lazily instantiated,
that means it hasn't been 'listening in' on the payments that were created all the time.
Now, all of a sudden, our user wants to see the events calendar, including payments.

### Option 1: 'calendar.new'

One example is that the payments collection could react when there's a new calendar:

```
// payments/collection.js

// in initialize
sandbox.on("calendar.new", emitAll, this);
//
function emitAll() {
  this.each(function(model) {
      sandbox.emit("payment", "add", model);
  });
}

// calendar/main.js

function main() {
  new Calendar();
  sandbox.emit("calendar", "new");
}
```

Note about multiple calendars here: What if some are already 'booted' and knows about the payments?
Again, we can rely on the Backbone Collection's mechanism to keep known id's from duplicate.
Basically, those calendars will update their models, probably find that no changes have been made, and 
therefore not re-render any DOM elements.



This is memory inefficient, since every widget will keep their own data collection.
You need to measure how big problems this creates for your app.





Next todo:s
Ember.js
Angular.js

Backbone + AMD
