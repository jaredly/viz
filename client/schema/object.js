
var d = React.DOM
  , utils = require('./utils')
  , types

var Mapping = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      schema: {},
      onChange: function () {},
      value: {},
      parent: ''
    }
  },
  render: function () {
    var keys = Object.keys(this.props.schema)
      , onChange = this.props.onChange
      , value = this.props.value
      , schema = this.props.schema
    if (!types) types = require('./types')
    return d.div(
      {className: 'mapping'},
      keys.map(function (name) {
        if (name === 'type') return false
        var item = schema[name]
          , val  = value[name]
          , change = onChange.bind(null, name)
          , type = utils.typeFor(item)
        return types[type]({
          title: name,
          value: val,
          schema: item,
          onChange: change
        })
      })
    )
  }
})

