<template>
  <div class="modal" @click="closeModal()"></div>
  <div class="modal-content">
    <p class="modal__title">Personal details</p>
    <form action="#">
      <div class="modal__name error">
        <!-- валидация: для modal__name добавить error; для <p> is-invalid -->
        <input
          class="modal__input"
          type="text"
          placeholder="Name: Vova Pupkin"
        />
        <p class="is-invalid">Please enter your first and last name</p>
      </div>

      <div class="modal__phone no-arrows">
        <input
          class="modal__input"
          type="number"
          placeholder="Phone: +375290000"
        />
        <p class="is-invalid">Number must contain at least 9 digits</p>
      </div>

      <div class="modal__address">
        <input
          class="modal__input"
          type="text"
          placeholder="Delivery address"
        />
        <p class="is-invalid">Address cannot contain less than 3 words</p>
      </div>

      <div class="modal__email">
        <input
          class="modal__input"
          type="email"
          placeholder="E-mail: pupkin@gmail.com"
        />
        <p class="is-invalid">Please enter correct e-mail</p>
      </div>

      <p class="modal__card-title">Credit card details</p>
      <div class="modal__card-block">
        <div class="modal__card-top no-arrows">
          <!-- 3= .american  4= .visa  5= .master -->
          <div class="modal__card-logo american"></div>
          <input
            class="modal__card-number"
            type="number"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div class="modal__card-bottom">
          <div class="modal__card-data no-arrows">
            <label for="validThru">Valid:</label>
            <input id="validThru" type="number" placeholder="25 12" />
          </div>

          <div class="modal__card-cvv no-arrows">
            <label for="cvv">CVV:</label>
            <input id="cvv" type="number" placeholder="000" />
          </div>
        </div>
      </div>

      <button class="modal__submit">Confirm</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CheckoutModalView",
  methods: {
    closeModal() {
      this.emitter.emit("closeModal");
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 99;
  cursor: pointer;
}
.modal-content {
  z-index: 100;
}
</style>
