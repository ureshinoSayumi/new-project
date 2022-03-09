<template>
  <div class="container">
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
                  @click="pushRouter(product.id)">
                  <i v-if="loading" class="fas fa-spinner fa-pulse"></i>
                  產品細項
                </button>
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
    </div>
    <!-- page -->
    <PagesView :pages="pagination" @emit-pages="getProducts"></PagesView>
    <!-- modal -->
    <div class="modal" tabindex="-1" id="myModal" ref="myModal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img class="img-fluid" :src="product.imageUrl" alt="">
              </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                <div>
                  <div class="input-group">
                    <label for="number"></label>
                    <input name="number" type="number" class="form-control"
                      v-model.number="qty" min="1">
                    <button type="button" class="btn btn-primary"
                      @click="inputCart(product.id, qty)"
                    >
                      加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';
import PagesView from '../components/PagesView.vue';

export default {
  components: {
    PagesView,
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
      product: {},
      qty: 1,
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
    showProductModel(product) {
      this.product = product;
      console.log(this.product);
      this.productModal.show();
    },
    // modal
    hideModel() {
      this.productModal.hide();
      // this.deleteModal.hide();
    },
    pushRouter(id) {
      console.log(id);
      this.$router.push(`/product/${id}`);
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
