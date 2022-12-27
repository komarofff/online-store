<template>
  <div class="modal" @click="closeModal()" @keyup.esc="closeModal()"></div>
  <div class="modal-content">
    <p class="modal__title">Personal details</p>
    <form action="#">
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
              placeholder="25 12"
              v-model="creditCardValid"
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
      <button class="modal__submit">Confirm</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nameValid: true,
      phone: "",
      phoneValid: true,
      address: "",
      addressValid: true,
      email: "",
      emailValid: true,
      creditCardNumber: "",
      creditCardValid: "",
      creditCardCvv: "",
      cardNumberValid: true,
      cardValidValid: true,
      cardCvvValid: true,
      isCanSend: false,
    };
  },
  methods: {
    closeModal() {
      this.emitter.emit("closeModal");
    },
    checkSenderAbility() {
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
        this.cardValidValid &&
        this.cardCvvValid &&
        this.creditCardValid &&
        this.creditCardCvv
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
      if (this.creditCardNumber.length > 16) {
        this.creditCardNumber = this.creditCardNumber.substring(0, 16);
        this.cardNumberValid = true;
      }
      if (this.creditCardNumber.length < 16) this.cardNumberValid = false;
    },
    isCvvValid() {
      this.creditCardCvv = this.creditCardCvv.replace(/[^0-9]/g, "");
      if (this.creditCardCvv.length >= 3) {
        this.creditCardCvv = this.creditCardCvv.substring(0, 3);
        this.cardCvvValid = true;
      }
      if (this.creditCardCvv.length < 3) this.cardCvvValid = false;
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
