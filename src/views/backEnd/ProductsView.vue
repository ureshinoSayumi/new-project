<template>
  <div class="container">
    <button type="button" @click="showProductModel">後台產品列表</button>
    <PagesView :pages="pagination" @emit-pages="getProducts"></PagesView>
    <div class="mt-4">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in allProducts" :key="index">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${product.imageUrl})`}"></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <!-- <div class="h5">{{  }} 元</div> -->
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                  @click="showProductModel(product)">
                  <i v-if="loading" class="fas fa-spinner fa-pulse"></i>
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                  @click="inputCart(product.id)">
                  <i v-if="loading" class="fas fa-spinner fa-pulse"></i>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button"
          @click="deleteAllCart()">
          清空購物車
        </button>
      </div>
    </div>
    <!-- modal -->
    <!-- <div id="myModal" ref="myModal"
      class="modal fade" tabindex="-1" aria-labelledby="productModalLabel">
      <div style="background: black; height: 100px">
        ss
      </div>
      <h1>ss</h1>
    </div> -->
    <div class="modal" tabindex="-1" id="myModal" ref="myModal">
      <ModalView
        :product="product"
        :loading="loading"
        @hide-model="hideModel"
        @delete-product="deleteProduct"
        @upload-product="uploadProduct"
      ></ModalView>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import PagesView from '../../components/PagesView.vue';
import ModalView from '../../components/ModalView.vue';

export default {
  components: {
    PagesView,
    ModalView,
  },
  data() {
    return {
      // table
      products: null,
      pagination: {
        total_pages: '3',
        has_pre: '1',
      },
      allProducts: [],
      loading: false,
      loadInput: null,
      // modal
      productModal: null,
      product: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    getAllProducts() {
      this.loading = true;
      console.log(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`);
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.allProducts = response.data.products;
          console.log(this.allProducts, 'asd');
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getProducts(page = 1) {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then((response) => {
          console.log(response, 'getProducts');
          this.allProducts = response.data.products;
          this.pagination = response.data.pagination;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, 'getProducts');
        });
    },
    deleteAllCart() {
      this.axios.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`)
        .then((response) => {
          alert('刪除完成');
          console.log(response);
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    },
    inputCart(productId, qtys = 1) {
      console.log('asd');
      this.loading = true;
      const data = {
        data: {
          product_id: productId,
          qty: qtys,
        },
      };
      this.axios.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`, data)
        .then((response) => {
          this.loading = false;
          // this.productModal.hide();
          console.log(response);
          alert('新增成功');
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    showProductModel() {
      // this.product = product;
      this.productModal.show();
    },
    // modal
    hideModel() {
      this.productModal.hide();
      // this.deleteModal.hide();
    },
    deleteProduct() {
      this.loading = true;
      const url = 'https://vue3-course-api.hexschool.io/v2';
      this.axios.delete(`${url}/api/ciye-project/admin/product/${this.product.id}`)
        .then(() => {
          this.hideModel();
          this.getProducts();
        })
        .catch(() => {
        });
    },
    uploadProduct() {
      this.loading = true;
      const url = 'https://vue3-course-api.hexschool.io/v2';
      // console.log(this.product, 'this.product')
      // post 資料如果傳送沒有值的陣列，取回來的資料就就不會有"imagesUrl"這個屬性，造成編譯錯誤
      if (this.product.imagesUrl.length === 0) {
        this.product.imagesUrl = [''];
      }
      const postProduct = {
        data: this.product,
      };
      this.axios.post(`${url}/api/ciye-project/admin/product`, postProduct)
        .then((response) => {
          this.loading = false;
          console.log(response, 'response');
          this.hideModel();
          this.getProducts();
        })
        .catch((err) => {
          alert('上傳失敗');
          console.log(err, 'err');
          this.hideModel();
          this.loading = false;
        });
    },
  },
  mounted() {
    console.log(this.$refs.myModal, 'this.$refs.myModal');
    this.productModal = new Modal(this.$refs.myModal);
    this.getProducts();
  },
};
</script>

<style lang="scss">
</style>
