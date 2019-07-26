<template>
  <div class="cardlist">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="30"
      @load="onLoad"
    >
      <div v-for="(item,index) in list" :key="item.id" class="item">
        <router-link to class="content">
          <div class="top">
            <video
              :ref="'video'+item.id"
              :src="currentMvUrl[index]"
              :poster="item.picUrl"
              preload="auto"
              @click="playHandle"
            ></video>
            <p class="flag">
              <i class="iconfont">&#xe63f;</i>
              {{item.playCount | tofix}}
            </p>
            <div class="play" v-if="false">
              <i class="iconfont icon-bofangicon" v-if="paused"></i>
            </div>
          </div>
          <div class="bottom">
            <p class="title">{{item.name}}</p>
            <div class="state" v-if="false">
              <p class="flag">
                <i class="iconfont">&#xe63f;</i>(100)
              </p>
              <p class="flag">
                <i class="iconfont">&#xe63f;</i>(100)
              </p>
              <p class="flag">
                <i class="iconfont">&#xe63f;</i>(100)
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="loading" slot="loading">
        <van-loading type="spinner" color="#FF5E00" size="20px"/>加载中...
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { List, Loading } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      loading: true,
      finished: false,
      paused: true,
      currentMvUrl: []
    };
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters(["mvUrl"])
  },
  watch: {
    dataList: {
      immediate: true,
      handler: function(val) {
        this.list = val;
        this.loading = false;
        val.forEach((item, index) => {
          this.getMvUrl(item.id);
        });
      }
    },
    mvUrl(val) {
      this.currentMvUrl.push(val.url);
    }
  },
  filters: {
    tofix(val) {
      return val > 100000 ? Math.floor(val / 10000) + "万" : val;
    }
  },
  components: {
    [List.name]: List,
    [Loading.name]: Loading
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = true;
        if (this.dataList.length >= 4) {
          this.loading = false;
          this.finished = true;
        }
      }, 500);
      //判断是否为首页引入组件显示9条数据
    },
    async getMvUrl(val) {
      let data = {
        id: val
      };
      await this.$store.dispatch("getMvUrlApi", data);
    },
    playHandle(e) {
      let video = e.target;
      if (video.paused) {
        this.paused = false;
        video.play();
      } else {
        this.paused = true;
        video.pause();
      }
      console.log(video.width);
    }
  }
};
</script>

<style scoped lang="scss">
.cardlist {
  margin-bottom: 90px;
  .van-list {
    .van-list__finished-text {
      width: 100%;
    }
  }
  .item {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    a.content {
      display: block;
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
    div.top {
      width: 100%;
      height: 400px;
      overflow: hidden;
      position: relative;
      video {
        width: 100%;
        height: 400px;
        object-fit: fill;
      }
      div.play {
        position: absolute;
        z-index: 100;
        top: 40%;
        left: 0;
        width: 100%;
        font-size: 0;
        text-align: center;
        i {
          font-size: 80px;
          color: #ffffff;
        }
      }
      p.flag {
        color: #ffffff;
        font-size: 28px;
        position: absolute;
        top: 10px;
        right: 20px;
        i {
          font-size: 28px;
        }
      }
    }
    div.bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      box-sizing: border-box;
      p.title {
        font-size: 32px;
        color: #333333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      div.state {
        display: flex;
        p.flag {
          font-size: 24px;
          margin-left: 10px;
          i {
            font-size: 24px;
          }
        }
      }
    }
  }
  .loading {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #ff5e00;
    margin: 20px 0;
  }
  .van-loading {
    border: 1px solid transparent;
  }
}
</style>
