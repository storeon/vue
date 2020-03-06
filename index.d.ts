import _Vue from 'vue'
import { Store } from 'storeon';

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        store: Store;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $storeon: Store;
        state: any;
    }
}

declare function StoreonVue(Vue: typeof _Vue): void

export = StoreonVue
