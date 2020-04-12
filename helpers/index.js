const mapState = states => {
  let res = {}
  if (process.env.NODE_ENV !== 'production' && !isValidMap(states)) {
    console.error('Mapper parameter must be either an Array or an Object')
  }
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function () {
      let state = this.$storeon.state

      return typeof val === 'function' ? val.call(this, state) : state[val]
    }
  })
  return res
}

const mapDispatch = events => {
  let res = {}
  if (process.env.NODE_ENV !== 'production' && !isValidMap(events)) {
    console.error('Mapper parameter must be either an Array or an Object')
  }
  normalizeMap(events).forEach(({ key, val }) => {
    res[key] = function (...args) {
      let dispatch = this.$storeon.dispatch

      if (typeof val === 'function') {
        return val.apply(this, [dispatch].concat(args))
      } else {
        return dispatch.apply(this.$storeon, [val].concat(args))
      }
    }
  })
  return res
}

module.exports = { mapState, mapDispatch }

function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }

  if (Array.isArray(map)) {
    return map.map(key => ({ key, val: key }))
  } else {
    return Object.keys(map).map(key => ({ key, val: map[key] }))
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}
