<template>
  <div class="home-cards">
    <div class="card-container">
      <router-link
        :to="`/catalog/${category.name}`"
        class="card-item card-hover"
        v-for="category in getCategories"
        :key="category.id"
      >
        <div class="card-photo">
          <img class="card-img" :src="category.image" :alt="category.name" />
          <p class="card-name">
            {{ category.name }}
          </p>
          <p class="background-black"></p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isLoader: false,
    };
  },
  async mounted() {
    this.isLoader = true;
    this.isLoader = false;
  },
  watch: {},
  computed: {
    ...mapGetters("Filter", ["getCategories"]),
  },
};
</script>

<style scoped lang="scss">
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 200px));
  grid-gap: 20px;
  justify-content: space-around;
}
.card-photo {
  position: relative;
  width: 200px;
  height: 200px;
  .card-img {
    z-index: 0;
  }

  .card-name {
    transition: 0.3s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    font-size: 25px;
    z-index: 3;
    color: #fff;
  }

  &:hover {
    .card-name {
      transform: translate(-50%, -50%) scale(0.9);
    }
  }

  .background-black {
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }
}
</style>
