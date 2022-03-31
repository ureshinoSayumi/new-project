<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal text-center">
        請先登入
      </h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="username"
              placeholder="name@example.com" required v-model="user.username">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password"
              placeholder="Password" required v-model="user.password">
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit"
          @click.prevent="signin()">
            登入
          </button>
          <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">
      &copy; 2021~∞ - 六角學院
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 'data',
      user: {
        username: '',
        password: '',
      },
      loading: false,
      baseUrl: 'https://vue3-course-api.hexschool.io',
    };
  },
  methods: {
    signin() {
      if (!this.user.username && !this.user.password) return;
      this.loading = true;
      const url = 'https://vue3-course-api.hexschool.io/v2';
      this.axios.post(`${url}/admin/signin`, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          console.log('登入成功');
          this.$store.commit('updateAuth', true);
          this.$router.push('/');
          // window.location = 'products.html';
          this.loading = false;
        })
        .catch(() => {
          alert('登入失敗');
          this.user = {
            username: '',
            password: '',
          };
          this.loading = false;
        });
    },
  },
  mounted() {
    // this.signin();
  },
};
</script>
<style scoped>
.skip-forward-format{
  width:50px;
  height:50px;
  color:blue;
}
</style>
