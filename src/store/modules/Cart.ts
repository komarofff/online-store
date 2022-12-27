import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";

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
  cartArray: [] as Array<CartArr>,
};

export const getters: GetterTree<State, RootState> = {
  getCartArray(state: State) {
    return state.cartArray;
  },
  getCartLength(state: State) {
    return state.cartArray.reduce(
      (accumulator, el) => accumulator + el.quantity,
      0
    );
  },
  getCartSum(state: State) {
    return state.cartArray.reduce(
      (accumulator, el) => accumulator + el.price * el.quantity,
      0
    );
  },
};

export const mutations: MutationTree<State> = {
  push(state: State, val: CartArr) {
    const el = state.cartArray.find((el) => el.id === val.id);
    if (!el) {
      state.cartArray.push(val);
      localStorage.setItem("cart", JSON.stringify(state.cartArray));
    }
  },
  delete(state: State, val: number) {
    const idx = state.cartArray.findIndex((el) => el.id === val);
    if (idx !== -1) {
      state.cartArray.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(state.cartArray));
    }
  },
  getDataFromStorage(state: State) {
    if (
      localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart") || "").length > 0
    ) {
      state.cartArray = JSON.parse(localStorage.getItem("cart") || "");
      //console.log(JSON.parse(localStorage.getItem("cart") || ""));
    }
  },
  plusItemQuantity(state: State, id: number) {
    const idd = state.cartArray.findIndex((el) => el.id === id);
    const counter: number = state.cartArray[idd].quantity + 1;
    state.cartArray[idd].quantity = counter;
    localStorage.setItem("cart", JSON.stringify(state.cartArray));
  },
  minusItemQuantity(state: State, id: number) {
    const idd = state.cartArray.findIndex((el) => el.id === id);
    const counter: number = state.cartArray[idd].quantity - 1;
    state.cartArray[idd].quantity = counter;
    localStorage.setItem("cart", JSON.stringify(state.cartArray));
  },
  delFromCart(state: State) {
    localStorage.removeItem("cart");
    state.cartArray = [];
  },
};

const actions: ActionTree<RootState, RootState> = {
  pushToCart({ commit }, payload?: CartArr) {
    commit("push", payload);
  },
  delFromCart({ commit }, payload: number) {
    commit("delete", payload);
  },
  getFromStorage({ commit }) {
    commit("getDataFromStorage");
  },
  plusQuantity({ commit }, payload: number) {
    commit("plusItemQuantity", payload);
  },
  minusQuantity({ commit }, payload: number) {
    commit("minusItemQuantity", payload);
  },
  clearCart({ commit }) {
    commit("delFromCart");
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
