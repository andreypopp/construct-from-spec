# construct-from-spec

A little helper to construct object from "specifications". Usage example:

    var createConstructor = require('construct-from-spec')

    var construct = createConstructor(
      'name', // name of the key which is used as a pointer to a function
      true    // if we need to use `new` operator when calling a function
    );

    var spec = {
      name: 'buffer:Buffer',
      subject: 'hello'
    }

    var buf = construct(spec) // the same as `new Buffer('hello')`

Where this can be useful? In configuration files, now you can construct entire
objects from a JSON object. Please note, that this can lead to security
vulnerabilities, cause config author can do an arbitrary code execution.

## Installation

    % npm install construct-from-spec
