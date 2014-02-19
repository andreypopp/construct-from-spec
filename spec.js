var assert = require('assert');
var createConstructor = require('./index');
var parseResourceId = createConstructor.parseResourceId;

describe('construct-from-spec', function() {

  describe('parseResourceId', function() {

    it('parses resource id into module id and path', function() {
      assert.deepEqual(
        parseResourceId('.'),
        {"module":".","path":null}
      );
      assert.deepEqual(
        parseResourceId('.:p'),
        {"module":".","path":["p"]}
      );
      assert.deepEqual(
        parseResourceId('./mod/id'),
        {"module":"./mod/id","path":null}
      );
      assert.deepEqual(
        parseResourceId('./mod/id.js'),
        {"module":"./mod/id.js","path":null}
      );
      assert.deepEqual(
        parseResourceId('./mod/id.js:p.z'),
        {"module":"./mod/id.js","path":["p", "z"]}
      );
      assert.deepEqual(
        parseResourceId('mod/id.js:p.z'),
        {"module":"mod/id.js","path":["p", "z"]}
      );
      assert.throws(
        function() { parseResourceId(':', 'plugin'); },
        /cannot resolve a plugin id: :/
      )
    });

  });

  describe('constructing from functions', function() {
    var construct = createConstructor('name');

    it('works', function() {
      var obj = construct({
        name: 'get-parameter-names',
        fn: function(x, y) {}
      });
      assert.deepEqual(obj, ['x', 'y']);
    });
  });
  
  describe('constructing from constructor functions', function() {
    var construct = createConstructor('name', true);

    it('works', function() {
      var obj = construct({
        name: 'buffer:Buffer',
        subject: 'hello'
      });
      assert.deepEqual(obj.toString(), 'hello');
    });
  });
});
