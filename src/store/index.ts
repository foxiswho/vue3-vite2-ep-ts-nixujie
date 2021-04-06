import {createStore, Store, useStore as baseUseStore} from 'vuex'
import layout from '@/store/module/layout'
import getters from "@/store/getters";

export const store = createStore<IState>({
  getters,
  modules: {
    layout
  }
})

export function useStore(): Store<IState> {
  return baseUseStore()
}
