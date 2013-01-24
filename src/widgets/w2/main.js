define(['sandbox', './collectionView', './collection'], function(sandbox, AppView, payments) {
  return function(options) {
    var element = sandbox.dom.find(options.element);
    new AppView({ collection: payments, el: element });
  };
});
