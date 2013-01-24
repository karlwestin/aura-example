define(['sandbox', './views/superwidget'], function(sandbox, Super) {
  // ska alltså sätta upp hela grejen
  return function(options) {
    new Super({
      el: sandbox.dom.find(options.element)
    });
    throw new Error("sw couldn't start");
  };
});
