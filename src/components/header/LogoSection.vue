<template>
  <div class="header__logo">
    <a href="/" @click="emitToResetFilters()"
      ><img src="../../assets/icon/logo.svg" alt="logo"
    /></a>
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
