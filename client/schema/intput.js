
var d = React.DOM

var Intput = module.exports = React.createClass({
  onChange: function (e) {
    var v = parseInt(e.target.Value)
    if (isNaN(v)) {
      v = null
    }
    this.props.onChange(v)
  },
  render: function () {
    var value = this.props.value
    if (!value && value != 0) {
      value = ''
    }
    return d.div(
      {className: 'intput'},
      d.span({
        className: 'intput__title'
      }),
      d.input({
        value: value,
        onChange: this.onChange
      })
    )
  }
})
