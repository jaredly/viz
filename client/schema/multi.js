
var d = React.DOM
  , utils = require('./utils')
  , types

var Multi = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      schema: {},
      value: null,
      onChange: function () {}
    }
  },

  current: function () {
    return utils.findOption(this.props.value, this.props.schema.options)
  },

  options: function (current) {
    return d.ul(
      {className: 'multi__options'},
      this.props.schema.options.map(function (option, i) {
        var name = option._type || ('object' === typeof option ? 'object' : option)
        return d.li(
          {
            className: 'multi__option' + (i === current ? ' multi__option--selected' : ''),
            onClick: this.changeType.bind(null, i)
          },
          name
        )
      }.bind(this))
    )
  },

  changeType: function (i) {
    var option = this.props.schema.options[i]
      , t = typeof option
    if (t === 'string' || t === 'int') {
      return this.props.onChange(option)
    }
    this.props.onChange(utils.defaultValue(option))
  },

  body: function (current) {
    var option = this.props.schema.options[current]
      , value = this.props.value
      , t = typeof option
    if (t === 'string' || t === 'int') {
      return false
    }
    if (!types) types = require('./types')
    return types[utils.typeFor(option)]({
      schema: option,
      value: value,
      onChange: this.props.onChange,
      allowBlank: false
    })
  },

  render: function () {
    var current = this.current()
    if (current === -1) current = 0
    return d.div(
      {className: 'multi'},
      d.span({className: 'multi__title'}, this.props.title),
      this.options(current),
      this.body(current)
    )
  }
})

