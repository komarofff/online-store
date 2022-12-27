import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductPage from "../views/ProductPage.vue";
import ErrorPage from "../views/ErrorPage.vue";
import CartPage from "../views/CartPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import SearchPage from "../views/SearchPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
    props: true,
  },
  {
    path: "/catalog/:id?",
    name: "categories",
    component: CategoriesPage,
    props: true,
  },
  {
    path: "/product-details/:id",
    component: ProductPage,
    props: true,
  },

  {
    path: "/search",
    name: "search",
    component: SearchPage,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
