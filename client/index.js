
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
      exampleSchemas: null
    }
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
  changeSchema: function (prop, value) {
    console.log(prop, value, 'changing')
    if (prop === null) {
      return this.setState({schema: value})
    }
    var schema = _.cloneDeep(this.state.schema)
      , parts = prop.split('.')
      , last = parts.pop()
    parts.reduce(function (obj, attr) {
      return obj && obj[attr]
    }, schema)[last] = value
    this.setState({schema: schema})
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
        onChange: this.changeSchema
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
