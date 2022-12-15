import { RootState } from "@/store";
import { ActionTree, MutationTree, GetterTree } from "vuex";

export interface CartArr {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  quantity: number;
}

const state = {
  cartArray: [] as Array<CartArr[]>,
};

export const getters: GetterTree<State, RootState> = {
  getCartArray(state: State) {
    return state.cartArray;
  },
  getCartLength(state: State) {
    return state.cartArray.length;
  },
};

export const mutations: MutationTree<State> = {
  push(state: State, val: CartArr[]) {
    state.cartArray.push(val);
  },
  delete(state: State, val: number) {
    state.cartArray.splice(val, 1);
  },
};

const actions: ActionTree<RootState, RootState> = {
  // getCart({ commit }, payload?: CartArr[]) {
  //   commit("setCart", payload);
  // },
  pushToCart({ commit }, payload?: CartArr[]) {
    commit("push", payload);
  },
  delFromCart({ commit }, payload?: number) {
    commit("delete", payload);
  },
};

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
export type State = typeof state;
export default store;
