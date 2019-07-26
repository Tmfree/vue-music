<template>
  <div class="page">
    <v-loading :is-play="list.length>0">
      <v-mv :data-list="list" />
    </v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
import vMv from "@/components/MvList.vue";
import { mapGetters } from "vuex";
import VLoading from "@/components/Loading";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapGetters(["mvList"])
  },
  watch: {
    mvList(val) {
      this.list = val;
    }
  },
  components: {
    vMv,
    VLoading
  },
  created() {
    this.getMvApi();
  },
  methods: {
    getMvApi() {
      let data = {
        limit: 24
      };
      this.$store.dispatch("getMvApi", data);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
