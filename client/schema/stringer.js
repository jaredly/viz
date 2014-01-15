
var d = React.DOM

var Stringer = module.exports = React.createClass({
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
      {className: 'intput'},
      d.span({
        className: 'intput__title'
      }),
      d.input({
        value: this.state.value,
        onChange: this.onChange,
        onBlur: this.blur
      })
    )
  }
})
