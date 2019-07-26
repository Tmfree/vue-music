<template>
  <div class="page">
    <transition name="fade" v-if="singList">
      <div class="play" v-if="!showWord">
        <div class="header" :style="{backgroundColor: 'rgba(255, 94, 0,'+transitionOpacity+')'}">
          <router-link :to="jumpPath">
            <van-icon name="arrow-left" size="20px"/>歌单
          </router-link>
        </div>
        <v-scroll
          class="wrapper"
          :probe-type="probeType"
          :listen-scroll="listenScroll"
          @scroll="scroll"
          :data="singList"
        >
          <div class="content">
            <div
              class="top"
              :style="{'transform':'scale(' + transitionScale+ ')', backgroundImage:'url('+singList.coverImgUrl+')'}"
              ref="banner"
            >
              <div class="box">
                <p class="title">{{singList.name}}</p>
                <p class="flag">
                  <i class="iconfont">&#xe63f;</i>
                  {{singList.playCount | tofix}}
                </p>
              </div>
            </div>
            <div class="bottom">
              <div class="title">
                <span class="text">播放全部</span>
                <span class="count">(共{{singList.trackCount}}首)</span>
              </div>
              <ul class="list">
                <li
                  class="item"
                  v-for="(item, index) in singList.tracks"
                  :key="item.id"
                  @click="showWordHandle(index, true)"
                >
                  <p class="num">{{index+1}}</p>
                  <div class="sing">
                    <p class="name">{{item.name}}</p>
                    <p class="singer">{{item.ar | toformatSinger}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </v-scroll>
      </div>
      <song-word :music-id="musicId" :music-data="singList.tracks" v-if="showWord" @closeWord="showWordHandle"/>
    </transition>
    <v-loading v-else></v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
import SongWord from "@/components/SongWord";
import vScroll from "@/components/Scroll";
import VLoading from "@/components/Loading";
import { mapGetters } from "vuex";
import { Icon } from "vant";
export default {
  data() {
    return {
      singList: null,
      jumpPath: "", //跳转路径
      musicId: "", //url
      listenScroll: true,
      probeType: 3,
      transitionOpacity: 0,
      transitionScale: 1,
      getBannerHeight: 0, //获取banner高度
      showWord: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.jumpPath = from.path;
    });
  },
  computed: {
    ...mapGetters(["singOrderDetail"])
  },
  watch: {
    singOrderDetail(val) {
      this.singList = val.playlist;
      setTimeout(() => {
        this.getBannerHeight = this.$refs.banner.offsetHeight;
      }, 500);
    }
  },
  filters: {
    tofix(val) {
      return val > 100000 ? Math.floor(val / 10000) + "万" : val;
    },
    toformatSinger(val) {
      let str = "";
      val.forEach(val => {
        str += val.name + "/";
      });
      return str.substring(0, str.length - 1);
    }
  },
  components: {
    vScroll,
    SongWord,
    VLoading,
    [Icon.name]: Icon
  },
  created() {
    this.getSingOrderDetailApi();
  },
  methods: {
    getSingOrderDetailApi() {
      let id = this.$route.query.id;
      let data = {
        id
      };
      this.$store.dispatch("getSingOrderDetailApi", data);
    },
    scroll(pos) {
      let posY = parseInt(pos.y);
      if (posY < 0) {
        this.transitionOpacity =
          parseInt(Math.abs(pos.y)) / this.getBannerHeight;
        this.transitionScale = 1 - Math.abs(pos.y) / this.getBannerHeight;
      } else {
        this.transitionOpacity = 0;
        this.transitionScale = 1;
      }
    },
    showWordHandle(val=0,flag) {
      this.musicId = val;
      this.showWord = flag;
      this.transitionScale= 1;
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.play {
  height: 100vh;
}
.header {
  width: 100%;
  height: 90px;
  font-size: 28px;
  padding: 0 30px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  color: #ffffff;
  a {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
  }
}
.content {
  .top {
    width: 100%;
    height: 600px;
    position: relative;
    transform-origin: center bottom;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    .box {
      width: 100%;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      padding-left: 30px;
      left: 0;
      bottom: 20px;
      color: #ffffff;
      p.title {
        font-size: 32px;
      }
      p.flag {
        font-size: 28px;
        i{
          font-size: 28px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    border-radius: 20px 20px 0 0;
    position: relative;
    top: -20px;
    background-color: #f2f3f4;
    .title {
      height: 90px;
      line-height: 90px;
      padding: 0 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #e4e4e4;
      span.text {
        color: #333333;
        font-size: 32px;
        vertical-align: middle;
      }
      span.count {
        color: #999999;
        font-size: 28px;
        vertical-align: middle;
      }
    }
    .item {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #333333;
      padding: 20px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #e4e4e4;
      p.num {
        width: 10%;
        font-size: 32px;
        text-align: center;
      }
      div.sing {
        p.name {
          font-size: 32px;
        }
        p.singer {
          font-size: 24px;
          color: #999999;
        }
      }
    }
  }
}
</style>
