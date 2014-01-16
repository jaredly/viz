
var d = React.DOM
  , _ = require('lodash')
  , utils = require('./utils')
  , types

module.exports = React.createClass({
  displayName: 'Array',
  getDefaultProps: function () {
    return {
      schema: ['int'],
      value: [],
      onChange: function () {}
    }
  },
  onRemove: function (i) {
    var data = _.cloneDeep(this.props.value)
    data.splice(i, 1)
    this.props.onChange(data)
  },
  onAdd: function (i) {
    console.log(this.props.value)
    var data = _.cloneDeep(this.props.value)
    data.push(utils.defaultValue(this.props.schema[0]))
    this.props.onChange(data)
  },
  items: function () {
    if (!types) types = require('./types')
    var value = this.props.value || []
      , schema = this.props.schema[0]
      , obj = types[utils.typeFor(schema)]
      , onChange = this.props.onChange
      , onRemove = this.onRemove
    if ('object' !== typeof schema) schema = undefined
    return value.map(function (item, i) {
      return d.li(
        {
          className: 'array__item'
        },
        d.div({
          className: 'array__remove',
          onClick: onRemove.bind(null, i)
        }),
        obj({
          value: item,
          onChange: onChange.bind(null, i),
          schema: schema
        })
      )
    })
  },
  render: function () {
    return d.div(
      {className: 'array'},
      d.span(
        {className: 'array__title'},
        this.props.title
      ),
      d.ul(
        {className: 'array__list'},
        this.items(),
        d.li({
          className: 'array__add',
          onClick: this.onAdd
        }, 'Add ' + this.props.title)
      )
    )
    return d.div(null, 'arrays not supported atm')
  }
})

