<template>
  <div class="word">
    <div class="container" v-if="lyricContent.length > 0 || nolyric">
      <header class="nav">
        <span @click="closePage">
          <van-icon name="arrow-down" size="20px" />歌词
        </span>
      </header>
      <div class="content" v-if="!nolyric">
        <v-scroll :s-height="50" ref="scroll" :probe-type="probeType">
          <div class="sub">
            <p
              :class="['lyric-item', {'active': activeIndex === index}]"
              v-for="(item,index) in lyricContent"
              :key="index"
            >{{item.txt}}</p>
          </div>
        </v-scroll>
      </div>
      <div class="content content01" v-else>暂无歌词</div>
      <div class="footer">
        <PlayControl
          :music-id="musicId"
          :music-data="musicData"
          @updateHande="compileTime"
          @prevOrNext="switchSongWordHandle"
        />
      </div>
    </div>
    <v-loading v-else></v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon } from "vant";
import vScroll from "@/components/Scroll";
import VLoading from "@/components/Loading";
import PlayControl from "@/components/PlayControl";
import { mapGetters } from "vuex";
import Lyric from "lyric-parser";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      lyricContent: [], //存放歌词
      nolyric: false,
      activeIndex: 0, //当前歌词的位置
      probeType: 3
    };
  },
  props: {
    musicData: {
      type: Array,
      default: []
    },
    musicId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["songWordDetail", "singOrderDetail"])
  },
  watch: {
    songWordDetail(val) {
      this.nolyric = false;
      if (val.nolyric) {
        this.nolyric = val.nolyric;
      } else {
        let lyric = new Lyric(val.lrc.lyric);
        this.lyricContent = lyric.lines;
        this.nolyric = this.lyricContent.length == 0;
      }
    }
  },
  components: {
    [Icon.name]: Icon,
    vScroll,
    VLoading,
    PlayControl
  },
  created() {
    this.getMusicWordApi(this.musicId);
  },
  methods: {
    getMusicWordApi(ind) {
      let id = this.musicData[ind].id;
      let data = {
        id
      };
      this.$store.dispatch("getMusicWordApi", data);
    },
    async compileTime(val) {
      this.activeIndex = await this.lyricContent.findIndex((item, index) => {
        return item.time < val && this.lyricContent[index + 1]
          ? this.lyricContent[index + 1].time > val
          : true;
      });
      //有歌词
      if (!this.nolyric) {
        this.$refs.scroll.scrollToElement("div.sub p.active", 500, true, true);
      }
    },
    closePage() {
      this.$emit("closeWord", false);
    },
    switchSongWordHandle(index) {
      setTimeout(() => {
        this.getMusicWordApi(index);
      }, 500);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background-color: rgba(242, 243, 244, 0.8);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(50px);
    background: url("https://darylxyx.github.io/Demo/blur/resource/images/bg1.jpg")
      center top no-repeat;
    background-size: cover;
  }
  .nav {
    width: 100%;
    height: 8vh;
    font-size: 28px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
  }
  .content {
    width: 100%;
    height: 80vh;
    text-align: center;
    .lyric-item {
      font-size: 28px;
      color: #999;
      line-height: 80px;
      &.active {
        color: #333;
      }
    }
  }
  .content01 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
  }
  .footer {
    width: 100%;
    height: 18vh;
  }
}
</style>
