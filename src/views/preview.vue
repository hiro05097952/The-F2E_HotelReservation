<template>
  <div id="app">
    <transition-group name="roomImg">
      <img :src="item.imageUrl" alt="" v-for="item in getPreImg"
      :key="item.name" v-show="item.name === menuName">
    </transition-group>
    <div class="logo">
    </div>
    <div class="roomTitle">
      <h2>{{ menuKey | roomNumberDis}}</h2>
      <h3>{{ menuName }}</h3>
    </div>
    <div class="right">
      <ul class="navbar">
        <li v-for="(item, key) in getRooms" :key="key" @mouseenter="() => {
          menuName = item.name
          menuKey = key
          }">
          <a href="#" @click.prevent="changeInfoPage(item.name)">{{item.name}}</a>
        </li>
      </ul>
      <ul class="footer">
        <li class="share">
          <a id="fbIcon" href="#"></a>
          <a id="igIcon" href="#"></a>
        </li>
        <li class="phone">
          <i id="phoneIcon"></i>
          02-17264937
        </li>
        <li class="email">
          <i id="emailIcon"></i>
          whitespace@whitespace.com.tw
        </li>
        <li class="address">
          <i id="addressIcon"></i>
          台北市羅斯福路十段30號
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview',
  data() {
    return {
      menuName: 'Deluxe Double Room',
      menuKey: 0,
      loading: false,
    };
  },
  methods: {
    changeInfoPage(name) {
      this.$store.commit('enterInfo', name);
      this.$router.push('information');
    },
  },
  computed: {
    getRooms() {
      if (this.$store.state.allRooms) {
        return this.$store.state.allRooms.items;
      }
      return false;
    },
    getPreImg() {
      if (this.$store.state.preImgArr) {
        return this.$store.state.preImgArr;
      }
      return false;
    },
  },
  filters: {
    roomNumberDis(value) {
      return `0${String(value + 1)}`;
    },
  },
  created() {
    const loader = this.$loading.show();
    setTimeout(() => {
      loader.hide();
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="@/assets/sass/all.scss">
</style>
