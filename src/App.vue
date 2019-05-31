<template>
  <div id="navs">
    <!--导航栏-->
    <nav-bar></nav-bar>
    <info></info>
    <!--视图-->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import navBar from '@/components/navBar.vue'
  import Info from "@/components/info";

  export default {
      name: 'App',
      provide(){
        return {
            reload: this.reload
        }
      },
      data(){
          return {
              isRouterAlive: true
          }
      },
      methods: {
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            })
        }
      },
      components: {
          Info,
          navBar
      }
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
