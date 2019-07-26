<template>
  <div class="container">
    <slot v-if="isPlay">页面报错</slot>
    <div class="loading" v-else>
      <div class="content">
        <img src="../assets/loading.gif" alt />
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    isPlay: {
      type: Boolean,
      default: false
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.loading {
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;
  .content {
    position: absolute;
    left: 50%;
    top: 40%;
    font-size: 0;
    transform: translate(-50%);
    img {
      width: 120px;
      height: 60px;
    }
    p {
      text-align: center;
      font-size: 24px;
      color: #333333;
    }
  }
}
</style>
