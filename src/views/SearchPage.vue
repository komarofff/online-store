<template>
  <section class="container">
    <h1>This is a search page - query is a {{ query }}</h1>
  </section>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      query: this.$route.query.search,
    };
  },
  watch: {
    $route() {
      if (this.query !== this.$route.query.search) {
        this.goToSearchPage();
      }
    },
  },
  methods: {
    goToSearchPage() {
      this.$router.go(0);
    },
  },
};
</script>

<style scoped></style>
