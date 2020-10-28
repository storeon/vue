const { reactive, inject } = require('vue')

const STORE_KEY = 'storeon'

function createStoreonPlugin (store) {
  return {
    install (app) {
      if (process.env.NODE_ENV !== 'production' && !store) {
        throw new Error(
          'Please provide store to the "createStoreonPlugin" function'
        )
      }

      store.state = reactive(store.get())

      app.provide(STORE_KEY, store)
      app.config.globalProperties.$storeon = store

      store.on('@changed', newState => {
        Object.assign(store.state, newState)
      })
    }
  }
}

function useStoreon () {
  let store = inject(STORE_KEY)

  if (process.env.NODE_ENV !== 'production' && !store) {
    throw new Error(
      'Could not find storeon context value. ' +
        'Make sure you provide store using "createStoreonPlugin" function'
    )
  }

  return store
}

module.exports = { createStoreonPlugin, useStoreon }
