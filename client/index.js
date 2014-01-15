
var SchemaMaker = require('./schema')
  , VegaViewer = require('./viewer')
  , request = require('superagent')
  , d = React.DOM

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
    request.get(this.props.example)
      .end(function (err, req) {
        if (err) {
          this.setState({
            loading: false,
            error: 'Failed to load examples'
          })
          return
        }
        this.setState({
          exampleSchemas: req.body,
          loading: false
        })
      })
  },
  changeSchema: function (prop, value) {
    console.log(prop, value, 'changing')
  },
  render: function () {
    if (this.state.status === 'init') {
      return d.div(null, 'Initing')
    }
    if (this.state.status === 'loading') {
      return d.div(null, 'Loading...')
    }
    return d.div(
      {className: 'vega-real'},
      SchemaMaker({
        examples: this.state.exampleSchemas,
        schema: this.state.schema,
        onChange: this.changeSchema
      }),
      VegaViewer({
        schema: this.state.schema
      })
    )
  },
})

