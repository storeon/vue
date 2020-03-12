const Vue = require('vue')

const { mountComponent, ComponentWithChild, Child } = require('./utils')

it('should render with initial state', () => {
  let { store, wrapper } = mountComponent()
  expect(wrapper.vm.$state).toEqual(store.get())
})

it('should provide Storeon', () => {
  let { store, wrapper } = mountComponent()
  expect(store.on).toHaveBeenCalledTimes(1)
  expect(store.get).toHaveBeenCalledTimes(1)
  expect(wrapper.vm.$storeon).toBe(store)
})

it('should unsubscribe only on root destroy', () => {
  let { wrapper, store } = mountComponent(
    { component: ComponentWithChild }
  )
  let child = wrapper.find(Child)

  store.dispatch('inc')
  expect(wrapper.vm.$state.count).toBe(1)
  child.destroy()
  store.dispatch('inc')
  expect(wrapper.vm.$state.count).toBe(2)
  wrapper.destroy()
  store.dispatch('inc')
  expect(wrapper.vm.$state.count).toBe(2)
})

it('should update view on dispatch', async () => {
  let { store, updated, wrapper } = mountComponent()
  expect(wrapper.text()).toBe('0')
  store.dispatch('inc')
  await Vue.nextTick()
  expect(wrapper.text()).toBe('1')
  expect(updated).toHaveBeenCalledTimes(1)
})

it('should rerenders only changed states', async () => {
  let { wrapper, store, updated } = mountComponent(
    { component: ComponentWithChild }
  )
  let child = wrapper.find(Child)

  expect(child.text()).toBe('baz')
  store.dispatch('foo/set', 'foobaz')
  await Vue.nextTick()
  expect(updated).not.toHaveBeenCalled()
  expect(child.text()).toBe('foobaz')
})
