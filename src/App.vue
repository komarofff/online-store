<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'categories' }">Categories</router-link> |
    <router-link :to="{ name: 'cart' }">Cart</router-link> |
    <router-link :to="{ name: 'checkout' }">Checkout</router-link> |
    <router-link to="/product/99">Product - 99 </router-link> |
    <router-link :to="{ name: 'error' }"> 404 </router-link> |
  </nav>
  <router-view />
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import "./styles/style";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
