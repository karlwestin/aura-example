define([
  'aura_core', 
  'aura_perms',
  'backboneSandbox'
], function(core, permissions, sandbox) {

  permissions.extend({
    'receiver': {
      'sender': true
    },
    'sender': {
      'receiver': true
    }
  });


  core.getSandbox = function(sb) {
    // getting all the backbone stuff in there
    return sandbox.extend(sb);
  };

  core.start({
    'receiver': { options: {} },
    'sender': { options: {} }
  });
});
