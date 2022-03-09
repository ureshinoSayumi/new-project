<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  mounted() {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH);
  },
};
</script>
<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// html {
//   height: 100%;
// }
// body {
//   margin: 0;
//   padding: 0;
//   min-height: 100%;
//   position: relative;
// }
</style>
