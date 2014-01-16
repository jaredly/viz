
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
    , objScores = []
    , to
  outer : for (var i=0; i<options.length; i++) {
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
      if (t === 'object') {
        var score = 0
        for (var name in options[i]) {
          if (name[0] === '_') continue
          if (undefined !== value[name]) score += 1
        }
        objScores.push([score, i])
      }
      continue;
    }
    if (t === options[i]._type || ((options[i]._type === 'int' || options[i]._type === 'float') && t === 'number')) return i
    if (options[i]._type === 'multi') {
      throw new Error('nested options are gross')
    }
  }
  if (objScores.lenght === 1) return objScores[0][1]
  if (objScores.length) {
    objScores.sort(function (a, b) {
      return b[0] - a[0]
    })
    return objScores[0][1]
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
  console.log('defaultvalue', item)
  var type = typeFor(item)
  if (type === 'string') {
    return ''
  }
  if (type === 'float') {
    return 0.0
  }
  if (type === 'int') {
    return 0
  }
  if (type === 'array') {
    return []
  }
  if (type === 'multi') {
    return defaultValue(item.options[0])
  }
  if (type !== 'object') {
    return type
  }
  // TODO I could possibly support nested options...if I wanted to
  var obj = {}
  for (var name in item) {
    if (name[0] === '_') continue;
    obj[name] = defaultValue(item[name])
  }
  return obj
}

