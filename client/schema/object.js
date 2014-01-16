
var d = React.DOM
  , utils = require('./utils')
  , types

var Mapping = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      schema: {},
      onChange: function () {},
      value: {},
      parent: '',
      showTitle: true
    }
  },

  getInitialState: function () {
    return {collapsed: false}
  },

  toggleCollapse: function () {
    this.setState({collapsed: !this.state.collapsed})
  },

  render: function () {
    var keys = Object.keys(this.props.schema)
      , onChange = this.props.onChange
      , schema = this.props.schema
      , value = this.props.value
    value = value === undefined ? utils.defaultValue(schema) : value
    if (!types) types = require('./types')
    return d.div(
      {
        className: 'object' + (this.state.collapsed ? ' object--collapsed' : '') + (this.props.showTitle ? '' : ' object--no-title')
      },
      this.props.showTitle && d.span({className: 'object__collapser', onClick: this.toggleCollapse}),
      this.props.showTitle && d.span({
        className: 'object__title',
        onClick: this.toggleCollapse
      }, this.props.title || schema._title),
      d.div({className: 'object__children'},
        keys.map(function (name) {
          if (name === '_type') return false
          if (name === '_title') return false
          var item = schema[name]
            , val  = value[name]
            , change = onChange.bind(null, name)
            , type
          if (val === undefined) return false
          if ('function' === typeof item) {
            item = item(value)
          }
          type = utils.typeFor(item)
          return types[type]({
            title: name,
            value: val,
            schema: item,
            onChange: change
          })
        })
      )
    )
  }
})

