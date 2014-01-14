
{
  name: str,
  width: num, ?? things here
  height: num, ?? things here
  viewport: [width, height],
  padding: 
    num |
    'auto|strict' |
    {top:, left:, right:, bottom:}
  data: [{
    name: str,
    format: {
      type: "json|csv|tsv|topojson|treejson",
      parse: {
        "keyname": "number|boolean|date"
      }
    } || {
      type: 'treejson',
    } || {
      parse: same,
      children: "children" || the name of the child attr
    },
    values: [
      num | obj
    ],
    source: str,
    url: str,
    transform: [
    {
      type: 'array',
      fields: ['data.x', 'index', 'data.other.name'],
    } || {
      type: 'copy',
      from: 'data',
      fields: ['source', 'target'],
      as: ['source', 'target']
    } || {
      type: 'formula',
      field: 'logx', // name of the dest var
      expr: 'd.data.x * d.data.y'
    } || {
      type: 'slice',
      // this one I'll do differently!
      from: int, // default 0    ; inclusive
      to: int,   // default length ; exclusive
      step: int  // negative works too
    } || {
      type: 'calc',
      fn: 'min|max|mean|median',
      field: 'data.xs',
    } || {
      type: 'sort',
      by: '-field'
    } || {

    // And then there are some great visual data transforms as well.

    // Ones I don't care about so much atm
    } || {
      type: 'cross',
      'with': 'setname', // defaults to this one
      diagonal: true, // items along the diagonal will be included
    } || {
      type: 'facet',
      ... // what?
    } || {
      type: 'filter',
      test: 'd.data.x > 5'
    } || {
      type: 'flatten',
      // flattens a tree or facet sstructure
    }

    ]
  }],
  scales: [{
    name: str,
    type: anyofthem,
    domain: [list, of, possible, values] || {
      min: num,
      max: num,
    }
    range: [list, of, desired, ouput (ordinal/quantized)] || {
      min: num,
      max: num
    },
    reverse: bool,
    round: bool, // map to pixel grid
  } || {
    name str,
    type: 'linear|ordinal',
  
  }
  ]
}


