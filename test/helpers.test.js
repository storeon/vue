const Vue = require('vue')

const { createStore } = require('./utils')
const { StoreonVue } = require('../index')
const { mapState, mapDispatch } = require('../helpers')

let warn

beforeAll(() => {
  Vue.use(StoreonVue)
})

beforeEach(() => {
  warn = jest.spyOn(global.console, 'error').mockImplementation(() => null)
})

afterEach(() => {
  warn.mockRestore()
})

it('mapState (array)', () => {
  let store = createStore()
  let vm = new Vue({
    store,
    computed: mapState(['count'])
  })
  expect(vm.count).toBe(0)
  store.dispatch('inc')
  expect(vm.count).toBe(1)
})

it('mapState (object)', () => {
  let store = createStore()
  let vm = new Vue({
    store,
    computed: mapState({
      a: state => {
        return state.count + 1
      }
    })
  })
  expect(vm.a).toBe(1)
  store.dispatch('inc')
  expect(vm.a).toBe(2)
})

it('mapState (with undefined states)', () => {
  jest.spyOn(console, 'error')
  let store = createStore()
  let vm = new Vue({
    store,
    computed: mapState('foo')
  })
  expect(vm.count).toBeUndefined()
  expect(console.error).toHaveBeenCalledWith(
    'Mapper parameter must be either an Array or an Object'
  )
})

it('mapDispatch (array)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')
  let vm = new Vue({
    store,
    methods: mapDispatch(['inc', 'foo/set'])
  })
  vm.inc()
  expect(store.dispatch).toHaveBeenCalledWith('inc')
  expect(store.dispatch).not.toHaveBeenCalledWith('foo/set')
  vm['foo/set']()
  expect(store.dispatch).toHaveBeenCalledWith('foo/set')
})

it('mapDispatch (object)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')
  let vm = new Vue({
    store,
    methods: mapDispatch({
      foo: 'inc',
      bar: 'foo/set'
    })
  })
  vm.bar('bar')
  expect(store.dispatch).toHaveBeenCalledWith('foo/set', 'bar')
  expect(store.dispatch).not.toHaveBeenCalledWith('inc')
  expect(vm.$storeon.state.foo).toBe('bar')
  vm.foo()
  expect(store.dispatch).toHaveBeenCalledWith('inc')
})

it('mapDispatch (function)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')
  let vm = new Vue({
    store,
    methods: mapDispatch({
      foo (dispatch, arg) {
        dispatch('a', arg + 'bar')
      }
    })
  })
  vm.foo('foo')
  expect(store.dispatch.mock.calls[0][1]).toBe('foobar')
})

it('mapDispatch (with undefined actions)', () => {
  jest.spyOn(console, 'error')
  let store = createStore()
  jest.spyOn(store, 'dispatch')
  let vm = new Vue({
    store,
    methods: mapDispatch('inc')
  })
  expect(vm.count).toBeUndefined()
  expect(store.dispatch).not.toHaveBeenCalled()
  expect(console.error).toHaveBeenCalledWith(
    'Mapper parameter must be either an Array or an Object'
  )
})
