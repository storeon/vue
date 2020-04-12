const Vue = require('vue')
const Component = require('vue-class-component').default

const { createStore } = require('./utils')
const { StoreonVue } = require('../index')
const { State, Dispatch } = require('../class')

beforeAll(() => {
  Vue.use(StoreonVue)
})

it('state (type)', () => {
  let store = createStore()

  @Component
  class MyComp extends Vue {
    @State('count') foo
  }

  expect(new MyComp({ store }).foo).toBe(0)
})

it('state (function)', () => {
  let store = createStore()

  @Component({
    computed: {
      foo () {
        return 1000
      }
    }
  })
  class MyComp extends Vue {
    @State(({ count }) => {
      return count + 10
    })
    foo
  }

  expect(new MyComp({ store }).foo).toBe(10)
})

it('state (implicit state name)', () => {
  let store = createStore()

  @Component
  class MyComp extends Vue {
    @State count
  }

  expect(new MyComp({ store }).count).toBe(0)
})

it('dispatch (type)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')

  @Component({
    methods: {
      bar () {
        return 1000
      }
    }
  })
  class MyComp extends Vue {
    @Dispatch('foo/set')
    bar
  }

  let c = new MyComp({ store })
  c.bar('bar')
  expect(store.dispatch.mock.calls[0][1]).toBe('bar')
})

it('dispatch (implicity action type)', () => {
  let store = createStore()
  jest.spyOn(store, 'dispatch')

  @Component
  class MyComp extends Vue {
    @Dispatch inc
  }

  let c = new MyComp({ store })
  c.inc()
  expect(store.dispatch.mock.calls[0][0]).toBe('inc')
})
