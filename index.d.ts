import { App } from 'vue'
import { StoreonStore } from 'storeon'

export declare type StoreonVueStore<State = unknown, Events = any> =
  StoreonStore<State, Events> & { state: State }


export declare function createStoreonPlugin<State, Events>(store: StoreonStore<State, Events>): {
  install(app: App): void
}

export declare function useStoreon<State = unknown, Events = any>():
  StoreonVueStore<State, Events>;
