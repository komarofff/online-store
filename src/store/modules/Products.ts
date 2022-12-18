import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios from "axios";

export interface ProdArr {
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
}

const state = {
  products: [] as ProdArr[],
  singleProduct: {} as ProdArr,
};

export const getters: GetterTree<State, RootState> = {
  getAllProducts(state: State) {
    return state.products;
  },
  getSingleProduct(state: State) {
    return state.singleProduct;
  },
  getProdThroughId(state: State, id: number) {
    return state.products[id];
  },
};

export const mutations: MutationTree<State> = {
  getAll(state: State, val: ProdArr[]) {
    state.products = val;
  },
  getSingle(state: State, val: ProdArr) {
    state.singleProduct = val;
  },
  getSingleId(state: State, val: number) {
    state.singleProduct = state.products[val];
    console.log("getSingleId", state.singleProduct);
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getAllProd({ commit }) {
    console.log("state.products.length", state.products.length);
    if (!state.products.length) {
      console.log("from server");
      return await axios
        .get("https://dummyjson.com/products?limit=100")
        .then((response) => {
          commit("getAll", response.data as ProdArr[]);
        });
    } else {
      console.log("from data");
    }
  },
  async getSingleProd({ commit }, payload: number) {
    if (!state.products.length) {
      console.log("single from server");
      return await axios
        .get(`https://dummyjson.com/products/${payload}`)
        .then((response) => {
          commit("getSingle", response.data as ProdArr[]);
        });
    } else {
      console.log("single from data");
      commit("getSingleId", payload);
    }
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
