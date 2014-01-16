
var d = React.DOM

module.exports = React.createClass({
  displayName: 'String',
  getDefaultProps: function () {
    return {
      value: '',
      onChange: function () {}
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
    this.setState({value: e.target.value})
  },
  blur: function () {
    this.props.onChange(this.state.value)
  },
  render: function () {
    return d.div(
      {className: 'string'},
      d.span({
        className: 'string__title'
      }, this.props.title),
      d.input({
        className: 'string__input',
        value: this.state.value,
        onChange: this.onChange,
        onBlur: this.blur
      })
    )
  }
})
