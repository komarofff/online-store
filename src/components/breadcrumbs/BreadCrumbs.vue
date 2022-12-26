<template>
  <!--  <pre> {{ $route }}</pre>-->
  <div class="home-menu-crumbs">
    <h1 class="crumbs-start capitalize">{{ pageName }}</h1>
    <div class="crumbs-address">
      <router-link class="img-address" :to="{ name: 'home' }"
        ><img src="@/assets/icon/address-svg.svg" alt=""
      /></router-link>
      <img class="img-arrow" src="@/assets/icon/arrow-link-right.svg" alt="" />
      <template v-for="link in links" :key="link">
        <template v-if="link !== pageName">
          <a :href="`/${link}`" class="capitalize">{{ link }}</a>
          <img
            class="img-arrow"
            src="@/assets/icon/arrow-link-right.svg"
            alt=""
          />
        </template>
      </template>
      <p class="capitalize">{{ pageName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  data() {
    return {
      pageName: "",
      links: [],
    };
  },
  mounted() {
    this.pageName = this.$route.params.id
      ? this.$route.params.id
      : this.$route.name;
    console.log("this.pageName", this.pageName);
    this.links = this.$route.fullPath.split("/").filter((el) => el);
    console.log("this.links", this.links);
  },
};
</script>

<style scoped lang="scss">
.home-menu-crumbs {
  align-items: center;
}
.crumbs-address {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
}
.capitalize {
  text-transform: lowercase;
}
.capitalize:first-letter {
  text-transform: uppercase;
}
</style>
