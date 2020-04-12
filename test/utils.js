const { mount, createLocalVue } = require('@vue/test-utils')
const { createStoreon } = require('storeon')

const { StoreonVue } = require('../')

const Component = {
  template: '<div>{{$storeon.state.count}}</div>'
}

const Child = {
  name: 'Child',
  template: '<div>{{$storeon.state.foo}}</div>'
}

const ComponentWithChild = {
  template: '<div>{{$storeon.state.count}}<Child /></div>',
  components: { Child }
}

function createStore () {
  let counter = storeon => {
    storeon.on('@init', () => ({ count: 0, foo: 'baz' }))
    storeon.on('inc', ({ count }) => ({ count: count + 1 }))
    storeon.on('foo/set', (_, data) => ({ foo: data }))
  }
  return createStoreon([counter])
}

function mountComponent ({ store, component } = {}) {
  store = store || createStore()
  component = component || Component

  let updated = jest.fn()
  jest.spyOn(store, 'get')
  jest.spyOn(store, 'on')

  let localVue = createLocalVue()
  localVue.use(StoreonVue)
  let wrapper = mount(component, { localVue, store, updated })

  return { wrapper, store, updated }
}

module.exports = {
  mountComponent,
  ComponentWithChild,
  Component,
  Child,
  createStore
}
