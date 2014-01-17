
var d = React.DOM
  , utils = require('./utils')
  , types

var Mapping = module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      schema: {},
      onChange: function () {},
      value: {},
      parent: '',
      showTitle: true
    }
  },

  getInitialState: function () {
    return {
      collapsed: false,
    }
  },

  toggleCollapse: function () {
    this.setState({collapsed: !this.state.collapsed})
  },

  addAttr: function (e) {
    var attr = e.target.value
    if (attr === '---') return
    this.props.onChange(attr, utils.defaultValue(this.props.schema[attr]))
  },

  removeAttr: function (name) {
    this.props.onChange(name, undefined)
  },

  render: function () {
    var keys = Object.keys(this.props.schema)
      , onChange = this.props.onChange
      , schema = this.props.schema
      , value = this.props.value
      , unused = []
    value = value === undefined ? utils.defaultValue(schema) : value
    if (!types) types = require('./types')
    return d.div(
      {
        className: 'object' + (this.state.collapsed ? ' object--collapsed' : '') + (this.props.showTitle ? '' : ' object--no-title')
      },
      this.props.showTitle && d.div(
        {
          className: 'object__top',
          onClick: this.toggleCollapse
        },
        d.span({
          className: 'object__title',
        }, this.props.title || schema._title),
        d.span({className: 'object__collapser'})
      ),
      d.div({className: 'object__children'},
        keys.map(function (name) {
          if (name === '_type') return false
          if (name === '_title') return false
          var item = schema[name]
            , val  = value[name]
            , change = onChange.bind(null, name)
            , type
          if (val === undefined) {
            unused.push(name)
            return false
          }
          if ('function' === typeof item) {
            item = item(value)
          }
          type = utils.typeFor(item)
          return d.div(
            {
              className: 'object__child',
            },
            d.span({
              className: 'object__remove',
              onClick: this.removeAttr.bind(null, name)
            }),
            types[type]({
              title: name,
              value: val,
              schema: item,
              onChange: change
            })
          )
        }.bind(this)),
        !!unused.length && d.select(
          {
            className: 'object__add',
            onChange: this.addAttr,
            value: '---'
          },
          d.option({value: '---'}, 'Add Attribute'),
          unused.map(function (name) {
            return d.option({
              value: name,
            }, name)
          })
        )
      )
    )
  }
})

