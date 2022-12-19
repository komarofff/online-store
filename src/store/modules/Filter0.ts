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
export interface FilterQuery {
  categories: string[];
  brands: string[];
  price: number[];
  stock: number[];
  search: string | number;
  sort: string;
}
const state = {
  products: [] as ProdArr[],
  filterData: [] as ProdArr[],
  categories: [] as CatArr[],
  brands: [] as BrandArr[],
  price: [] as Price[],
  stock: [] as Stock[],
  searchText: [] as ProdArr[],
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
  getSearchText(state: State) {
    return state.searchText;
  },
  getFilterData(state: State) {
    return state.filterData;
  },
};

export const mutations: MutationTree<State> = {
  setAllProducts(state: State, val: ProdArr[]) {
    state.products = val;
  },
  setSearchText(state: State, val: ProdArr[]) {
    state.searchText = val;
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
  setFilter(state: State, val: ProdArr[]) {
    state.filterData = val;
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
  async getQueryText({ commit }, payload: string | number) {
    if (state.products.length) {
      const arr = [] as ProdArr[];
      state.products.forEach((el) => {
        if (
          el.brand.includes(payload as string) ||
          el.category.includes(payload as string) ||
          el.title.includes(payload as string) ||
          el.description.includes(payload as string) ||
          el.price === Number(payload as number) ||
          el.stock === Number(payload as number)
        ) {
          arr.push(el);
        }
      });
      commit("setSearchText", arr);
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
  async getFilterParameters({ commit }, payload: FilterQuery) {
    if (state.products.length) {
      console.log("payload", payload);
      let arr: ProdArr[] = [];
      if (payload && payload.search) {
        state.products.forEach((el) => {
          if (
            el.brand.includes(payload.search as string) ||
            el.category.includes(payload.search as string) ||
            el.title.includes(payload.search as string) ||
            el.description.includes(payload.search as string) ||
            el.price === Number(payload.search as number) ||
            el.stock === Number(payload.search as number)
          ) {
            arr.push(el);
          }
        });
      } else {
        arr = state.products.filter((el) => el);
      }
      commit("setFilter", arr);
    } else {
      console.log("no products");
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
