import { RootState } from "@/store";
import { ActionTree, MutationTree, GetterTree } from "vuex";
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
  singleProduct: {} as ProdArr[],
};

export const getters: GetterTree<State, RootState> = {
  getAllProducts(state: State) {
    return state.products;
  },
  getSingleProduct(state: State) {
    return state.products;
  },
};

export const mutations: MutationTree<State> = {
  getAll(state: State, val: ProdArr[]) {
    state.products = val;
  },
  getSingle(state: State, val: ProdArr[]) {
    state.singleProduct = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getAllProd({ commit }) {
    return await axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        commit("getAll", response.data as ProdArr[]);
      });
  },
  async getSingleProd({ commit }, payload: number) {
    return await axios
      .get(`https://dummyjson.com/products/${payload}`)
      .then((response) => {
        commit("getSingle", response.data as ProdArr[]);
      });
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
