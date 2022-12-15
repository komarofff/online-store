import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import Products from "../modules/Products";
import Categories from "../modules/Categories";

export interface RootState {
  modules: {
    Products: typeof Products;
    Categories: typeof Categories;
  };
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    Products,
    Categories,
  },
});

export default store;
