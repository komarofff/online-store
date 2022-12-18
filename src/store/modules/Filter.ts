import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios from "axios";

export type CatArr = string[];
export type BrandArr = string[];
export type Price = number[];
export type Stock = number[];

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
  categories: [] as CatArr[],
  brands: [] as BrandArr[],
  price: [] as Price[],
  stock: [] as Stock[],
};

export const getters: GetterTree<State, RootState> = {
  getProducts(state: State) {
    return state.products;
  },
  getBrands(state: State) {
    return state.brands;
  },
  getCategories(state: State) {
    return state.categories;
  },
  getPrice(state: State) {
    return state.price;
  },
  getStock(state: State) {
    return state.stock;
  },
};

export const mutations: MutationTree<State> = {
  setAllProducts(state: State, val: ProdArr[]) {
    state.products = val;
  },
  setAllCategories(state: State, val: CatArr[]) {
    state.categories = val;
  },
  setAllBrands(state: State, val: BrandArr[]) {
    state.brands = val;
  },
  setPrice(state: State, val: Price[]) {
    state.price = val;
  },
  setStock(state: State, val: Stock[]) {
    state.stock = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getAllProd({ commit }) {
    if (!state.products.length) {
      return await axios
        .get("https://dummyjson.com/products?limit=100")
        .then((response) => {
          commit("setAllProducts", response.data.products as ProdArr[]);
        });
    }
  },
  async getAllCat({ commit }) {
    if (!state.categories.length) {
      return await axios
        .get("https://dummyjson.com/products/categories")
        .then((response) => {
          commit("setAllCategories", response.data as CatArr[]);
        });
    }
  },
  async getAllBrands({ commit }) {
    if (state.products.length) {
      const brand = [] as BrandArr;
      state.products.forEach((el) => {
        if (!brand.includes(el.brand)) {
          brand.push(el.brand);
        }
      });
      commit("setAllBrands", brand);
    }
  },
  async getPriceDiff({ commit }, payload: ProdArr[]) {
    if (payload.length) {
      const min: number = Math.min(...payload.map((item) => item.price));
      const max: number = Math.max(...payload.map((item) => item.price));
      const arr: Price = [min, max];
      commit("setPrice", arr);
    }
  },
  async getStockDiff({ commit }, payload: ProdArr[]) {
    if (payload.length) {
      const min: number = Math.min(...payload.map((item) => item.stock));
      const max: number = Math.max(...payload.map((item) => item.stock));
      const arr: Stock = [min, max];
      commit("setStock", arr);
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
