const {
  toRefs,
  inject,
  provide,
  reactive,
  onBeforeUnmount
} = require('@vue/composition-api')

const STORE_KEY = 'storeon'

function useStoreon () {
  let store = inject(STORE_KEY)

  if (process.env.NODE_ENV !== 'production' && !store) {
    throw new Error(
      'Could not find storeon context value. ' +
      'Please ensure you provide store using "provideStoreon" function'
    )
  }

  return store
}

function provideStoreon (store) {
  return Vue => Vue.mixin({
    setup () {
      let state = reactive(store.get())

      provide(STORE_KEY, {
        ...toRefs(state),
        dispatch: store.dispatch
      })

      let unbind = store.on('@changed', (_, changed) => {
        Object.assign(state, changed)
      })

      onBeforeUnmount(unbind)
    }
  })
}

module.exports = { provideStoreon, useStoreon }
