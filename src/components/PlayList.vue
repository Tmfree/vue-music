<template>
  <div class="play">
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
      :data="data"
    >
      <div class="content">
        <div
          class="top"
          :style="{'transform':'scale(' + transitionScale+ ')', backgroundImage:'url('+data.coverImgUrl+')'}"
          ref="banner"
        >
          <div class="box">
            <p class="title">{{data.name}}</p>
            <p class="flag">
              <i class="iconfont">&#xe63f;</i>
              {{data.playCount | tofix}}
            </p>
          </div>
        </div>
        <div class="bottom">
          <div class="title">
            <span class="text">播放全部</span>
            <span class="count">(共{{data.trackCount}}首)</span>
          </div>
          <ul class="list">
            <li class="item" v-for="(item, index) in data.tracks" :key="item.id">
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
</template>

<script type="text/ecmascript-6">
import { Icon } from "vant";
import vScroll from "@/components/Scroll";
export default {
  name: "playList",
  data() {
    return {
      data: {},
      listenScroll: true,
      probeType: 3,
      transitionOpacity: 0,
      transitionScale: 1,
      getBannerHeight: 0 //获取banner高度
    };
  },
  props: {
    dataDetail: {
      type: Object,
      default: () => {
        return {};
      }
    },
    jumpPath: {
      type: String,
      default: ""
    }
  },
  watch: {
    dataDetail(val) {
      this.data = val;
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
    [Icon.name]: Icon
  },
  mounted() {
    //计算banner的高度
    this.getBannerHeight = this.$refs.banner.offsetHeight;
  },
  methods: {
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
    }
  }
};
</script>

<style scoped lang="scss">

</style>
