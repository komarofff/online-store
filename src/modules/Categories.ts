import { RootState } from "@/store";
import { ActionTree, MutationTree, GetterTree } from "vuex";
import axios from "axios";
export type CatArr = string[];

const state = {
  categories: [] as CatArr[],
  text: "text 5555",
};

export const getters: GetterTree<State, RootState> = {
  getCategories(state: State) {
    return state.categories;
  },
};

export const mutations: MutationTree<State> = {
  setCat(state: State, val: CatArr[]) {
    state.categories = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  getCat({ commit }) {
    return axios
      .get("https://dummyjson.com/products/categories")
      .then((response) => {
        commit("setCat", response.data as CatArr[]);
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
