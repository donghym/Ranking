<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {return {}},
  methods:{
// 　　  _isMobile() {
//       let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
//       return flag;
//     },
//     _isLength(){
//       return document.body.clientWidth<=720
//     }
  },
  mounted() {
    // if (this._isLength()) {
    //   this.$router.replace('/mranking');
    // } else {
    //   this.$router.replace('/ranking');
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;height:100%;
}
</style>
