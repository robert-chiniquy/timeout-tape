module.exports = function timeout_tape(test, timeout) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var name = args[0];
    var cb = args.slice(-1)[0];
    var new_cb = function(t) {
      var to = setTimeout(function () {
        var msg = 'timeout after ' + timeout + 'ms : '+ name;
        throw new Error(msg);
      }, timeout);

      t.on('end', function () {
        clearTimeout(to);
      });
      to.unref();

      cb.apply(null, arguments);
    };
    args.pop(); // lose old cb
    args.push(new_cb);
    return test.apply(null, args);
  };
};

