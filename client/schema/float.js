
var d = React.DOM

module.exports = React.createClass({
  displayName: 'Float',
  getDefaultProps: function () {
    return {
      value: 0,
      onChange: function () {},
      allowBlank: true,
      schema: {}
    }
  },
  getInitialState: function () {
    return {
      value: this.props.value
    }
  },
  componentWillReceiveProps: function (props) {
    if (props.value !== this.props.value) {
      this.setState({value: props.value})
    }
  },
  onChange: function (e) {
    var value = e.target.value
      , num = parseFloat(e.target.value)
      , schema = this.props.schema
    if (isNaN(num) || value[value.length-1] === '.') {
      return this.setState({value: value})
    }
    if (undefined !== schema.min && num < schema.min) {
      num = schema.min
    }
    if (undefined !== schema.max && num > schema.max) {
      num = schema.max
    }
    this.props.onChange(num)
  },
  render: function () {
    var value = this.state.value
    return d.div(
      {className: 'float' + (value !== this.props.value ? ' float--invalid' : '')},
      d.span({
        className: 'float__title'
      }, this.props.title),
      d.input({
        className: 'float__input',
        value: value,
        onChange: this.onChange
      })
    )
  }
})
