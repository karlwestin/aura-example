define(['sandbox', './views/app', './collections/events', 'fullcalendar'], function(sandbox, AppView, Events) {
  'use strict';
  console.log("calendar", sandbox.collection);

  return function(options) {
    var events = new Events();

    new AppView({
      el: sandbox.dom.find(options.element),
      collection: events
    }).render();

    events.fetch();

    sandbox.emit('calendar.initialized', 'Initialized Calendar.');
    sandbox.on.log('calendar.**');
  };

});
