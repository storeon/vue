function StoreonVue (Vue) {
  Vue.mixin({
    beforeCreate () {
      let store = this.$options.store
      let parent = this.$options.parent

      if (store) {
        this.$storeon = store
        this.$state = Vue.observable(store.get())

        this._unbind = store.on('@changed', (_, changed) => {
          Object.assign(this.$state, changed)
        })
      } else if (parent && parent.$storeon) {
        this.$storeon = parent.$storeon
        this.$state = parent.$state
      }
    },
    beforeDestroy () {
      this._unbind && this._unbind()
    }
  })
}

module.exports = { StoreonVue }
