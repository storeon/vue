# Storeon Vue

[![npm version](https://badge.fury.io/js/%40storeon%2Fvue.svg)](https://www.npmjs.com/package/@storeon/vue)
[![Build Status](https://travis-ci.org/storeon/vue.svg?branch=master)](https://travis-ci.org/storeon/vue)

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

**This is the Vue 3 compatible version of the package. For the Vue 2 support, see the [2.0 branch](https://github.com/storeon/vue/tree/2.0).**

[Storeon] is a tiny event-based Redux-like state manager without dependencies. `@storeon/vue` package helps to connect store with [Vue] to provide a better performance and developer experience while remaining so tiny.

- **Size**. 160 bytes (+ Storeon itself) instead of ~3kB of [Vuex] (minified and gzipped).
- **Ecosystem**. Many additional [tools] can be combined with a store.
- **Speed**. It tracks what parts of state were changed and re-renders only components based on the changes.

Read more about Storeon [article].

[vue]: https://github.com/vuejs/vue
[vuex]: https://github.com/vuejs/vuex
[storeon]: https://github.com/storeon/storeon
[tools]: https://github.com/storeon/storeon#tools
[vue]: https://github.com/vuejs/vue
[size limit]: https://github.com/ai/size-limit
[demo]: https://codesandbox.io/s/throbbing-sunset-x27qc
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes
[vscode]: https://github.com/microsoft/vscode
[vscodium]: https://github.com/VSCodium/vscodium

## Install

```sh
npm install @storeon/vue -S
```
or
```sh
yarn add @storeon/vue
```

## How to use ([Demo])

Create a store with `storeon` as you do it usually. You must explicitly install plugin `@storeon/vue` via `app.use()`.

#### `store.js`

```js
import { createStoreon } from 'storeon'

let counter = store => {
  store.on('@init', () => ({ count: 0 }))
  store.on('inc', ({ count }) => ({ count: count + 1 }))
  store.on('dec', ({ count }) => ({ count: count - 1 }))
}

export const store = createStoreon([counter])
```

#### `index.js`

Library provides a mechanism to "inject" the store into all child components from the root component with the `store` option:

```js
import { createApp } from 'vue'
import { createStoreonPlugin } from '@storeon/vue'
import App from './App.vue'
import { store } from './store'

const app = createApp(App)

app.use(createStoreonPlugin(store))

app.mount('#app')
```

By providing the `store` option to the root instance, the store will be injected
into all child components of the root and will be available on them as `this.$storeon`.

#### `App.vue`

```html
<template>
  <div>
    <h1>The count is {{$storeon.state.count}}</h1>
    <button @click="dec">-</button>
    <button @click="inc">+</button>
  </div>
</template>

<script>
export default {
  methods: {
    inc() {
      this.$storeon.dispatch('inc')
    },
    dec() {
      this.$storeon.dispatch('dec')
    }
  }
};
</script>
```

Or use Composition API with `useStoreon` hook to get state and dispatch function

#### `App.vue`

```html
<template>
  <div>
    <h1>The count is {{count}}</h1>
    <button @click="dec">-</button>
    <button @click="inc">+</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStoreon } from '@storeon/vue'

export default defineComponent({
  setup() {
    const { state, dispatch } = useStoreon()
    const { count } = state;

    function inc() {
      dispatch('inc')
    }
    function dec() {
      dispatch('dec')
    }

    return { count, inc, dec }
  }
});
</script>
```

### The `mapState` Helper

When a component needs to make use of multiple store state properties, declaring all these computed properties can get repetitive and verbose. To deal with this we can make use of the `mapState` helper which generates computed getter functions for us, saving us some keystrokes:

```js
import { mapState } from '@storeon/vue/helpers'

export default {
  computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,
    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count',
    // to access local state with `this`, a normal function must be used
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

We can also pass a string array to `mapState` when the name of a mapped computed property is the same as a state sub-tree name.

```js
import { mapState } from '@storeon/vue/helpers'

export default {
  computed: mapState([
    // map this.count to storeon.state.count
    'count'
  ])
}
```

### The `mapDispatch` Helper

You can dispatch actions in components with `this.$storeon.dispatch('xxx')`, or use the `mapDispatch` helper which maps component methods to `store.dispatch` calls:

```js
import { mapDispatch } from '@storeon/vue/helpers'

export default {
  methods: {
    ...mapDispatch([
      // map `this.inc()` to `this.$storeon.dispatch('increment')`
      'inc',
      // map `this.incBy(amount)` to `this.$storeon.dispatch('incBy', amount)`
      'incBy'
    ]),
    ...mapDispatch({
      // map `this.add()` to `this.$storeon.dispatch('inc')`
      add: 'inc'
    })
  }
}

```

## Using with Class Components

If you would like to write as more class-like style, use decorators from `@storeon/vue/class`

```js
import { Vue } from 'vue-class-component'
import { State, Dispatch } from '@storeon/vue/class'

export default class extends Vue {
  @State count
  @Dispatch('inc') inc
  @Dispatch('dec') dec
}
```

## Using with TypeScript

Plugin adds to Vue’s global/instance properties and component options. In these cases, type declarations are needed to make plugins compile in TypeScript. We can declare an instance property `$storeon` with type `StoreonStore<State, Events>`. You can also declare a component options `store`:

#### `typing.d.ts`

```ts
import { ComponentCustomProperties } from 'vue'
import { StoreonStore } from 'storeon'
import { StoreonVueStore } from '@storeon/vue'
import { State, Events } from './store'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $storeon: StoreonVueStore<State, Events>
  }
}
```

To let TypeScript properly infer types inside Vue component options, you need to define components with `defineComponent` function:

```diff
-export default {
+export default defineComponent({
  methods: {
    inc() {
      this.$storeon.dispatch('inc')
    }
  }
};
```

:warning: To enable type checking in your template use this flag in the `settings.json` of your [VSCode] or [VSCodium] with `Vetur` plugin. For more information see [Vetur documentation](https://vuejs.github.io/vetur/interpolation.html#generic-language-features)

```json
{
  "vetur.experimental.templateInterpolationService": true
}
```
## TODO
- Add examples
