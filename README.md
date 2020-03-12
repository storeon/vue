# Storeon Vue

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny connector for [Storeon] and [Vue]. ([Demo])

Size is only 150 bytes (minified and gzipped). It uses [Size Limit] to control size.

Read more about Storeon [article].

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

## How to use

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

Plugin add to Vue’s global/instance properties and component options. In these cases, type declarations are needed to make plugins compile in TypeScript. We can declare an instance property `$storeon` and `$state` with type `Store<State, Events>`. You can also declare component options `store`:

#### `typing.d.ts`

```ts
import Vue, { ComponentOptions } from 'vue'
import { StoreonStore } from 'storeon'
import { State, Events } from './store'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    store: Store<State, Events>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $storeon: StoreonStore<State, Events>;
    $state: State;
  }
}
```

## TODO
- [ ] rich example
