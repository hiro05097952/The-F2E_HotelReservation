<template>
  <div class="error" @touchmove.prevent @mousewheel.prevent>
    <div class="wrap">
      <h2>預約失敗</h2>
      <p>﹨﹨﹨</p>
      <h4>預約時間已被人預訂</h4>
      <button @click.prevent="goInfo">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data() {
    return {
    };
  },
  methods: {
    goInfo() {
      this.$router.push('/information');
    },
  },
};
</script>

<style lang="scss" src="@/assets/sass/validate.scss" scoped>
</style>
