// @see https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins

// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
import { Store } from 'vuex'
import { QVueGlobals } from 'quasar'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $store: Store<any>,
    $q: QVueGlobals
  }
}
