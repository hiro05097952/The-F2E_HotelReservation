<template>
    <div id="app" v-if="getOb">
      <div class="imgWrap" @click.prevent="$router.push('/information/imgbox')">
        <a href="#" class="logo" @click.prevent="$router.push('preview')"></a>
        <img :src="item" v-for="(item, key) in getOb.imageUrl" :key="key">
      </div>

      <ul class="infoL">
        <li class="title">{{ getOb.name }}</li>
        <li>房間人數限制：{{ getOb.descriptionShort.GuestMin }}~
          {{ getOb.descriptionShort.GuestMax }} 人</li>
        <li>床型：{{ getOb.descriptionShort.Bed | bed }}</li>
        <li>衛浴數量：{{ getOb.descriptionShort[`Private-Bath`] }} 間</li>
        <li>房間大小:{{ getOb.descriptionShort.Footage }} 平方公尺</li>
        <li class="desc">{{ getOb.description }}</li>
        <li class="br">﹨﹨﹨</li>
        <li class="checkin">
          <h4>Check in</h4>
          {{ getOb.checkInAndOut.checkInEarly }} － {{ getOb.checkInAndOut.checkInLate }}
        </li>
        <li class="checkout">
          <h4>Check Out</h4>
          {{ getOb.checkInAndOut.checkOut }}
        </li>
      </ul>

      <ul class="infoR">
        <li>NT.{{ getOb.normalDayPrice }}</li>
        <li>平日(一~四)</li>
        <li>NT.{{ getOb.holidayPrice }}</li>
        <li>假日(五~日)</li>
      </ul>

      <table class="iconWrap">
        <tr>
          <td :class="{'no' : !getOb.amenities['Wi-Fi']}"><i id="wifiIcon"></i>Wi-Fi</td>
          <td :class="{'no' : !getOb.amenities['Television']}"><i id="phoneIcon"></i>電話</td>
          <td :class="{'no' : !getOb.amenities['Great-View']}"><i id="viewIcon"></i>漂亮的視野</td>
        </tr>
        <tr>
          <td :class="{'no' : !getOb.amenities.Breakfast}"><i id="breakIcon"></i>早餐</td>
          <td :class="{'no' : !getOb.amenities['Air-Conditioner']}"><i id="airconIcon"></i>空調</td>
          <td :class="{'no' : getOb.amenities['Smoke-Free']}"><i id="smokeIcon"></i>禁止吸煙</td>
        </tr>
        <tr>
          <td :class="{'no' : !getOb.amenities['Mini-Bar']}"><i id="minibarIcon"></i>Mini Bar</td>
          <td :class="{'no' : !getOb.amenities.Refrigerator}"><i id="refIcon"></i>冰箱</td>
          <td :class="{'no' : !getOb.amenities['Child-Friendly']}"><i id="childIcon"></i>適合兒童</td>
        </tr>
        <tr>
          <td :class="{'no' : !getOb.amenities['Room-Service']}">
            <i id="serviceIcon"></i>
            Room Service
          </td>
          <td :class="{'no' : !getOb.amenities.Sofa}"><i id="sofaIcon"></i>沙發</td>
          <td :class="{'no' : !getOb.amenities['Pet-Friendly']}"><i id="petIcon"></i>寵物攜帶</td>
        </tr>
      </table>

      <div class="calendar">
        <HotelDatePicker format="DD/MM/YYYY"
        :i18n="messages" :maxNights="10" :startDate="tomorrow"
        :endDate="endDate" :disabledDates="getBooking" :enableCheckout="true">
        </HotelDatePicker>
      </div>
      <button @click.prevent="reservation">預約時段</button>
      <button @click.prevent="clearAPI" class="clearbtn">清除API</button>

      <router-view></router-view>
    </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';

export default {
  name: 'information',
  data() {
    return {
      messages: {
        'day-names': ['日', '一', '二', '三', '四', '五', '六'],
        'month-names': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        night: 'Night',
        nights: 'Nights',
      },
    };
  },
  components: {
    HotelDatePicker,
  },
  mounted() {
    const loader = this.$loading.show();
    setTimeout(() => {
      loader.hide();
    }, 1000);
  },
  computed: {
    getOb() {
      if (!this.$store.getters.infoOb) { return false; }
      return this.$store.getters.infoOb.room[0];
    },
    tomorrow() {
      const dt = new Date();
      return new Date(dt.getTime() + (1000 * 60 * 60 * 24));
    },
    endDate() {
      const dt = new Date();
      return new Date(dt.getTime() + (1000 * 60 * 60 * 24 * 90));
    },
    getBooking() {
      if (!this.$store.getters.infoOb) { return false; }
      return this.$store.getters.infoOb.booking.map((item) => item.date);
    },
  },
  filters: {
    bed(value) {
      if (value.length === 1) {
        switch (value[0]) {
          case 'Single':
            return '單人床';
          case 'Small Double':
            return '小雙人床';
          case 'Double':
            return '雙人床';
          case 'Queen':
            return '加大雙人床';
          default:
            return false;
        }
      } else {
        switch (value[1]) {
          case 'Double':
            return '單人床x2';
          case 'Queen':
            return '雙人床x2';
          default:
            return false;
        }
      }
    },
  },
  methods: {
    clearAPI() {
      this.axios.delete('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', this.$store.state.config)
        .then((response) => {
          alert('已清除！');
          console.log(response);
        })
        .catch((error) => { console.log(error); });
    },
    reservation() {
      console.log(this.$children[0]);
      if (!this.$children[0].checkIn || !this.$children[0].checkOut) {
        alert('請填寫正確日期');
        return;
      }
      const checkInDt = new Date(this.$children[0].checkIn);
      const checkIn = this.converter(checkInDt);

      const checkOutDt = new Date(this.$children[0].checkOut);
      const checkOut = this.converter(checkOutDt);
      // 幾晚 + 天數陣列
      const nights = (checkOutDt - checkInDt) / (1000 * 60 * 60 * 24);
      const nightArr = [];
      // 轉換日期格式 + 確認 平日 假日 總金額
      let holiday = 0;
      let weekday = 0;
      for (let i = 0; i < nights; i += 1) {
        nightArr.push(this.converter(checkInDt.getTime() + (1000 * 60 * 60 * 24 * i)));
        if (this.checkholiday(checkInDt.getTime() + (1000 * 60 * 60 * 24 * i)) === 'holiday') {
          holiday += 1;
        } else {
          weekday += 1;
        }
      }
      const total = this.getOb.normalDayPrice * weekday + this.getOb.holidayPrice * holiday;
      this.$store.commit('putCheckDate', {
        checkIn,
        checkOut,
        nightArr,
        holiday,
        weekday,
        total,
      });
      this.$router.push('information/validate');
    },
    converter(value) {
      const dt = new Date(value);
      const month = dt.getMonth() + 1 < 10 ? `0${String(dt.getMonth() + 1)}` : dt.getMonth() + 1;
      const day = dt.getDate() < 10 ? `0${String(dt.getDate())}` : dt.getDate();
      return `${dt.getFullYear()}-${month}-${day}`;
    },
    checkholiday(value) {
      const dt = new Date(value);
      if (dt.getDay() === 0 || dt.getDay() === 6) {
        return 'holiday';
      }
      return 'weekday';
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/info.scss" scoped>
</style>
