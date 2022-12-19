import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import Products from "./modules/Products";
import Categories from "./modules/Categories";
import Cart from "./modules/Cart";
import Filter from "./modules/Filter";
export interface RootState {
  modules: {
    Products: typeof Products;
    Categories: typeof Categories;
    Cart: typeof Cart;
    Filter: typeof Filter;
  };
}

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    Products,
    Categories,
    Cart,
    Filter,
  },
});

export default store;
