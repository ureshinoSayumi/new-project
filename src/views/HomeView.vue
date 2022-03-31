<template>
  <div class="home">
    <h1>Home</h1>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button"
      id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown button
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
  </div>
    <div ref="myCarousel" id="carouselExampleControls"
      class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://upload.cc/i1/2020/11/04/UcpCRJ.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://upload.cc/i1/2020/11/04/QqAMGV.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://upload.cc/i1/2020/11/04/4PTuCq.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button"
        data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button"
        data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 分隔線 -->
    <div class="d-flex justify-content-center mt-5">
      <div class="border border-top w-100"></div>
    </div>
    <!-- bg-dark -->
    <div class="container mt-5 text-center">
      <h2>熱銷商品</h2>
      <h5 class="mt-3">下班休憩好家具，滿足任何型態、任何地點的需求，找到最放鬆的方式，享受舒適的坐臥</h5>
      <!-- <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> -->
      <!-- product/-MykiaU5YduTW28ioGhz -->
      <div class="row justify-content-xl-start justify-content-sm-center mt-3">
        <div class="col-lg-4" v-for="(product, index) in products" :key="index">
          <router-link class="card" :to="`/product/${product.id}`">
            <div class="card-img"
              :style="{backgroundImage: `url(${product.imageUrl})`}">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
            </div>
          </router-link>
          <!-- <div class="card">
            <a href="#" class="text-white ms-3"></a>
            <div class="card-img"
              :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="container-fluid bg-secondary mt-5 text-center d-flex center">
      <h2>優惠卷:</h2>
      <h3 class="pt-1 pr-2">IGIWHFPGEQIDH</h3>
    </div>
    <!-- 分隔線 -->
    <div class="d-flex justify-content-center mt-5">
      <div class="border border-top w-100"></div>
    </div>
    <div class="container mt-5 text-center">
      <h2>北歐風三大重點</h2>
      <div class="row justify-content-xl-start justify-content-sm-center mt-5">
        <div class="col-lg-8">
          <img class="w-100" src="https://decomyplace.com/img/blog/170424_nordic_4.jpg" alt="">
        </div>
        <div class="col-lg-4 align-self-center">
          <h3 class="pb-5">寬敞明亮高採光｜放大居家視野</h3>
          <p class="explanation-text">北歐風格對於採光有高度的要求，所以在設計中， 除了善用留白空間，大量運用採光也是一大設計重點。
            運用大片的落地窗納入陽光，營造舒適環境氛圍；高採光空間使之寬敞明亮，
            帶來清爽、乾淨的舒適空間與無壓力的自在感。
          </p>
        </div>
      </div>
      <div class="row justify-content-xl-start justify-content-sm-center mt-3">
        <div class="col-lg-4 align-self-center">
          <h3 class="pb-5">木質傢俱最自然｜如沐春風生活</h3>
          <p class="explanation-text">北歐人熱愛大自然，而這一點也充分運用到生活設計中。
            北歐風格中往往會用到大量的木質裝潢，並適度搭配綠植栽， 使居家空間營建出自然、舒服的氣氛。
            而木頭材質給人溫馨、溫暖的感覺， 並適時的運用地毯、布沙發與抱枕等豐富的軟裝，營造北歐風格氛圍，
            讓你生活在無束縛感的空間。
          </p>
        </div>
        <div class="col-lg-8">
          <img class="w-100" src="https://decomyplace.com/img/blog/170424_nordic_3.jpg" alt="">
        </div>
      </div>
      <div class="row justify-content-xl-start justify-content-sm-center mt-3">
        <div class="col-lg-8">
          <img class="w-100" src="https://decomyplace.com/img/blog/170424_nordic_7.jpg" alt="">
        </div>
        <div class="col-lg-4 align-self-center">
          <h3 class="pb-5">提升空間通透感｜溫暖簡潔設計</h3>
          <p class="explanation-text">北歐風格另一個特點就是營造溫暖、活潑的空間，採用簡潔、開放式格局，
            善用充足的採光來提升空間通透感。在設計方面，適切的留白並使用跳色牆面，
            或是使用大地色、文化石牆面，使得空間視野變大。
          </p>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-secondary mt-5 text-center center">
      <div class="align-self-center">
        <h2>或許您會喜歡</h2>
      </div>
    </div>
  </div>
</template>

<script>
// import Carousel from 'bootstrap/js/dist/carousel';

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      loading: true,
      myCarousel: null,
      data: 'data',
    };
  },
  methods: {
    getProducts() {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.products = [];
          for (let i = 0; i < 3; i += 1) {
            // const randomNums = Math.floor(Math.random() * response.data.products.length);
            // response.data.products[randomNums]
            this.products.push(response.data.products[i]);
          }
          console.log(response, 'getProducts');
          // this.products.push(response.data.products[5]);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, 'getProducts');
        });
    },
    test() {
      console.log(this.data, 'test');
    },
  },
  mounted() {
    // this.getProducts();
    // this.myCarousel = new Carousel(this.$refs.myCarousel);
  },
};
</script>
<style lang="scss" scoped>
.card {
  text-decoration:none;
  color: #212529;
}
.card-img :hover {
  transform:scale(1.1,1.1);
}
.card-title :hover {
  transform:scale(0,0);
}
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
.card-img {
  height: 250px;
  background-size: cover;
  background-position: center;
}
.explanation-text {
  line-height: 34px;
  letter-spacing: 1px;
}
.center {
  height: 100px;
}
// img {
//   max-width: 100%;
//   height: auto;
// }
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
