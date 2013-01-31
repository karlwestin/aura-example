define([
  'sandbox', 
  'aura_perms',
  './collectionView', 
  './collection'
], function(sandbox, permissions, AppView, payments) {
  return function(options) {
    var element = sandbox.dom.find(options.element);
    new AppView({ collection: sandbox.collection, el: element });
  };
});
