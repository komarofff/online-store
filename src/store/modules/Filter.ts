import { RootState } from "@/store";
import { ActionTree, GetterTree, MutationTree } from "vuex";
import axios from "axios";

export interface CatArr {
  name: string;
  image: string;
}

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
  search: string;
  sort: string;
  big: string;
}

const state = {
  products: [] as ProdArr[],
  singleProduct: {} as ProdArr,
  filterData: [] as ProdArr[],
  searchData: [] as ProdArr[],
  categories: [] as CatArr[],
  singleCategory: [] as ProdArr[],
  brands: [] as BrandArr[],
  price: [] as Price[],
  stock: [] as Stock[],
  queryForFilter: {} as FilterQuery,
};

export const getters: GetterTree<State, RootState> = {
  getQueryForFilters(state: State) {
    return state.queryForFilter;
  },
  getAllProducts(state: State) {
    return state.products;
  },
  getBrands(state: State) {
    return state.brands;
  },
  getCategories(state: State) {
    return state.categories;
  },
  getSingleCategory(state: State) {
    return state.singleCategory;
  },
  getSingleProduct(state: State) {
    return state.singleProduct;
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
  getSearchData(state: State) {
    return state.searchData;
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
  setSingleCategory(state: State, val: ProdArr[]) {
    state.singleCategory = val;
  },
  setSingleProduct(state: State, val: ProdArr) {
    state.singleProduct = val;
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
  setSearchData(state: State, val: ProdArr[]) {
    state.searchData = val;
  },
};

const actions: ActionTree<RootState, RootState> = {
  async getQuery({ commit }, payload: FilterQuery) {
    commit("setQueryForFilters", payload);
  },
  async getAllProd({ commit }) {
    // if (!state.products.length) {
    return await axios
      .get("https://dummyjson.com/products?limit=100")
      .then((response) => {
        response.data.products.forEach((el: ProdArr) => {
          el.brand = el.brand.toLowerCase();
          el.thumbnail = el.thumbnail.replace(
            "https://i.dummyjson.com/data/",
            "/"
          );
          el.images.forEach((elem: string) => {
            elem = elem.replace("https://i.dummyjson.com/data/", "/");
          });
        });

        commit("setAllProducts", response.data.products as ProdArr[]);
      });
    // }
  },
  async getAllCat({ commit }) {
    // if (!state.categories.length) {
    //   console.log("get categories from server");
    //   return await axios
    //     .get("https://dummyjson.com/products/categories")
    //     .then((response) => {
    //       commit("setAllCategories", response.data as CatArr[]);
    //     });
    // } else {
    const cat = [] as CatArr[];
    state.products.forEach((el: ProdArr) => {
      if (!cat.some((elem) => elem.name === el.category)) {
        cat.push({
          name: el.category,
          image: el.thumbnail,
        });
      }
    });
    commit("setAllCategories", cat);
    //}
  },
  async getSingleCat({ commit }, payload: string) {
    if (state.products) {
      const arr = state.products.filter(
        (el: ProdArr) => el.category === payload
      );
      commit("setSingleCategory", arr);
    }
  },
  async getSingleProd({ commit }, payload: number) {
    if (state.products) {
      const val = state.products.filter((el: ProdArr) => el.id === payload);
      commit("setSingleProduct", val[0]);
    }
  },

  async getAllBrands({ commit }) {
    if (state.products) {
      const brand = [] as BrandArr;
      state.products.forEach((el: ProdArr) => {
        if (!brand.includes(el.brand)) {
          brand.push(el.brand);
        }
      });
      commit("setAllBrands", brand);
    }
  },

  async getPriceDiff({ commit }, payload: ProdArr[]) {
    if (payload.length) {
      const min: number = Math.min(
        ...payload.map((item: ProdArr) => item.price)
      );
      const max: number = Math.max(
        ...payload.map((item: ProdArr) => item.price)
      );
      const arr: Price = [min, max];
      commit("setPrice", arr);
    }
  },
  async getStockDiff({ commit }, payload: ProdArr[]) {
    if (payload.length) {
      const min: number = Math.min(
        ...payload.map((item: ProdArr) => item.stock)
      );
      const max: number = Math.max(
        ...payload.map((item: ProdArr) => item.stock)
      );
      const arr: Stock = [min, max];
      commit("setStock", arr);
    }
  },
  async getFilterParameters({ commit }, payload: FilterQuery) {
    if (state.products.length) {
      let arr: ProdArr[] = state.products;

      if (payload.categories && payload.categories.length) {
        arr = arr.filter((el: ProdArr) => {
          if (payload.categories.includes(el.category)) {
            return el;
          }
        });
      }
      if (payload.brands && payload.brands.length) {
        arr = arr.filter((el: ProdArr) => {
          if (payload.brands.includes(el.brand)) {
            return el;
          }
        });
      }
      if (payload.price && payload.price.length) {
        arr = arr.filter((el: ProdArr) => {
          if (el.price >= payload.price[0] && el.price <= payload.price[1]) {
            return el;
          }
        });
      }

      if (payload.stock && payload.stock.length) {
        arr = arr.filter((el: ProdArr) => {
          if (el.stock >= payload.stock[0] && el.stock <= payload.stock[1]) {
            return el;
          }
        });
      }
      if ((payload.search as string) && payload.search.length) {
        arr = arr.filter((el: ProdArr) => {
          if (
            el.brand
              .toUpperCase()
              .includes(payload.search.toUpperCase() as string) ||
            el.category
              .toUpperCase()
              .includes(payload.search.toUpperCase() as string) ||
            el.title
              .toUpperCase()
              .includes(payload.search.toUpperCase() as string) ||
            el.description
              .toUpperCase()
              .includes(payload.search.toUpperCase() as string) ||
            el.price.toString().indexOf(payload.search as string) > -1 ||
            el.stock.toString().indexOf(payload.search as string) > -1 ||
            el.rating.toString().indexOf(payload.search as string) > -1 ||
            el.discountPercentage.toString().indexOf(payload.search as string) >
              -1
          ) {
            return el;
          }
        });
      }
      if (payload.sort && payload.sort.length) {
        const items: string[] = payload.sort.split("-");
        //sort=price-ASC sort=price-DESC
        if (items[0] === "price" && items[1] === "ASC") {
          arr.sort((a: ProdArr, b: ProdArr) => a.price - b.price);
        } else if (items[0] === "price" && items[1] === "DESC") {
          arr.sort((a: ProdArr, b: ProdArr) => b.price - a.price);
        }
        //sort=discount-ASC sort=discount-DESC
        if (items[0] === "discount" && items[1] === "ASC") {
          arr.sort(
            (a: ProdArr, b: ProdArr) =>
              a.discountPercentage - b.discountPercentage
          );
        } else if (items[0] === "discount" && items[1] === "DESC") {
          arr.sort(
            (a: ProdArr, b: ProdArr) =>
              b.discountPercentage - a.discountPercentage
          );
        }

        //sort=rating-ASC sort=rating-DESC
        if (items[0] === "rating" && items[1] === "ASC") {
          arr.sort((a: ProdArr, b: ProdArr) => a.rating - b.rating);
        } else if (items[0] === "rating" && items[1] === "DESC") {
          arr.sort((a: ProdArr, b: ProdArr) => b.rating - a.rating);
        }
      }

      commit("setFilter", arr);
    }
  },
  async getSearchParameters({ commit }, payload: string) {
    if (state.products.length) {
      let arr: ProdArr[] = state.products;

      if (payload && payload.length) {
        arr = arr.filter((el: ProdArr) => {
          if (
            el.brand.toUpperCase().includes(payload.toUpperCase() as string) ||
            el.category
              .toUpperCase()
              .includes(payload.toUpperCase() as string) ||
            el.title.toUpperCase().includes(payload.toUpperCase() as string) ||
            el.description
              .toUpperCase()
              .includes(payload.toUpperCase() as string) ||
            el.price.toString().indexOf(payload as string) > -1 ||
            el.stock.toString().indexOf(payload as string) > -1 ||
            el.rating.toString().indexOf(payload as string) > -1 ||
            el.discountPercentage.toString().indexOf(payload as string) > -1
          ) {
            return el;
          }
        });
      }

      commit("setSearchData", arr);
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
