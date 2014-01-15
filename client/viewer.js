
var d = React.DOM

var VegaViewer = module.exports = React.createClass({
  componentDidMount: function () {
    this.vis()
  },
  componentDidUpdate: function (prevProps) {
    if (prevProps.schema !== this.props.schema) {
      this.vis()
    }
  },
  vis: function () {
    if (!this.props.schema) return
    var node = this.refs.canvas.getDOMNode()
    vg.parse.spec(this.props.schema, function (chart) {
      var view = chart({
        el: node,
        data: undefined,
        renderer: 'canvas'
      })
      view.update()
    })
  },
  render: function () {
    return d.div(
      {className: 'viewer'},
      d.div({
        className: 'viewer__canvas',
        id: 'canvas',
        ref: 'canvas'
      })
    )
  }
})

