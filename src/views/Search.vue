<template>
  <div class="page">
    <transition name="fade">
      <div class="search" v-if="!showWord">
        <header class="nav">
          <router-link :to="jumpPath">
            <van-icon name="arrow-left" color="#ffffff" size="25px"/>
          </router-link>
          <div class="content">
            <input v-autofoucs type="text" name="search" v-model="keyWords" placeholder="输入歌曲名">
            <van-icon
              class="close"
              name="clear"
              color="#999999"
              size="20px"
              v-if="isShowClose"
              @click="cancelHandel"
            />
          </div>
          <van-icon name="search" color="#ffffff" size="25px" @click="searchHandle"/>
        </header>
        <v-scroll
          class="wrapper"
          :probe-type="probeType"
          :pull-up="pullUp"
          @scrollToEnd="moreData"
          :data="singList"
          ref="scroll"
        >
          <div class="content">
            <div class="sub" v-if="singList.length>0">
              <div
                class="item"
                v-for="(item,index) in singList"
                :key="item.id"
                @click="showWordHandle(index, true)"
              >
                <span class="left">{{index+1}}</span>
                <div class="right">
                  <p class="name">{{item.name}}</p>
                  <p class="author">{{item.artists | toformatSinger}}</p>
                </div>
              </div>
            </div>
            <div class="finish" v-if="finished">已经到底</div>
          </div>
        </v-scroll>
        <div class="loading" v-if="isLoading">
          <div class="content">
            <img src="../assets/loading.gif" alt>
            <p>加载中...</p>
          </div>
        </div>
      </div>
      <song-word
        :music-id="musicId"
        :music-data="singList"
        v-if="showWord"
        @closeWord="showWordHandle"
      />
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import vScroll from "@/components/Scroll";
import SongWord from "@/components/SongWord";
import { mapGetters } from "vuex";
import { Icon } from "vant";
export default {
  data() {
    return {
      jumpPath: "", //跳转路径
      isShowClose: false,
      keyWords: "",
      probeType: 3,
      pullUp: true,
      isLoading: false,
      finished: false,
      singList: [],
      limit: 30,
      page: 1,
      showWord: false,
      musicId: "" //url
    };
  },
  directives: {
    'autofoucs':{
      inserted(el){
        el.focus();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.jumpPath = from.path;
    });
  },
  computed: {
    ...mapGetters(["searchList"])
  },

  watch: {
    searchList(val) {
      this.singList = this.singList.concat(val.songs);
      this.$refs.scroll.enable();
      if (this.singList.length >= 100) {
        this.finished = true;
      }
      this.isLoading = false;
    },
    keyWords(val) {
      if (val) {
        this.isShowClose = true;
      } else {
        this.isShowClose = false;
      }
    }
  },
  filters: {
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
    [Icon.name]: Icon,
    SongWord
  },
  methods: {
    moreData() {
      if (this.singList.length < 100) {
        this.isLoading = true;
        this.page += 1;
        this.$refs.scroll.disable();
        this._getSearchApi(this.keyWords);
      } else {
        return;
      }
    },
    searchHandle() {
      this.isLoading = true;
      this.singList = [];
      this.finished = false;
      this._getSearchApi(this.keyWords);
    },
    cancelHandel() {
      this.isShowClose = false;
      this.keyWords = "";
    },
    //关闭歌词页
    showWordHandle(val = 0, flag) {
      this.musicId = val;
      this.showWord = flag;
    },
    _getSearchApi(val) {
      let offset = (this.page - 1) * 30;
      let data = {
        keywords: val,
        type: 1,
        offset,
        limit: 30
      };
      this.$store.dispatch("getSearchApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.search {
  width: 100%;
  height: 100vh;
  padding-top: 90px;
  background-color: #ffffff;
  .nav {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 20px;
    box-sizing: border-box;
    background-color: #ff5e00;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    a {
      font-size: 0;
    }
    div.content {
      display: flex;
      align-items: center;
      width: 80%;
      height: 80%;
      background-color: #ffffff;
      position: relative;
      border-radius: 8px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent !important;
        color: #333333;
        font-size: 28px;
        padding-left: 15px;
      }
      .close {
        position: absolute;
        right: 20px;
      }
    }
  }
  .wrapper {
    .content {
      overflow: hidden;
      .item {
        border-bottom: 1px solid #f1f2f4;
        display: flex;
        align-items: center;
        margin-top: 20px;
        padding-bottom: 10px;
        span.left {
          color: #333333;
          font-size: 28px;
          display: block;
          width: 10%;
          text-align: center;
        }
        div.right {
          p.name {
            font-size: 32px;
            color: #333333;
          }
          p.author {
            font-size: 24px;
            color: #999999;
          }
        }
      }
      div.finish {
        width: 100%;
        font-size: 28px;
        color: #999999;
        text-align: center;
        padding: 10px 0;
      }
    }
  }
  .loading {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 104;
    background-color: rgba(255, 255, 255, 0.8);
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
}
</style>
