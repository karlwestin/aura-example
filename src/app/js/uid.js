define(function() {
  var counter = Math.round(Math.random() * 1400000);
  return function(prefix) {
    return prefix + "-" + counter++;
  };
});
