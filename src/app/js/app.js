define(['aura_core', 'backboneSandbox'], function(core, sandbox) {
  core.getSandbox = function(sb) {
    // getting all the backbone stuff in there
    return sandbox.extend(sb);
  };

  core.errorHandler = function(e, path, options) {
    console.log(path + " threw an error");
    core.stop(path, options.element);
    core.start({
      'error': {
        options: {
          element: options.element,
          failedName: path
        }
      }
    });
  };

  core.start({
    'w2': {
      options: {
        element: '#widget2'
      }
    }
  });
});
