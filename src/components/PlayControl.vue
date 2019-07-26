<template>
  <div class="playcontrol">
    <audio
      :src="'https://music.163.com/song/media/outer/url?id='+musicData[musicIndex].id+'.mp3'"
      preload="auto"
      ref="audio"
    ></audio>
    <div class="control">
      <div class="progress">
        <span>{{currentTime | toformatTime}}</span>
        <van-slider v-model="slideValue" @change="onChange" />
        <span>{{duration | toformatTime}}</span>
      </div>
      <div class="content">
        <div class="mode">
          <i class="iconfont icon-random"></i>
          <i class="iconfont icon-loop" v-if="false"></i>
        </div>
        <div class="play">
          <div class="prev" @click="prevHandle">
            <i class="iconfont icon-prev"></i>
          </div>
          <div class="player" @click="playHandle">
            <i class="iconfont icon-bofangicon" v-if="paused"></i>
            <i class="iconfont icon-stop" v-else></i>
          </div>
          <div class="next" @click="nextHandle">
            <i class="iconfont icon-test"></i>
          </div>
        </div>
        <div class="collent">
          <i class="iconfont icon-like"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Slider } from "vant";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      slideValue: 0,
      duration: "",
      currentTime: "",
      paused: false, //是否停止播放
      musicIndex: 0, //当前歌曲索引
      debounce: false //多次点击防抖
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
  watch: {
    musicId: {
      immediate: true,
      handler: function(val) {
        this.musicIndex = val;
      }
    },
    songWordDetail: {
      immediate: true,
      handler(val) {
        this.debounce = true;
      }
    }
  },
  computed: {
    ...mapGetters(["singOrderDetail", "songWordDetail"])
  },
  components: {
    [Slider.name]: Slider
  },
  filters: {
    toformatTime(val) {
      let time = parseInt(val);
      let min =
        time / 60 < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
      let sec = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      return `${min}:${sec}`;
    }
  },
  mounted() {
    this._initHandle();
    let audio = this.$refs.audio;
    audio.play();
  },
  methods: {
    _initHandle() {
      this.$refs.audio.addEventListener("canplay", e => {
        this.duration = parseInt(e.target.duration);
        this.currentTime = parseInt(e.target.currentTime);
      });
      this.$refs.audio.addEventListener("timeupdate", e => {
        this.currentTime = parseInt(e.target.currentTime);
        this.slideValue = (this.currentTime / this.duration) * 100;
        this.$emit("updateHande", parseInt(e.target.currentTime * 1000));
      });
      this.$refs.audio.addEventListener("ended", e => {
        this.AutoNextPlay(0);
      });
    },
    onChange(value) {
      this.$refs.audio.currentTime = (value * this.duration) / 100;
    },
    playHandle() {
      let audio = this.$refs.audio;
      if (audio.paused) {
        this.paused = false;
        audio.play();
      } else {
        this.paused = true;
        audio.pause();
      }
    },
    AutoNextPlay(flag) {
      // 0：结束自动下一首，1：选择上一首，2：选择下一首
      let len = this.musicData.length - 1;
      let audio = this.$refs.audio;
      if (flag === 0) {
        this.musicIndex++;
      } else if (flag === 1) {
        this.musicIndex--;
      } else {
        this.musicIndex++;
      }
      this.musicIndex =
        this.musicIndex > len ? 0 : this.musicIndex < 0 ? len : this.musicIndex;
      //自动播放
      if (flag === 1 || flag === 2) {
        if (audio.paused) {
          audio.autoplay = false;
          this.paused = true;
        } else {
          audio.autoplay = true;
          this.paused = false;
        }
      } else {
        audio.autoplay = true;
        this.paused = false;
      }
      this.$emit("prevOrNext", this.musicIndex);
    },
    prevHandle() {
      if (!this.debounce) {
        return;
      }
      this.AutoNextPlay(1);

      this.debounce = false;
    },
    nextHandle() {
      if (!this.debounce) {
        return;
      }
      this.AutoNextPlay(2);
      this.debounce = false;
    }
  }
};
</script>

<style scoped lang="scss">
.control {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px 50px;
}
.progress {
  width: 100%;
  font-size: 0;
  display: flex;
  align-items: center;
  span {
    font-size: 24px;
    color: #ffffff;
  }
  .van-slider {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
}
.content {
  width: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0;
  margin-top: 30px;
  .play {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45%;
  }
}
</style>
