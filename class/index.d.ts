import Vue from 'vue';

declare type StateTransformer = (state: any) => any;
declare type VuexDecorator = <V extends Vue>(proto: V, key: string) => void;
interface BindingHelper {
  <V extends any>(proto: V, key: string): void;
  (type: string): VuexDecorator;
}
interface StateBindingHelper extends BindingHelper {
  (type: StateTransformer): VuexDecorator;
}

export declare const State: StateBindingHelper;
export declare const Dispatch: BindingHelper;
