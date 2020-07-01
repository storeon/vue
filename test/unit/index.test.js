const { nextTick } = require('vue')

const { mount, createStore } = require('../utils')
const { createStoreonPlugin, useStoreon } = require('../../index')

it('should inject store to the global properties', () => {
  let store = createStore()

  let vm = mount(createStoreonPlugin(store))

  expect(vm.$storeon.state).toEqual(store.get())
})

it('should provide store', async () => {
  let store = createStore()
  let vm = mount(createStoreonPlugin(store), {
    setup () {
      return useStoreon()
    }
  })

  expect(vm.state.count).toBe(0)

  vm.dispatch('inc')
  await nextTick()

  expect(vm.state.count).toBe(1)
})

it('should throw an error when no store passed to the function', () => {
  expect(() => mount(createStoreonPlugin())).toThrow(
    new Error('Please provide store to the "createStoreonPlugin" function')
  )
})
