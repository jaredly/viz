
module.exports = {
  findOption: findOption,
  typeFor: typeFor,
  defaultValue: defaultValue
}

// var types = require('./types')

// types:
// string
// int
// object
// array

function findOption(value, options) {
  var t = typeof value
    , to
  for (var i=0; i<options.length; i++) {
    to = typeof options[i] 
    if ('string' === to || 'number' === to) {
      if (options[i] === value) return i
      continue;
    }
    if (Array.isArray(options[i]) && Array.isArray(value)) {
      return i
    }
    if (!options[i]._type) {
      // Does this work?
      if (t === 'object') return i
      continue;
    }
    if (t === options[i]._type || (options[i]._type === 'int' && t === 'number')) return i
    if (options[i]._type === 'multi') {
      throw new Error('nested options are gross')
    }
  }
  return -1
}

function typeFor(item) {
  if ('string' === typeof item) {
    return item
  }
  if (Array.isArray(item)) {
    return 'array'
  }
  if (item._type) {
    return item._type
  }
  return 'object'
}

function defaultValue(item) {
  var type = typeFor(item)
  if (type === 'string') {
    return ''
  }
  if (type === 'int') {
    return 0
  }
  if (type === 'array') {
    return []
  }
  // TODO I could possibly support nested options...if I wanted to
  return {}
}

