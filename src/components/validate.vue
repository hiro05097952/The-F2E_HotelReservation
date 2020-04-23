<template>
  <div class="validateBox" @touchmove.prevent @mousewheel.prevent>
    <form action="">
      <h2>預約時段</h2>
      <p>﹨﹨﹨</p>
      <label class="name">
        <p>姓名</p>
        <input type="text" v-model="customerData.name">
      </label>
      <label class="phone">
        <p>電話</p>
        <input type="text" v-model="customerData.tel">
      </label>
      <label class="checkInOut">
        <p>預約起迄</p>
        <input type="text" readonly :value="this.$store.state.reservation.checkIn">
        ~
        <input type="text" readonly :value="this.$store.state.reservation.checkOut">
      </label>
      <ul class="receipt">
        <li v-if="this.$store.state.reservation.weekday !== 0">
          平日時段
          <span>{{ this.$store.state.reservation.weekday }}夜</span>
        </li>
        <li v-if="this.$store.state.reservation.holiday !== 0">
          假日時段
          <span>{{ this.$store.state.reservation.holiday }}夜</span>
        </li>
      </ul>
      <h3 class="total">= NT.{{ this.$store.state.reservation.total }}</h3>
      <button class="reset" @click.prevent="goback">取消</button>
      <button @click.prevent="booking">確定預約</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'validate',
  data() {
    return {
      customerData: {
        name: '',
        tel: '',
      },
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    booking() {
      if (!this.customerData.name || !this.customerData.tel) {
        alert('請輸入正確');
        return;
      }

      const params = {
        name: this.customerData.name,
        tel: this.customerData.tel,
        date: this.$store.state.reservation.nightArr,
      };

      this.axios.post(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.$store.getters.infoOb.room[0].id}`,
        params, this.$store.state.config)
        .then(() => {
          // console.log(response)
          this.$router.push('/information/success');
        })
        .catch((error) => {
          console.log(error);
          this.$router.push('/information/error');
        });
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/validate.scss" scoped>
</style>
