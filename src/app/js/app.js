define([
  'aura_core', 
  'aura_perms',
  'backboneSandbox'
], function(core, permissions, sandbox) {

  permissions.extend({
    'calendar': {
      'payments': true
    },
    'payments': {
      'calendar': true
    }
  });


  core.getSandbox = function(sb) {
    // getting all the backbone stuff in there
    return sandbox.extend(sb);
  };

  core.start({
    'payments': { 
      options: {
        element: "#payments"
      } 
    }
  });

  core.start({
    'payments': { 
      options: {
        element: "#calendar"
      } 
    }
  });
  core.start({
    'calendar': { 
      options: {
        element: "#calendar2"
      } 
    }
  });


  /*
  // this doesn't work anymore, though said in the docs
  core.start("payments", { element: "#payments" });

  also under 'share a collection' the event emitting is wrong

  basically: right now, 
  because the module path is the key in the object,
  starting the same widget twice is a little problematic

  //Starting the same widget twice:
  core.start({
    'payments': { 
      options: {
        element: "#payments"
      } 
    }
  });

  core.start({
    'payments': { 
      options: {
        element: "#calendar"
      } 
    }
  });

  
  Suggested way of sharing a collection (from the readme)
  ----
  in this case, because the the payments/collection creates
  an instance and not return a class, these two instances are
  sharing the same collection

  how to add it to the sandbox instead?
  in the module:
  sandbox.collection = new Collection();

  in main:
  new CollView({ collection: sandbox.collection });

  -- i think this really doesn't change anything compared to
  -- just instantiating it in the module, and returning the instance


  What could be a way of sharing core data:
  ----
  options: {
    element: "#whatever",
    dataCore: ["payments", "whatever"]
  }

  in the core.start 
  var reqs = options.dataCore.map(function(el) {
    // core.loadData is a method that:
    // 1) loads the module
    // 2) instantiates it
    // 3) syncs it with server
    // 4) returns a deferred
    // 5) resolves the deferred w/ instance
    return core.loadData(el);
  });
  // this should ensure 
  // 1) all core data is inst.
  // 2) all core data is fetched from the server
  // 3) and the module is loaded
  // 4) before instantiation
  require([modulePath], function(main) {
    $.when.apply($, reqs).then(main, widgetFail); // dep
  });
  // This is probably the big win today:
  // ---
  // we can make sure the BODF is done
  // before starting widget
  
  // centralized fail handling, that also includes
  // if the BODF fails
  //
  // so we could handle for example what happens
  // if one of the core data modules fails on
  // instantiation
  //
  // Maybe even add default values instead
  //
  // one thing to check: what happens when the 
  // accountsModel breaks currently?
  //
  // could also improve testability
  */
});
