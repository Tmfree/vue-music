<template>
  <div class="footer">
    <router-link to="/home">
      <i class="iconfont">&#xe62a;</i>
      <span>首页</span>
    </router-link>
    <router-link to="/mv">
      <i class="iconfont">&#xe61e;</i>
      <span>MV</span>
    </router-link>
    <router-link to="/person">
      <i class="iconfont">&#xe61a;</i>
      <span>个人中心</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: 90px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 998;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-top:1px solid #9b9b9b;
  a {
    color: #000000;
    display: block;
    text-align: center;
    i {
      display: block;
      font-size: 35px;
    }
    span {
      font-size: 24px;
      display: block;
    }
  }
  .router-link-active{
      color: #FF5E00;
  }
}
</style>
