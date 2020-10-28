const { createApp } = require('vue')
const { createStoreon } = require('storeon')

function mount (store, component = {}) {
  let el = createElement()

  component.render = () => {}

  let app = createApp(component)

  app.use(store)

  return app.mount(el)
}

function createStore () {
  let counter = storeon => {
    storeon.on('@init', () => ({ count: 0, foo: 'baz' }))
    storeon.on('inc', ({ count }) => ({ count: count + 1 }))
    storeon.on('foo/set', (_, data) => ({ foo: data }))
  }

  return createStoreon([counter])
}

module.exports = { mount, createStore }

function createElement () {
  let el = document.createElement('div')

  document.body.appendChild(el)

  return el
}
