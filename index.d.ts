import _Vue from 'vue'
import { StoreonStore } from 'storeon'

export declare function StoreonVue(Vue: typeof _Vue): void

export declare type StoreonVueStore<State = unknown, Events = any> =
  StoreonStore<State, Events> & { state: State }
