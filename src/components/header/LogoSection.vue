<template>
  <div class="header__logo">
    <router-link :to="{ name: 'home' }" @click="emitToResetFilters()"
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
