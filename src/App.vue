<template>
  <div id="app">
    <v-header v-if="$route.meta.isShowNavBar" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <v-footer v-if="$route.meta.isShowFooter" />
  </div>
</template>

<script>
import VHeader from "@/components/Header";
import VFooter from "@/components/Footer";
export default {
  components: {
    VHeader,
    VFooter
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 750px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
