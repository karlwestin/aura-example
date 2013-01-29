define([
  'sandbox', 
  'aura_perms',
  './collectionView', 
  './collection'
], function(sandbox, permissions, AppView, payments) {

  permissions.extend({
    'w2': { 'calendar': true }
  });

  return function(options) {
    var element = sandbox.dom.find(options.element);
    new AppView({ collection: payments, el: element });
  };
});
