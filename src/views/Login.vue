<template>
  <div class="login">
    <div class="wrapper">
      <div class="content">
        <div class="imgc">
          <img src="../assets/login.png" alt>
        </div>
        <van-cell-group>
          <van-field v-model="user" label="用户名" placeholder="请输入手机号码" required/>
          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
        </van-cell-group>
        <p class="error" v-if="errorMessage">{{errorMessage}}</p>
        <van-button size="large" @click="submitData">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Field, CellGroup, Button } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: "", //用户名
      password: "", //密码
      errorMessage: "", //错误提示
      userInfo: {} //用户信息
    };
  },
  computed: {
    ...mapGetters(["loginInfo"])
  },
  watch: {
    loginInfo(val) {
        let redirect = this.$route.query.redirect;
        this.$router.push({ name: redirect });
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  methods: {
    checkData(val, type) {
      switch (type) {
        case 1:
          if (val) {
            if (!/^1[34578]\d{9}$/.test(val)) {
              this.errorMessage = "手机号码格式错误";
              return false;
            } else {
              return true;
            }
          } else {
            this.errorMessage = "手机号码不能为空";
            return false;
          }
          break;
        case 2:
          if (val) {
            return true;
          } else {
            this.errorMessage = "密码不能为空";
            return false;
          }
          break;
        default:
          break;
      }
    },
    submitData() {
      if (this.checkData(this.user, 1) && this.checkData(this.password, 2)) {
        this.getLoginApi(this.user, this.password);
      } else {
        setTimeout(() => {
          this.errorMessage = "";
        }, 1000);
      }
    },
    getLoginApi(user, psw) {
      let data = {
        phone: user,
        password: psw
      };
      this.$store.dispatch("getLoginApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f2f3f4;
  position: relative;
  overflow: hidden;
}
.content {
  width: 100%;
  margin-top: 70px;
  .imgc {
    width: 100%;
    text-align: center;
    margin-bottom: 70px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 100%;
    }
  }
  p.error {
    margin-top: 10px;
    font-size: 24px;
    color: red;
  }
}
.van-button {
  font-size: 32px;
}
</style>
