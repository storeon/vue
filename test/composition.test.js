const Vue = require('vue')
const { onUpdated } = require('@vue/composition-api')
const VueCompositionApi = require('@vue/composition-api').default
const { mount, createLocalVue } = require('@vue/test-utils')

const { createStore } = require('./utils')
const { provideStoreon, useStoreon } = require('../composition')

let localVue

beforeEach(() => {
  let store = createStore()
  localVue = createLocalVue()
  localVue.use(VueCompositionApi)
  localVue.use(provideStoreon(store))
})

it('should provide store', async () => {
  let wrapper = mount(
    {
      template: '<div></div>',
      setup () {
        return useStoreon()
      }
    },
    { localVue }
  )

  expect(wrapper.vm.count).toBe(0)
  wrapper.vm.dispatch('inc')
  await Vue.nextTick()
  expect(wrapper.vm.count).toBe(1)
})

it('should not emit extra updates', async () => {
  let spyOnUpdate = jest.fn()

  let wrapper = mount(
    {
      template: '<div>{{count}}</div>',
      setup () {
        onUpdated(spyOnUpdate)
        return useStoreon()
      }
    },
    { localVue }
  )

  wrapper.vm.dispatch('inc')
  await Vue.nextTick()
  expect(spyOnUpdate.mock.calls).toHaveLength(1)
  wrapper.vm.dispatch('foo/set', 'bar')
  await Vue.nextTick()
  expect(spyOnUpdate.mock.calls).toHaveLength(1)
})
