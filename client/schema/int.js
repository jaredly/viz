
var d = React.DOM

module.exports = React.createClass({
  displayName: 'Int',
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
      , num = parseInt(e.target.value)
      , schema = this.props.schema
    if (isNaN(num)) {
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
      {className: 'int' + (value !== this.props.value ? ' int--invalid' : '')},
      d.span({
        className: 'int__title'
      }, this.props.title),
      d.input({
        className: 'int__input',
        value: value,
        onChange: this.onChange
      })
    )
  }
})
