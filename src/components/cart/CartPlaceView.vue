<template>
  <strong>Items in card - {{ cartAmount }}</strong>
</template>

<script>
export default {
  name: "CartPlaceView",
  data() {
    return {
      cartAmount: JSON.parse(localStorage.getItem("cart")).length || 0,
      idInCart: [],
    };
  },
  mounted() {
    this.emitter.on("addToCart", (data) => {
      if (localStorage.getItem("cart")) {
        this.idInCart = JSON.parse(localStorage.getItem("cart"));
        let newList = this.idInCart.filter((el) => {
          if (Number(el.id) !== Number(data)) {
            return el;
          }
        });
        if (newList.length === this.idInCart.length) {
          this.idInCart.push({ id: data });
          localStorage.setItem("cart", JSON.stringify(this.idInCart));
        }
      } else {
        this.idInCart.push({ id: data });
        localStorage.setItem("cart", JSON.stringify(this.idInCart));
      }
      this.cartAmount = JSON.parse(localStorage.getItem("cart")).length;
    });
    this.emitter.on("delFromCart", (data) => {
      if (localStorage.getItem("cart")) {
        this.idInCart = JSON.parse(localStorage.getItem("cart"));
        let newList = this.idInCart.filter((el) => {
          if (Number(el.id) !== Number(data)) {
            return el;
          }
        });
        localStorage.setItem("cart", JSON.stringify(newList));
        this.cartAmount = JSON.parse(localStorage.getItem("cart")).length;
        // if (this.cartAmount === 0) {
        //   localStorage.removeItem("cart");
        // }
      }
    });
  },
};
</script>

<style scoped></style>
