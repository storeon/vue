import Vue from 'vue';
import { StoreonDispatch } from 'storeon';

type Computed = () => any;
type ActionMethod = (...args: any[]) => Promise<any>;
type InlineComputed<T extends Function> = T extends (...args: any[]) => infer R ? () => R : never
type InlineMethod<T extends (fn: any, ...args: any[]) => any> = T extends (fn: any, ...args: infer Args) => infer R ? (...args: Args) => R : never
type CustomVue = Vue & Record<string, any>;

interface Mapper<R> {
  <Key extends string>(map: Key[]): { [K in Key]: R };
  <Map extends Record<string, string>>(map: Map): { [K in keyof Map]: R };
}

interface MapperForState {
  <S, Map extends Record<string, (this: CustomVue, state: S, getters: any) => any> = {}>(
    map: Map
  ): { [K in keyof Map]: InlineComputed<Map[K]> };
}

interface MapperForAction {
  <Map extends Record<string, (this: CustomVue, dispatch: StoreonDispatch<any>, ...args: any[]) => any>>(
    map: Map
  ): { [K in keyof Map]: InlineMethod<Map[K]> };
}

export declare const mapState: Mapper<Computed> & MapperForState;
export declare const mapActions: Mapper<ActionMethod> & MapperForAction;
