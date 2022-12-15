<template>
  <HeaderView></HeaderView>
  <main>
    <router-view />
  </main>
  <FooterView></FooterView>
  <CheckoutModalView v-if="isShowCheckoutModal"></CheckoutModalView>
</template>
<script>
import HeaderView from "./components/HeaderView";
import FooterView from "./components/FooterView";
import CheckoutModalView from "./components/modals/CheckoutModalView";

export default {
  data() {
    return {
      isShowCheckoutModal: false,
    };
  },
  components: {
    HeaderView,
    FooterView,
    CheckoutModalView,
  },
};
</script>
<style lang="scss">
@import "./styles/style";
*,
*::before,
*::after {
  box-sizing: border-box;
  outline: none;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  margin: 5px;
}

.container {
  max-width: 1560px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

@media (max-width: 1580px) {
  .container {
    max-width: 1290px;
  }
}

@media (max-width: 1280px) {
  .container {
    max-width: 940px;
  }
}

@media (max-width: 992px) {
  .container {
    max-width: 710px;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style>
