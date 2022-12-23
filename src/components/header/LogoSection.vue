<template>
  <div class="header__logo">
    <!--    <a href="/" @click="emitToResetFilters()"-->
    <!--      ><img src="../../assets/icon/logo.svg" alt="logo"-->
    <!--    /></a>-->
    <router-link :to="{ name: 'home' }"
      ><img src="../../assets/icon/logo.svg" alt="logo"
    /></router-link>
  </div>
</template>

<script>
export default {
  methods: {
    emitToResetFilters() {
      this.emitter.emit("resetFilters");
    },
  },
};
</script>

<style scoped></style>
