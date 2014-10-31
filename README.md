timeout-tape
============

Adds timeouts to tape.

You shouldn't need this most of the time.

example
=======

```javascript
var test = require('tape');
var timeout_tape = require('timeout_tape');

test = timeout_tape(test, 3000);

test('all fine', function(t) {
  t.pass("won't timeout");
  t.end();
});

test('will timeout', function(t) {
  setTimeout(function() {
    t.end(); // we'll timeout before we get here
  }, 99999);
});

```
