
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

  getInitialState: function () {
    return {collapsed: false}
  },

  current: function () {
    return utils.findOption(this.props.value, this.props.schema.options)
  },

  options: function (current) {
    return d.ul(
      {className: 'multi__options'},
      this.props.schema.options.map(function (option, i) {
        var name = option._title || option._type || ('object' === typeof option ? 'object' : option)
        return d.li(
          {
            className: 'multi__option' + (i === current ? ' multi__option--selected' : ''),
            onClick: i === current ? false : this.changeType.bind(null, i)
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
    if (option !== 'string' && option !== 'int' && option !== 'float' && (t === 'string' || t === 'int')) {
      return false
    }
    if (!types) types = require('./types')
    return d.div(
      {
        className: 'multi__body'
      },
      types[utils.typeFor(option)]({
        showTitle: false,
        schema: option,
        value: value,
        onChange: this.props.onChange,
        allowBlank: false
      })
    )
  },

  toggleCollapse: function () {
    this.setState({collapsed: !this.state.collapsed})
  },

  render: function () {
    var current = this.current()
    if (current === -1) current = 0
    var body = this.body(current)
    return d.div(
      {className: 'multi' + (this.state.collapsed ? ' multi--collapsed' : '')},
      d.div(
        {className: 'multi__top'},
        body && d.span({className: 'multi__collapser', onClick: this.toggleCollapse}),
        d.span({className: 'multi__title'}, this.props.title),
        this.options(current)
      ),
      body
    )
  }
})

