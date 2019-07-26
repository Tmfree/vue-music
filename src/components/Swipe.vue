<template>
  <div class="swipe">
    <van-swipe indicator-color="#FF5E00">
      <van-swipe-item v-for="(item,index) in swipeDataList" :key="index">
        <img :src="item.imageUrl" :title="item.typeTitle" alt>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swipe, SwipeItem } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      swipeList: []
    };
  },
  computed: {
    ...mapGetters(["swipeDataList"])
  },
  watch: {
    swipeDataList: {
      immediate: true,
      handler: function(val) {
        this.swipeList = val;
      }
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  created() {
    //this.getSwipeApi();
  },
  methods: {
    getSwipeApi() {
      let data = {};
      this.$store.dispatch("getSwipeApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.swipe {
  width: 100%;
  height: 300px;
  .van-swipe {
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
