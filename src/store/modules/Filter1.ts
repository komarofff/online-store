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
  queryForFilter: {} as FilterQuery,
};

export const getters: GetterTree<State, RootState> = {
  getQueryForFilters(state: State) {
    return state.queryForFilter;
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
  getFilterData(state: State) {
    return state.filterData;
  },
};

export const mutations: MutationTree<State> = {
  setQueryForFilters(state: State, val: FilterQuery) {
    state.queryForFilter = val;
  },
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
  setFilter(state: State, val: ProdArr[]) {
    state.filterData = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getQuery({ commit }, payload: FilterQuery) {
    commit("setQueryForFilters", payload);
  },
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
  async getFilterParameters({ commit }, payload: FilterQuery) {
    if (state.products.length) {
      console.log("payload", payload);
      let arr: ProdArr[] = state.products;
      if (
        !payload.categories.length &&
        !payload.brands.length &&
        !payload.price.length &&
        !payload.stock.length &&
        !payload.sort.length
      ) {
        arr = arr.filter((el) => el);
      } else {
        if (payload.categories.length) {
          arr = arr.filter((el) => {
            if (payload.categories.includes(el.category)) {
              return el;
            }
          });
        }
        if (payload.brands.length) {
          arr = arr.filter((el) => {
            if (payload.brands.includes(el.brand)) {
              return el;
            }
          });
        }
        if (payload.price.length) {
          arr = arr.filter((el) => {
            if (el.price >= payload.price[0] && el.price <= payload.price[1]) {
              return el;
            }
          });
        }

        if (payload.stock.length) {
          arr = arr.filter((el) => {
            if (el.stock >= payload.stock[0] && el.stock <= payload.stock[1]) {
              return el;
            }
          });
        }
        if (payload.search) {
          arr = arr.filter((el) => {
            if (
              el.brand.includes(payload.search as string) ||
              el.category.includes(payload.search as string) ||
              el.title.includes(payload.search as string) ||
              el.description.includes(payload.search as string) ||
              el.price.toString().indexOf(payload.search as string) > -1 ||
              el.stock.toString().indexOf(payload.search as string) > -1
            ) {
              return el;
            }
          });
        }
        if (payload.sort.length) {
          const items: string[] = payload.sort.split("-");
          //sort=price-ASC sort=price-DESC
          if (items[0] === "price" && items[1] === "ASC") {
            arr.sort((a, b) => a.price - b.price);
          } else if (items[0] === "price" && items[1] === "DESC") {
            arr.sort((a, b) => b.price - a.price);
          }
          //sort=discount-ASC sort=discount-DESC
          if (items[0] === "discount" && items[1] === "ASC") {
            arr.sort((a, b) => a.discountPercentage - b.discountPercentage);
          } else if (items[0] === "discount" && items[1] === "DESC") {
            arr.sort((a, b) => b.discountPercentage - a.discountPercentage);
          }

          //sort=rating-ASC sort=rating-DESC
          if (items[0] === "rating" && items[1] === "ASC") {
            arr.sort((a, b) => a.rating - b.rating);
          } else if (items[0] === "rating" && items[1] === "DESC") {
            arr.sort((a, b) => b.rating - a.rating);
          }
        }
      }
      commit("setFilter", arr);
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
// if (payload && payload.search) {
//   state.products.forEach((el) => {
//     if (
//         el.brand.includes(payload.search as string) ||
//         el.category.includes(payload.search as string) ||
//         el.title.includes(payload.search as string) ||
//         el.description.includes(payload.search as string) ||
//         el.price.toString().indexOf(payload.search as string) > -1 ||
//         el.stock === Number(payload.search as number)
//     ) {
//       arr.push(el);
//     }
//   });
// }
