
var domain = require('domain');
var test = require('tape');
var timeout_tape = require('./');

test = timeout_tape(test, 3000);

test('all fine', function(t) {
  t.pass("won't timeout");
  t.end();
});

test('a test that times out should throw', function(t) {
  var d = domain.create();
  d.on('error', function(err) {
    process.stdin.pause();
    t.ok(err.message.match(/timeout/), 'Threw an exception on timeout');
    t.end();
  });

  var timed_test = timeout_tape(t.test, 1001);

  d.run(function() {
    timed_test('never call t.end()', function(t) {
      process.stderr.write('the waiting begins…\n');
    });
  });
});

process.stdin.resume();

