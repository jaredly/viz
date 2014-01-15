
var d = React.DOM

var SchemaMaker = module.exports = React.createClass({
  picker: function () {
    var names = Object.keys(this.props.examples)
    return d.ul(
      {className: 'schema__examples'},
      names.map(function (name) {
        return d.li(
          {
            className: 'schema__example',
            onClick: this.props.onChange.bind(null, this.props.examples[name])
          },
          name
        )
      }.bind(this))
    )
  },
  render: function () {
    if (!this.props.schema) {
      return d.div(
        {className: 'schema'},
        this.picker()
      )
    }
    return d.div(
      {className: 'schema'},
      'This is where we would edit things'
    )
  }
})

