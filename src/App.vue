<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
  <FooterNavbar></FooterNavbar>
</template>
<script>
import FrontNavbar from './components/FrontNavbar.vue';
import FooterNavbar from './components/FooterNavbar.vue';

export default {
  components: {
    FrontNavbar,
    FooterNavbar,
  },
};
</script>

<style lang="scss">
@import "./assets/stylesheets/all";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  padding-bottom: 300px;
}
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  position: relative;
}
</style>
