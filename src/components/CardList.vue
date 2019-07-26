<template>
  <div class="cardlist">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="100"
      @load="onLoad"
    >
      <div v-for="item in dataList" :key="item.id" class="item">
        <router-link :to="{ name:'playlist', query:{'id':item.id} }" class="content">
          <div class="top">
            <img v-lazy="item.coverImgUrl" alt />
            <p class="flag">
              <i class="iconfont">&#xe63f;</i>
              {{item.playCount | tofix}}
            </p>
          </div>
          <p class="bottom">{{item.name}}</p>
        </router-link>
      </div>
      <div class="loading" slot="loading">
        <van-loading type="spinner" color="#FF5E00" size="20px" />加载中...
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
      loading: false,
      finished: false,
      limit: 0,
      dataList: []
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    currentTag: {
      type: String,
      default: "全部"
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
  computed: {
    ...mapGetters(["allMusicList"])
  },
  watch: {
    allMusicList(val) {
      this.dataList = val;
      //加载完毕
      setTimeout(() => {
        this.loading = false;
      }, 500);
      if (!this.isLoading || val.length >= 100) {
        // 数据全部加载完成
        this.finished = true;
      }
    }
  },
  created() {},
  methods: {
    onLoad() {
      this.getAllMusicApi();
    },
    getAllMusicApi() {
      this.limit += 24;
      let data = {
        limit: this.limit,
        cat: this.currentTag
      };
      this.$store.dispatch("getAllMusicApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.cardlist {
  margin-bottom: 90px;
  .van-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .van-list__finished-text {
      width: 100%;
    }
  }
  .item {
    width: 33%;
    height: auto;
    margin-bottom: 20px;
    a.content {
      display: block;
      width: 100%;
      height: auto;
    }
    div.top {
      width: 100%;
      height: 250px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
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
    p.bottom {
      font-size: 26px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 0 10px;
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
