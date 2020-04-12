import _Vue, { ComponentOptions } from 'vue'
import { StoreonStore } from 'storeon'

export declare function StoreonVue(Vue: typeof _Vue): void

export declare type StoreonVueStore<State = unknown, Events = any> =
  StoreonStore<State, Events> & { state: State }

declare module "vue/types/options" {
  interface ComponentOptions<V extends _Vue> {
    store?: StoreonStore;
  }
}

declare module "vue/types/vue" {
  interface _Vue {
    $storeon: StoreonVueStore;
  }
}
