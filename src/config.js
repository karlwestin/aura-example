// Define call just to make enforceDefine check happy
define(function() {

  'use strict';

  var relative = '../../';

  // Aura configuration object is separate from require.config so we can have
  // access to it in src/aura/base.js
  require.config({

    // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
    // which provide per-require error handling. To utilize this feature
    // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
    enforceDefine: true,

    baseUrl: 'src/app/js',

    // Uncomment if you would like to support cache busting
    // urlArgs: "bust=" + (new Date()).getTime(),

    deps: ['app'],

    // shim underscore(lodash) & backbone (cause we use the non AMD versions here)
    shim: {
      'dom': {
        exports: '$',
        // switch to the DOM-lib of your choice
        // Could be either 'jquery' or 'zepto';
        deps: ['jquery']
      },
      'underscore': {
        exports: '_'
      },
      'backbone': {
        deps: ['underscore', 'dom'],
        exports: 'Backbone'
      },
      'zepto': {
        deps: ['deferred'],
        exports: 'Zepto',
        init: function(Deferred) {
          if (Deferred) {
            Deferred.installInto($);
          }
        }
      },
      'deferred': {
        exports: 'Deferred'
      },
      'jquery_ui': {
        deps: ['jquery'],
        exports: '$.ui'
      }
    },

    // paths
    paths: {
      // jQuery
      jquery: relative + 'aura/lib/jquery/jquery',

      // Zepto
      zepto: relative + 'aura/lib/zepto/zepto',
      deferred: relative + 'aura/lib/zepto/deferred',

      // Underscore (Lo-Dash - http://lodash.com)
      underscore: relative + 'aura/lib/lodash',

      // EventEmitter
      eventemitter: relative + 'aura/lib/eventemitter2',

      // Set the base library
      dom: relative + 'aura/lib/dom',

      // Aura
      aura_base: relative + 'aura/base',
      aura_core: relative + 'aura/core',
      aura_perms: relative + 'aura/permissions',
      aura_sandbox: relative + 'aura/sandbox',

      // Widgets
      widgets: relative + 'widgets',

      // Translations
      nls : relative + 'nls',

      // Backbone Extension
      backboneSandbox: relative + 'extensions/backbone/sandbox',
      text: relative + 'extensions/backbone/lib/text',
      backbone: relative + 'extensions/backbone/lib/backbone',
      i18n: relative + 'i18n',
      localstorage: relative + 'extensions/backbone/lib/localstorage',
      fullcalendar: relative + 'extensions/backbone/lib/fullcalendar.min',
      jquery_ui: relative + 'extensions/backbone/lib/jquery-ui.min',
    }

  });

  require.aura = require.s.contexts._.config;
  require.aura.locale = window.document.cookie.split(/<\/?lang>/)[1];

});
