function StoreonVue (Vue) {
  Vue.mixin({
    beforeCreate () {
      let state = 'state'
      let store = this.$options.store
      let parent = this.$options.parent

      if (store) {
        this.$storeon = store
      } else if (parent && parent.$storeon) {
        this.$storeon = parent.$storeon
      }

      this[state] = Vue.observable(this.$storeon.get())

      this._unbind = this.$storeon.on('@changed', (_, changed) => {
        Object.assign(this[state], changed)
      })
    },
    beforeDestroy () {
      this._unbind && this._unbind()
    }
  })
}

module.exports = { StoreonVue }
