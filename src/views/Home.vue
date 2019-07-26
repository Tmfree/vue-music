<template>
  <div class="home">
    <v-loading :is-play="swipeDataList.length>0">
      <div class="container">
        <v-swipe />
        <div class="navbar">
          <van-nav-bar>
            <div slot="left" class="left">
              <span>全部歌单</span>
            </div>
            <div slot="right" class="right">
              <router-link to="/singstyle">
                更多
                <van-icon name="arrow" color="#999999" size="14px" />
              </router-link>
            </div>
          </van-nav-bar>
        </div>
        <v-card :isLoading="false" />
      </div>
    </v-loading>
  </div>
</template>

<script>
import VSwipe from "@/components/Swipe";
import VCard from "@/components/CardList";
import VLoading from "@/components/Loading";
import { NavBar, Icon } from "vant";
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      musicList: []
    };
  },
  computed: {
    ...mapGetters(["swipeDataList"])
  },
  watch: {
  },
  components: {
    VSwipe,
    VCard,
    VLoading,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  created() {
    this.getSwipeApi();
  },
  methods: {
    getSwipeApi() {
      let data = {};
      this.$store.dispatch("getSwipeApi", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  box-sizing: border-box;
  .van-nav-bar {
    height: 80px;
    line-height: 80px;
    background-color: transparent;
  }
  .left {
    color: #333333;
    font-size: 26px;
    font-weight: 500;
    span {
      border-left: 5px solid #ff5e00;
      padding-left: 5px;
    }
  }
  .right {
    color: #999999;
    font-size: 18px;
    a {
      display: flex;
      align-items: center;
    }
  }
}
</style>
