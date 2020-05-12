<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  created() {
    this.$Http
      .get({
        url: "/user/getUserInfo",
      })
      .then((res) => {
        this.$store.dispatch({
          type: "changeUserInfo",
          data: res.data,
        });
        res.data.compStatus === 0 &&
          this.$router.replace("/compeleteCompanyInfo");
      })
      .catch(() => {
        this.$store.dispatch({
          type: "deleteUserInfo",
        });
        this.$router.push("/404");
      });
  },
  watch: {
    $route: {
      handler(route) {
        const userInfo = this.$store.state.userInfo;
        switch (userInfo.registered) {
          case 0:
            /^\/(process|transport|sale|admin)\/*/.test(route.path) &&
              this.$router.replace("/404");
            break;
          case 1:
            /^\/(product|transport|sale|admin)\/*/.test(route.path) &&
              this.$router.replace("/404");
            break;
          case 2:
            /^\/(product|process|sale|admin)\/*/.test(route.path) &&
              this.$router.replace("/404");
            break;
          case 3:
            /^\/(product|process|transport|admin)\/*/.test(route.path) &&
              this.$router.replace("/404");
            break;
        }
        if (userInfo.compStatus === 0) {
          /^\/(product|transport|transport|sale)\/*/.test(route.path) &&
            this.$router.replace("/compeleteCompanyInfo");
        }
      },
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("./assets/bg.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
