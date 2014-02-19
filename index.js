"use strict";

var getCallsiteDirname = require('get-callsite-dirname');
var getParameterNames  = require('get-parameter-names');
var newless            = require('newless');
var resolve            = require('resolve/lib/sync');

/**
 * Create a new constructor.
 *
 * @param {String} name Name of the key in spec which ponts to a function.
 * @param {Boolean} constructor Should spec call a function with new operator.
 */
function createConstructor(name, constructor) {
  return function constructFromSpec(spec, basedir) {
    basedir = basedir || getCallsiteDirname();

    var func;

    if (typeof spec[name] === 'function') {
      func = spec[name];

    } else {
      var res = parseResourceId(spec[name], name);
      func = require(resolve(res.module, {basedir: basedir}));

      if (res.path) {
        for (var i = 0, len = res.path.length; i < len; i++) {
          if (func === undefined) {
            throw new Error(name + " id cannot be resolved: " + spec[name]);
          }
          func = func[res.path[i]];
        }
      }

      if (typeof func !== 'function') {
        throw new Error(name + " id is not a function: " + spec[name]);
      }
    }

    var args = getParameterNames(func).map(function(name) {
      return spec[name];
    });

    if (constructor) {
      func = newless(func);
    }

    return func.apply(null, args);
  };
}

var resourceIdRegexp = /([^:$]+)(:(.+))?/;

function parseResourceId(value, name) {
  var match = resourceIdRegexp.exec(value);
  if (!match || match[1] === '') {
    throw new Error("cannot resolve a " + name + " id: " + value);
  }
  return {
    module: match[1],
    path: match[3] ? match[3].split('.') : null
  };
}

module.exports = createConstructor;
module.exports.parseResourceId = parseResourceId;
