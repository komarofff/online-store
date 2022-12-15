import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProductPage from "../views/ProductPage.vue";
import ErrorPage from "../views/ErrorPage.vue";
import CartPage from "../views/CartPage.vue";
import CheckoutPage from "../views/CheckoutPage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";

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
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
    props: true,
  },
  {
    path: "/categories/:id?",
    name: "categories",
    component: CategoriesPage,
    props: true,
  },
  {
    path: "/product/:id",
    component: ProductPage,
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
