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

export type CatArr = string[];

const state = {
  categories: [] as CatArr[],
  singleCategory: [] as ProdArr[],
  text: "text 5555",
};

export const getters: GetterTree<State, RootState> = {
  getAllCategories(state: State) {
    return state.categories;
  },
  getCatLength(state: State) {
    return state.categories.length;
  },
  getSingleCategory(state: State) {
    return state.singleCategory;
  },
};

export const mutations: MutationTree<State> = {
  setAllCat(state: State, val: CatArr[]) {
    state.categories = val;
  },
  setSingleCat(state: State, val: ProdArr[]) {
    state.singleCategory = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getAllCat({ commit }) {
    if (!state.categories.length) {
      return await axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => {
          commit("setAllCat", response.data as CatArr[]);
        });
    }
  },
  async getSingleCat({ commit }, payload: string) {
    return await axios
      .get(`https://dummyjson.com/products/category/${payload}`)
      .then((response) => {
        commit("setSingleCat", response.data as ProdArr[]);
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
