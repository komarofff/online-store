<template>
  <div class="hello">
    <h1>Here is a list of products and filter</h1>
    <h2>{{ msg }}</h2>
    <h2>{{ text }}</h2>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      text: "I`m a text from components",
    };
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
</style>
