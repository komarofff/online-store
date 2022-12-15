<template>
  <div class="hello">
    <h1>Here is a list of products and filter</h1>
    <h2>{{ msg }}</h2>
    <h2>{{ text }}</h2>
    <p v-for="index in 5" :key="index">
      <button @click="addToCart(index)">Add to cart</button>
      |id={{ index }}|
      <button @click="delFromCart(index)" :ref="`id-${index}`">
        Delete from cart
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      text: "I`m a text from components",
    };
  },
  methods: {
    addToCart(val) {
      this.emitter.emit("addToCart", val);
    },
    delFromCart(val) {
      this.emitter.emit("delFromCart", val);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.delete {
  background: red;
}
</style>
