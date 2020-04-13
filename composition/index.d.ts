import _Vue from 'vue'
import { Ref } from '@vue/composition-api'
import { StoreonStore, StoreonDispatch } from 'storeon'

type Refs<T> = {
  [P in keyof T]: Ref<T[P]>;
};

export declare function provideStoreon(store: StoreonStore):
  (Vue: typeof _Vue) => void


export declare function useStoreon<State = unknown, Events = any>():
  Refs<State> & { dispatch: StoreonDispatch<Events> };
