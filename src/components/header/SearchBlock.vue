<template>
  <div class="header__search">
    <input
      type="text"
      v-model="search"
      placeholder="search"
      @change="goToSearchPage(search)"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBlock",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    goToSearchPage(val) {
      this.search = "";
      return this.$router.push({ name: "search", query: { search: val } });
    },
  },
};
</script>

<style scoped></style>
