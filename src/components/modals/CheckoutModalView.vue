<template>
  <div class="modal" @click="closeModal()" @keyup.esc="closeModal()"></div>
  <div class="modal-content">
    <h1 v-if="isShowLastMessage">
      Thank you for your order. You will be sent to the main page in
      {{ sec }} seconds
    </h1>
    <p v-if="isShowModal" class="modal__title">Personal details</p>
    <form v-if="isShowModal" action="#">
      <div class="modal__name" :class="{ error: !nameValid }">
        <!-- валидация: для modal__name добавить error; для <p> is-invalid -->
        <input
          class="modal__input"
          type="text"
          placeholder="Name: Vova Pupkin"
          v-model="name"
          @input="isNameInvalid()"
        />
        <p class="is-invalid">
          Please enter your first and last name . First letters should be a
          capital
        </p>
      </div>
      <div class="modal__phone no-arrows" :class="{ error: !phoneValid }">
        <input
          class="modal__input"
          type="text"
          placeholder="Phone: +375290000"
          v-model="phone"
          @input="isPhoneInvalid()"
        />
        <p class="is-invalid">
          Number must contain at least 9 digits and starts with +
        </p>
      </div>

      <div class="modal__address" :class="{ error: !addressValid }">
        <input
          class="modal__input"
          type="text"
          placeholder="Delivery address"
          v-model="address"
          @input="isAddressInvalid()"
        />
        <p class="is-invalid">
          Address cannot contain less than 3 words. Every word must contain at
          least 5 symbols
        </p>
      </div>

      <div class="modal__email" :class="{ error: !emailValid }">
        <input
          class="modal__input"
          type="text"
          placeholder="E-mail: pupkin@gmail.com"
          v-model="email"
          @input="isEmailInvalid()"
        />
        <p class="is-invalid">Please enter correct e-mail</p>
      </div>

      <p class="modal__card-title">Credit card details</p>
      <div class="modal__card-block">
        <div
          class="modal__card-top no-arrows"
          :class="{ error: !cardNumberValid }"
        >
          <!-- 3= .american  4= .visa  5= .master -->
          <div
            class="modal__card-logo"
            :class="{
              american: String(creditCardNumber).startsWith('3'),
              visa: String(creditCardNumber).startsWith('4'),
              master: String(creditCardNumber).startsWith('5'),
            }"
          ></div>
          <input
            class="modal__card-number"
            type="text"
            placeholder="0000 0000 0000 0000"
            v-model="creditCardNumber"
            @input="isNumberValid()"
          />
        </div>

        <div class="modal__card-bottom">
          <div
            class="modal__card-data no-arrows"
            :class="{ error: !cardValidValid }"
          >
            <label for="validThru">Valid:</label>
            <input
              id="validThru"
              type="text"
              placeholder="12 23"
              v-model="creditCardValid"
              @input="isValidValid()"
            />
          </div>

          <div
            class="modal__card-cvv no-arrows"
            :class="{ error: !cardCvvValid }"
          >
            <label for="cvv">CVV:</label>
            <input
              id="cvv"
              type="text"
              placeholder="000"
              v-model="creditCardCvv"
              @input="isCvvValid()"
            />
          </div>
        </div>
        <p class="is-invalid">Card invalid</p>
      </div>
      {{ isCanSend }}
      <button class="modal__submit" @click.prevent="submit()">Confirm</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      sec: 3,
      isShowModal: true,
      isShowLastMessage: false,
      name: "",
      nameValid: true,
      phone: "",
      phoneValid: true,
      address: "",
      addressValid: true,
      email: "",
      emailValid: true,
      creditCardNumber: "",
      cardNumberValid: true,
      creditCardValid: "",
      cardValidValid: true,
      creditCardCvv: "",
      cardCvvValid: true,
      isCanSend: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["getCartArray"]),
  },
  methods: {
    ...mapActions("Cart", ["clearCart"]),
    closeModal() {
      this.emitter.emit("closeModal");
    },
    checkSenderAbility() {
      console.log(
        this.nameValid,
        this.name,
        this.phoneValid,
        this.phone,
        this.addressValid,
        this.address,
        this.emailValid,
        this.email,
        this.creditCardNumber,
        this.cardNumberValid,
        this.creditCardValid,
        this.cardValidValid,
        this.creditCardCvv,
        this.cardCvvValid
      );
      if (
        this.nameValid &&
        this.name &&
        this.phoneValid &&
        this.phone &&
        this.addressValid &&
        this.address &&
        this.emailValid &&
        this.email &&
        this.creditCardNumber &&
        this.cardNumberValid &&
        this.creditCardValid &&
        this.cardValidValid &&
        this.creditCardCvv &&
        this.cardCvvValid
      ) {
        this.isCanSend = true;
      } else {
        this.isCanSend = false;
      }
    },
    isNameInvalid() {
      let separated = this.name
        .split(" ")
        .filter((el) => el.length >= 3)
        .filter((el) => el[0].toUpperCase() === el[0]);
      this.nameValid =
        separated.length >= 2 &&
        this.name.split(" ").length === separated.length;
      this.checkSenderAbility();
    },
    isPhoneInvalid() {
      let isNumbers = false;
      let isPlusStartLetter = this.phone.startsWith("+");
      let isNormalLength = this.phone.length >= 10;
      for (let i = 1; i < this.phone.length; i++) {
        isNumbers = !isNaN(this.phone[i]);
      }
      this.phoneValid = isNumbers && isPlusStartLetter && isNormalLength;
      this.checkSenderAbility();
    },
    isAddressInvalid() {
      let separated = this.address.split(" ").filter((el) => el.length >= 5);
      this.addressValid = separated.length >= 3;
      this.checkSenderAbility();
    },
    isEmailInvalid() {
      if (
        this.email
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        this.emailValid = true;
      } else {
        this.emailValid = false;
      }

      this.checkSenderAbility();
    },
    isNumberValid() {
      this.creditCardNumber = this.creditCardNumber.replace(/[^0-9]/g, "");
      if (this.creditCardNumber.length >= 16) {
        this.creditCardNumber = this.creditCardNumber.substring(0, 16);
        this.cardNumberValid = true;
      }
      if (this.creditCardNumber.length < 16) this.cardNumberValid = false;
      this.checkSenderAbility();
    },
    isCvvValid() {
      this.creditCardCvv = this.creditCardCvv.replace(/[^0-9]/g, "");
      if (this.creditCardCvv.length >= 3) {
        this.creditCardCvv = this.creditCardCvv.substring(0, 3);
        this.cardCvvValid = true;
        this.checkSenderAbility();
      }
      if (this.creditCardCvv.length < 3) this.cardCvvValid = false;
    },
    isValidValid() {
      this.creditCardValid = this.creditCardValid.replace(/[^0-9/]/g, "");
      if (this.creditCardValid.length === 2) {
        this.creditCardValid += "/";
      }
      if (this.creditCardValid.length >= 5) {
        this.creditCardValid = this.creditCardValid.substring(0, 5);
      }
      if (
        this.creditCardValid.length < 5 ||
        Number(this.creditCardValid.split("").slice(0, 2).join("")) > 12
      ) {
        this.cardValidValid = false;
      } else {
        this.cardValidValid = true;
      }
      this.checkSenderAbility();
    },
    async submit() {
      if (!this.name && this.nameValid) {
        this.nameValid = false;
      }
      if (!this.phone && this.phoneValid) {
        this.phoneValid = false;
      }
      if (!this.address && this.addressValid) {
        this.addressValid = false;
      }
      if (!this.email && this.emailValid) {
        this.emailValid = false;
      }
      if (!this.creditCardNumber && this.cardNumberValid) {
        this.cardNumberValid = false;
      }
      if (!this.creditCardValid && this.cardValidValid) {
        this.cardValidValid = false;
      }
      if (!this.creditCardCvv && this.cardCvvValid) {
        this.cardCvvValid = false;
      }
      this.checkSenderAbility();
      if (this.isCanSend) {
        await this.clearCart();
        this.isShowModal = false;
        this.isShowLastMessage = true;
        let interval = setInterval(this.timer, 1000);

        setTimeout(() => {
          this.isShowLastMessage = false;
          clearInterval(interval);
          this.emitter.emit("closeModal");
          this.$router.push({ name: "home" });
        }, 3000);
        // надпись товары отправлены и через пару секунд переход на главную
      }
    },
    timer() {
      this.sec = this.sec - 1;
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

.modal__name,
.modal__phone,
.modal__address,
.modal__email {
  margin-top: 25px;
}

.error .is-invalid {
  display: block;
  color: red !important;
  font-size: 12px;
  position: relative;
  top: 2px;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  text-align: center;
  margin: 0;
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 90%;
  }
}
</style>
