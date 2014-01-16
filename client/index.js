
var SchemaMaker = require('./schema')
  , VegaViewer = require('./viewer')
  , request = require('superagent')
  , d = React.DOM
  , _ = require('lodash')

var Main = React.createClass({
  getDefaultProps: function () {
    return {
      examples: 'examples.json'
    }
  },
  getInitialState: function () {
    return {
      schema: null,
      status: 'init',
      exampleSchemas: null,
      history: [],
      histpos: 0
    }
  },
  onUndo: function () {
    var histpos = this.state.histpos
    if (histpos === 0) return
    var history = this.state.history.slice()
    if (histpos === this.state.history.length) {
      history.push(this.state.schema)
    }
    this.setState({
      schema: this.state.history[histpos - 1],
      histpos: histpos - 1,
      history: history
    })
  },
  onRedo: function () {
    var histpos = this.state.histpos
    if (histpos >= this.state.history.length) return
    histpos += 1
    this.setState({
      schema: this.state.history[histpos],
      histpos: histpos
    })
  },
  componentDidMount: function () {
    this.setState({
      status: 'loading',
    })
    request.get(this.props.examples)
      .end(function (err, req) {
        if (err || req.status !== 200) {
          this.setState({
            status: 'error',
            error: 'Failed to load examples'
          })
          return
        }
        this.setState({
          exampleSchemas: req.body,
          status: 'ready'
        })
      }.bind(this))
  },
  changeSchema: function () {
    var path = [].slice.call(arguments)
      , value = path.pop()
      , last = path.pop()
    if (last === null && path.length === 0) {
      return this.setState({schema: value})
    }
    console.log('change', path, last, value)
    var schema = _.cloneDeep(this.state.schema)
      , history = this.state.history.slice(0, this.state.histpos)
    history.push(this.state.schema)
    path.reduce(function (obj, attr) {
      return obj && obj[attr]
    }, schema)[last] = value
    this.setState({
      schema: schema,
      history: history,
      histpos: history.length
    })
  },
  render: function () {
    if (this.state.status === 'init') {
      return d.div(null, 'Initing')
    }
    if (this.state.status === 'loading') {
      return d.div(null, 'Loading...')
    }
    if (this.state.status === 'error') {
      return d.div(null, 'Error...' + this.state.error)
    }
    return d.div(
      {className: 'vega-real'},
      SchemaMaker({
        examples: this.state.exampleSchemas || {},
        schema: this.state.schema,
        onChange: this.changeSchema,
        onUndo: this.onUndo,
        onRedo: this.onRedo,
        canUndo: this.state.histpos > 0,
        canRedo: this.state.histpos < this.state.history.length - 1
      }),
      VegaViewer({
        schema: this.state.schema
      })
    )
  },
})

module.exports = function (el) {
  React.renderComponent(Main(), el)
}
