Shared data in client-side apps: Aura.js
==========
When building client-side javascript apps ('single page apps'), 
you'll sooner or later have to figure out how to share data between
different views and widgets. 

There's about as many different ways of doing this as there are apps, 
and they all seem to have different advantages when it comes to speed and 
memory footprint, flexibility, and guarding against unintended side-effects,
a.k.a bugs. 

One interesting project concerning client-side architecture is Aura (Previously 'Backbone Aura').
Aura is not aiming to be a new MVC framework or anything, but rather to provide a structure for 
your app in whatever other framework you're using. The goal is to build an app as independent parts,
that can be individually loaded, unloaded, stopped if they throw errors, etc. Please read more about 
Aura here [on the official site](http://aurajs.github.com/aura/).

attention: Aura.js is still in developer preview, and code is very much subject to change/break.
If you're looking for something more stable to use in your app today, [http://marionettejs.com/](marionette.js)
provides some similar tools for backbone.js apps.

So what tools does Aura gives us for sharing data in our app?

Three core concepts: Core, Sandbox and Permissions:
----
![http://i.imgur.com/kNKvtm2.png](http://i.imgur.com/kNKvtm2.png)
A quick overview of Aura says that it has three fundamental parts: A core, sandboxes and permissions.
(It has a library-facade layer too, but it is not within the scope of this post.) Basically, the core
starts/stops widgets. Each widget gets its own sandbox and are not supposed to know about the core. 
The fundamental idea is that the widget can interact with the sandbox, and that the permissions decide
what will be seen by other parts of the app. Right now, this feature is implemented for the pub/sub functionality.

```
// Setting permissions for widgets (best done in our main app.js)

permissions.extend({
  'payments': { 'calendar': true },
  'calendar': { 'payments': true }
});
```

The code above allows communication between these two widget classes. (At the time of writing you need both, even
if you're only doing one-way communication). The purpose of this is to avoid un-intended side effects of pubsub.
I've more than once created change-circles, where one change pubsubs another which pubsubs another which triggers a 
new change on the original object. Not funny :(

Sharing a collection of data
----
The fundamental technique for sharing and updating data which Aura gives us is pubsub communication between widgets.
My understanding is that each widget is expected to maintain its' own collection of models, and to use pubsub to create,
update and delete models based on changes in the publishing collection.

```
// calendar/collection.js

// listen for change
sandbox.on("payment.change", function(model) {
  // providing the id-types are the same
  var event = this.events.get(model.id); 
  event.set(model);
});

// payments/collection.js
sandbox.emit("payment.change", model.toJSON());
```

We're sending out the model data only, not the model itself. One advantage of this is that the calendar can 
modify the models independently of payments, for example giving them a different color depending on the amount.

Exactly where to put this code seems to be up for discussion. I've found it nice to put it inside the models/collections
themselves, and to have the views only listen for changes on the internal models.

Note that we're using the id property here to avoid duplicate models in the collections.

Attaching a collection to the sandbox
----
One possibility that's suggested in the Aura docs is to attach a collection to the sandbox. Since two instances of the same
widget gets the same sandboxes, this would work:

```
// payments/collection.js
sandbox.collection = new Collection();

// payments/main.js
return function() { // 'boots' the widget
   new PaymentsView({ collection: sandbox.collection })
}
```
However it a) doesn't really give any advantages over returning the collection instance from an AMD module and b) seems kinda ugly.
I don't think this is what the Aura team means in their docs. Would love to hear a comment on this.

A lesson learned:
----
When sharing the same id-structure between two modules, be very careful not to accidentially end up
with two id's that are the same. For example, if one series of id's comes from the payments module,
you might wanna prefix those with "payments-". Otherwise, you will end up with some very strange behavior,
like lost models, the wrong models getting updated, etc.

Bootstrapping the data in the calendar:
----
Let's say the calendar is lazily instantiated, that means it hasn't been 'listening in' on 
the payments that were created all the time. Now, all of a sudden, our user wants to see the 
events calendar, including payments.

One example is that the payments collection could react when there's a new calendar:

```
// payments/collection.js

// in initialize
sandbox.on("calendar.initialize", emitAll, this);

function emitAll() {
  this.each(function(model) {
      sandbox.emit("payment", "add", model);
  });
}

// calendar/main.js
function main() {
  new Calendar();
  sandbox.emit("calendar.initialized");
}
```

What if we have multiple calendars? What if some are already 'booted' and knows about the payments?
Again, we can rely on the Backbone Collection's mechanism to keep known id's from duplicate.
Basically, those calendars will update their models, probably find that no changes have been made, and 
therefore not re-render any DOM elements.

A suggestion: Core Data
----
What if we have some data model that's used all over our app, do we duplicate it for each widget?
Let me come with a suggestion. When starting the widgets, we could till what core data models they 
rely on:
```
// in app/app.js
core.start({
   'calendar': {
      options: { element: "#calendar" },
      data: ["payments", "events"]
   }
});

// in the Backbone aura core:
var data = _.map(widget.data, function(model) {
  // method that 
  // a) loads the class 
  // b) populates it w/ data from server or local-store (i.e. calls 'fetch')
  // c) returns a promise
  // d) resolves that promise with the model instance
  return core.data(model); 
});

// the widget can be required before whe have the core data
require([module], function(main) {
  // failure on fetching/instantiating models or starting widget
  // can be handled in one single 'widgetError' method, that can
  // be customized for each app: for example unloading the module,
  // showing a message to the user, and 'phoning home' about the error
  core.data.when.apply(core, data).then(main).fail(core.widgetError);
});

// in calendar/main.js
return function main(payments, events) {
  new Widget({ collection: events, payments: payments });
}
```

Now in order to isolate those models, we can remove the EventEmitter functionality from them,
so that the widgets still have to listen to for example `"data.payments.change"`. The advantage
of this is that we prevent the widgets from binding events directly on the models, which should
make it easier to deal with making sure the widget and its' sandbox is getting correctly disposed
of when not needed any more.

Also, we could potentially control from permissions which models are allowed to set data on the
models, and which can just use it. I think it's worth thinking about.

Rounding off
----
I think Aura is a very interesting project, pretty unique in the javascript world. In the coming weeks,
i hope to be able to look at ember-data and angular.js too, to understand what paradigms they propose.

It's gonna be interesting!
