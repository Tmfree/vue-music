<template>
  <div class="personCenter">
    <div class="pic" v-if="loginInfo">
      <img :src="loginInfo.profile.avatarUrl" alt>
      <p class="name">{{loginInfo.profile.nickname}}</p>
    </div>
    <div class="pic" v-else>
      <p>
        <router-link :to="{name:'login', query:{redirect:$route.name}}">登录</router-link>
      </p>
    </div>
    <div class="wrapper">
      <div class="item" v-for="item in osList" :key="item.id">
        <router-link :to="item.url">
          <div class="left">
            <van-icon :name="item.iconName" size="20px"/>
            <span>{{item.text}}</span>
          </div>
          <div class="right">
            <van-icon name="arrow" size="20px"/>
          </div>
        </router-link>
      </div>
    </div>

    <div class="exit" @click="logoutHandle">
      <span>退出</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon } from "vant";
import { mapGetters, mapMutations } from "vuex";
import * as Type from '../mutations-type';
export default {
  data() {
    return {
      userInfo: null, //用户信息
      osList: [
        { url: "/login", id: 1, iconName: "envelop-o", text: "我的消息" },
        { url: "", id: 2, iconName: "star-o", text: "收藏" },
        { url: "", id: 3, iconName: "setting-o", text: "设置" }
      ]
    };
  },
  computed: {
    ...mapGetters(["loginInfo", "logout"])
  },
  watch: {
    logout(val) {
      this.clearLoginData();
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    ...mapMutations({
        clearLoginData: Type.SET_LOGININFO
    }),
    logoutHandle() {
      this.getLogoutApi();
    },
    getLogoutApi() {
      let data = {
        limit: 24
      };
      this.$store.dispatch("getLogoutApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.personCenter {
  width: 100%;
  height: 100vh;
  background-color: #f2f3f4;
  position: relative;
}
.pic {
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 100%;
  }
  p.name {
    font-size: 32px;
    color: #333333;
    margin-top: 10px;
  }
}
.wrapper {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 20px;
  .item {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #f2f3f4;
    a {
      display: flex;
      width: 100%;
      height: 90px;
      padding: 0 30px;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      font-size: 28px;
      color: #333333;
      .van-icon {
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
      }
    }
  }
}
div.exit {
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background-color: #ffffff;
  font-size: 28px;
  color: #cccccc;
  position: absolute;
  left: 0;
  bottom: 110px;
  z-index: 100;
}
</style>
