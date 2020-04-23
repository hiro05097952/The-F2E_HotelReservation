<template>
  <div class="imgbox" v-if="getImg" @touchmove.prevent @mousewheel.prevent @click.self="goback">
    <i class="arrowL" @click="changeImg(-1)">&lt;</i>
    <transition-group name="fade">
      <img :src="item" v-show="index === nowImg"
      v-for="(item, index) in getImg.imageUrl" :key="item">
    </transition-group>
    <i class="arrowR" @click="changeImg(1)">&gt;</i>

    <h3>{{ getImg.name }}</h3>
    <p class="page">{{ nowImg + 1 }} / {{ getImg.imageUrl.length }}</p>
  </div>
</template>

<script>
export default {
  name: 'imgbox',
  data() {
    return {
      nowImg: 0,
    };
  },
  computed: {
    getImg() {
      if (!this.$store.getters.infoOb) { return false; }
      return this.$store.getters.infoOb.room[0];
    },
  },
  methods: {
    changeImg(value) {
      if (this.nowImg === 2 && value === 1) {
        this.nowImg = 0;
      } else if (this.nowImg === 0 && value === -1) {
        this.nowImg = 2;
      } else {
        this.nowImg += value;
      }
    },
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/imgbox.scss" scoped>
</style>
