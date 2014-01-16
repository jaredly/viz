
var pad = {
  _type: 'int',
  min: 0,
  max: 300,
  step: 5
}

var dim = {
  _type: 'int',
  min: 10,
  max: 500,
  step: 10
}

var valueRef = {
  _type: 'multi',
  options: [
    'int',
    {
      _title: 'field',
      field: 'string',
      mult: {
        _type: 'int',
        blank: true
      },
      scale: {
        _type: 'multi',
        options: [
          'string',
          {
            _title: 'field',
            field: 'string'
          }
        ]
      }
    }
  ]
}

var colorInt = {
  _type: 'int',
  min: 0,
  max: 255,
  step: 1
}

var colorRef = {
  _type: 'multi',
  options: [
    {
      _title: 'rgb',
      r: colorInt,
      g: colorInt,
      b: colorInt
    },
    {
      _title: 'hsl',
      h: colorInt,
      s: colorInt,
      l: colorInt
    }
  ]
}

var properties = {
  rect: {
    x: valueRef,
    y: valueRef,
    width: valueRef,
    height: valueRef,
    x2: valueRef,
    y2: valueRef
  },
  arc: {
    x: valueRef,
    y: valueRef,
    startAngle: valueRef,
    endAngle: valueRef,
    innerRadius: valueRef,
    outerRadius: valueRef,
    fill: colorRef,
    fillOpacity: valueRef,
    opacity: valueRef,
    stroke: colorRef,
    strokeWidth: valueRef,
    strokeOpacity: valueRef,
  }
}

module.exports = {
  "name": {
    "_type": "string",
    blank: true
  },
  "width": dim,
  "height": dim,
  "padding": {
    "_type": "multi",
    "options": [
      pad,
      "auto",
      "strict",
      {
        "top": pad,
        "left": pad,
        "right": pad,
        "bottom": pad
      }
    ]
  },
  /*
  marks: [{
    type: {
      _type: 'multi',
      options: [
        'arc', 'rect', 'area'
      ]
    },
    name: {
      _type: 'string',
      blank: true
    },
    description: {
      _type: 'string',
      blank: true
    },
    from: {
      data: 'string',
      // transform: [...]
    },
    properties: function (obj) {
      return {
        enter: properties[obj.type],
        update: properties[obj.type],
        hover: properties[obj.type]
      }
    },
  }]
  */
}

