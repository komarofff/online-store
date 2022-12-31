import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductPage from "../views/ProductPage.vue";
import ErrorPage from "../views/ErrorPage.vue";
import CartPage from "../views/CartPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Home | K&K Online Store" },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
    props: true,
    meta: { title: "Cart  | K&K Online Store" },
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
    name: "product-page",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: ErrorPage,
    props: true,
    meta: { title: "404 | Error page" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
