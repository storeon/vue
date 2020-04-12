const { createDecorator } = require('vue-class-component')

const { mapDispatch, mapState } = require('../helpers')

const State = createBindingHelper('computed', mapState)
const Dispatch = createBindingHelper('methods', mapDispatch)

module.exports = { State, Dispatch }

function createBindingHelper (bindTo, mapFn) {
  function makeDecorator (map) {
    return createDecorator((componentOptions, key) => {
      if (!componentOptions[bindTo]) {
        componentOptions[bindTo] = {}
      }

      let mapObject = { [key]: map }

      componentOptions[bindTo][key] = mapFn(mapObject)[key]
    })
  }

  function helper (proto, key) {
    if (typeof key === 'string') {
      return makeDecorator(key)(proto, key)
    }

    return makeDecorator(proto)
  }

  return helper
}
