<template>
  <div class="singstyle">
    <v-loading :is-play="typeList.length>0">
      <van-tabs v-model="active" animated title-active-color="#FF5e00">
        <van-tab :title="item.name" v-for="(item,index) in addMusicType" :key="item.id">
          <v-card :isLoading="true" v-if="active ===index" :current-tag="item.name" />
        </van-tab>
      </van-tabs>
    </v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
import VCard from "@/components/CardList";
import VLoading from "@/components/Loading";
import { Tab, Tabs } from "vant";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      active: 0,
      typeList: []
    };
  },
  computed: {
    ...mapGetters(["musicTypeList"]),
    addMusicType() {
      let data = this.typeList;
      data.unshift({ name: "全部" });
      return data;
    }
  },
  watch: {
    musicTypeList(val) {
      this.typeList = val;
    }
  },
  components: {
    VCard,
    VLoading,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  created() {
    this.getMusicTypeApi();
  },
  methods: {
    getMusicTypeApi() {
      let data = {};
      this.$store.dispatch("getMusicTypeApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
.singstyle {
  .van-tab {
    font-size: 32px;
  }
}
</style>
