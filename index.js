function StoreonVue (Vue) {
  Vue.mixin({
    beforeCreate: function () {
      var vm = this
      var store = vm.$options.store
      var parent = vm.$options.parent
      var state = 'state'

      if (store) {
        vm.$storeon = store
      } else if (parent && parent.$storeon) {
        vm.$storeon = parent.$storeon
      }

      if (Array.isArray(vm.$options.storeon)) {
        vm[state] = {}
        var shape = vm.$options.storeon

        shape.forEach(function (key) {
          Vue.util.defineReactive(vm[state], key, vm.$storeon.get()[key])
        })

        vm._unbind = vm.$storeon.on('@changed', function (value) {
          shape.forEach(function (key) {
            vm[state][key] = value[key]
          })
        })
      }
    },
    beforeDestroy: function () {
      this._unbind && this._unbind()
    }
  })
};

module.exports = { StoreonVue: StoreonVue }
