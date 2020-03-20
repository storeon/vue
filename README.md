# Storeon Vue

[![npm version](https://badge.fury.io/js/%40storeon%2Fvue.svg)](https://www.npmjs.com/package/@storeon/vue)
[![Build Status](https://travis-ci.org/storeon/vue.svg?branch=master)](https://travis-ci.org/storeon/vue)

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

[Storeon] is a tiny event-based Redux-like state manager without dependencies. `@storeon/vue` package helps to connect store with [Vue] to provide a better performance and developer experience while remaining so tiny.

- **Size**. 136 bytes (+ Storeon itself) instead of ~3kB of [Vuex] (minified and gzipped).
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

## Install

```sh
npm install @storeon/vue -S
```
or
```sh
yarn add @storeon/vue
```

## How to use ([Demo])

Create a store with `storeon` as you do it usually. You must explicitly install `@storeon/vue` via `Vue.use()`.

#### `store.js`

```js
import Vue from 'vue'
import { createStoreon } from 'storeon'
import { StoreonVue } from '@storeon/vue'

Vue.use(StoreonVue)

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
import Vue from 'vue'
import App from './App.vue'
import { store } from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

By providing the `store` option to the root instance, the store will be injected
into all child components of the root and will be available on them as `this.$storeon`.

#### `App.vue`

```html
<template>
  <div>
    <h1>The count is {{$state.count}}</h1>
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

## Using with TypeScript

Plugin add to Vue’s global/instance properties and component options. In these cases, type declarations are needed to make plugins compile in TypeScript. We can declare an instance property `$storeon` and `$state` with type `StoreonStore<State, Events>`. You can also declare component options `store`:

#### `typing.d.ts`

```ts
import Vue, { ComponentOptions } from 'vue'
import { StoreonStore } from 'storeon'
import { State, Events } from './store'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store: StoreonStore<State, Events>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $storeon: StoreonStore<State, Events>;
    $state: State;
  }
}
```
