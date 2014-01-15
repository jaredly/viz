
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
    if (!this.props.spec) return
    var node = this.refs.canvas.getDOMNode()
    vg.parse.spec(this.props.spec, function (chart) {
      var view = chart({
        el: node,
        data: undefined,
        renderer: 'Canvas'
      })
      view.update()
    })
  },
  render: function () {
    return d.div(
      {className: 'viewer'},
      d.canvas({
        className: 'viewer__canvas',
        ref: 'canvas'
      })
    )
  }
})

