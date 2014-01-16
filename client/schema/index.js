
var d = React.DOM
  , request = require('superagent')

  , Obj = require('./object')

  , vegaSchema = require('./schema')

var SchemaPicker = module.exports = React.createClass({
  getInitialState: function () {
    return {loading: false, error: false}
  },
  getExample: function (name) {
    this.setState({loading: true})
    request.get('examples/' + name + '.json')
      .end(function (err, res) {
        if (err || res.status !== 200 || !res.body) {
          this.setState({
            loading: false,
            error: 'Failed to get example...'
          })
          return
        }
        this.setState({loading: false, error: false})
        this.props.onChange(null, res.body)
      }.bind(this))
  },
  picker: function () {
    return d.ul(
      {className: 'schema-picker__examples'},
      this.props.examples.map(function (name) {
        return d.li(
          {
            className: 'schema-picker__example',
            onClick: this.getExample.bind(null, name)
          },
          name
        )
      }.bind(this))
    )
  },
  goBack: function () {
    this.props.onChange(null)
  },
  render: function () {
    if (this.state.loading) {
      return d.div({className: 'schema-picker'}, 'Loading...')
    }
    if (!this.props.schema) {
      return d.div(
        {className: 'schema-picker'},
        this.state.error,
        this.picker()
      )
    }
    return d.div(
      {className: 'schema-picker'},
        this.state.error,
      d.button(
        {
          className: 'schema-picker__back',
          onClick: this.goBack
        },
        'Examples List'
      ),
      Obj({
        schema: vegaSchema,
        value: this.props.schema,
        onChange: this.props.onChange
      })
      /*
      viewport,
      padding,

      data,
      scales,
      axes,
      legends,
      marks,
      */
      //'This is where we would edit things',
      //JSON.stringify(this.props.schema, null, 4)
    )
  }
})

