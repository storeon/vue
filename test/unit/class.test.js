const { Vue } = require('vue-class-component')

const { createStore, mount } = require('../utils')
const { createStoreonPlugin } = require('../../index')
const { State, Dispatch } = require('../../class')

it('state (type)', () => {
  let store = createStore()

  class MyComp extends Vue {
    @State('count') foo
  }

  let vm = mount(createStoreonPlugin(store), MyComp)

  expect(vm.foo).toBe(0)
})

it('state (function)', () => {
  let store = createStore()

  class MyComp extends Vue {
    @State(({ count }) => count + 10)
    foo
  }

  let vm = mount(createStoreonPlugin(store), MyComp)

  expect(vm.foo).toBe(10)
})

it('state (implicit state name)', () => {
  let store = createStore()

  class MyComp extends Vue {
    @State count
  }

  let vm = mount(createStoreonPlugin(store), MyComp)

  expect(vm.count).toBe(0)
})

it('dispatch (type)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')

  class MyComp extends Vue {
    @Dispatch('foo/set')
    bar
  }

  let vm = mount(createStoreonPlugin(store), MyComp)

  vm.bar('bar')
  expect(store.dispatch.mock.calls[0][1]).toBe('bar')
})

it('dispatch (implicity action type)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')

  class MyComp extends Vue {
    @Dispatch inc
  }

  let vm = mount(createStoreonPlugin(store), MyComp)

  vm.inc()
  expect(store.dispatch.mock.calls[0][0]).toBe('inc')
})
