<template>
  <div class="success" @touchmove.prevent @mousewheel.prevent>
    <div class="wrap">
      <h2>預約成功</h2>
      <p>﹨﹨﹨</p>
      <i></i>
      <button @click.prevent="goInfo">回頁面</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'success',
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
