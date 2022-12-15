<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'categories' }">Categories</router-link> |
    <router-link :to="{ name: 'cart' }">Cart</router-link> |
    <router-link :to="{ name: 'checkout' }">Checkout</router-link> |
    <router-link to="/product/99">Product - 99 </router-link> |
    <router-link :to="{ name: 'error' }"> 404 </router-link> |
  </nav>
</template>

<script>
export default {
  name: "NavLinks",
};
</script>

<style scoped lang="scss">
nav {
  padding: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
