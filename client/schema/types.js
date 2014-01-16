
var _ = require('lodash')

module.exports = {}
_.extend(module.exports, {
  'string': require('./string'),
  'int': require('./int'),
  'float': require('./float'),
  'object': require('./object'),
  'array': require('./array'),
  'multi': require('./multi')
})

