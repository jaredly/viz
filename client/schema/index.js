
var d = React.DOM
  , request = require('superagent')

var SchemaMaker = module.exports = React.createClass({
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
        this.props.onChange(res.body)
      }.bind(this))
  },
  picker: function () {
    return d.ul(
      {className: 'schema__examples'},
      this.props.examples.map(function (name) {
        return d.li(
          {
            className: 'schema__example',
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
      return d.div({className: 'schema'}, 'Loading...')
    }
    if (!this.props.schema) {
      return d.div(
        {className: 'schema'},
        this.state.error,
        this.picker()
      )
    }
    return d.div(
      {className: 'schema'},
        this.state.error,
      d.button(
        {
          className: 'schema__back',
          onClick: this.goBack
        },
        'Examples List'
      ),
      'This is where we would edit things',
      JSON.stringify(this.props.schema, null, 4)
    )
  }
})

