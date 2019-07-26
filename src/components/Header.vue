<template>
  <div class="page">
      <header class="header">
          <router-link to="" class="left"></router-link>
          <h3 class="center">kmMusic</h3>
          <router-link to="/search" class="right">
              <i class="iconfont">&#xe613;</i>
          </router-link>
      </header>
      <div class="whitespace"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
 .header{
     width: 100%;
     height: 90px;
     position: fixed;
     left: 0;top: 0;
     z-index: 99999;
     background-color: #FF5E00;
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding-left: 30px;
     padding-right: 30px;
     box-sizing: border-box;
     h3.center{
         font-size: 45px;
         color:#ffffff;
     }
     a{
         display: inline-block;
         font-size: 0;
         color:#ffffff;
         i{
             display: inline-block;
              font-size: 35px;
             margin-top: 5px;
         }
     }
     a.left{
         visibility: hidden;
     }
 }
 .whitespace{
     height: 90px;
 }
</style>
