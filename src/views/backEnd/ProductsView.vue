<template>
  <div class="container">
    <div class="container">
      <div class="text-end mt-4">
        <button class="btn btn-primary" @click="showProductModel">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.category }}</td>
            <td>{{ product.title }}</td>
            <td class="text-end">{{ product.origin_price }}</td>
            <td class="text-end">{{ product.price }}</td>
            <td>
              <span v-if="product.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                  @click="showProductModel(product)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="showDeleteModal(product)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PagesView :pages="pagination" @emit-pages="getProducts"></PagesView>
    <!-- modal -->
    <div class="modal" tabindex="-1" id="myModal" ref="myModal">
      <ModalView
        :modaltitle="modalTitle"
        :product="product"
        :loading="loading"
        :isediting="isEditing"
        @hide-model="hideModel"
        @edit-product="editProduct"
        @upload-product="uploadProduct"
      ></ModalView>
    </div>
    <!-- 刪除產品 Modal -->
    <div id="delProductModal" ref="delModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" aria-label="Close"
              @click="hideModal"></button>
          </div>
          <div class="modal-body">
            是否刪除 {{ this.product.title }}
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="hideModal">
              取消
            </button>
            <button v-if="!loading" type="button" class="btn btn-danger"
              @click="deleteProduct(this.product)">
              確認刪除
            </button>
            <div v-if="loading" class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
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
      loading: false,
      loadInput: null,
      // modal
      modalTitle: null,
      isEditing: false,
      productModal: null,
      deleteModal: null,
      product: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((response) => {
          console.log(response, 'getProducts');
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, 'getProducts');
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
          console.log(response);
          alert('新增成功');
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    showProductModel(product) {
      if (product.title) {
        this.modalTitle = '編輯產品';
        this.isEditing = true;
        this.product = JSON.parse(JSON.stringify(product));
        console.log(this.product, 'this.product');
      } else {
        this.modalTitle = '新增產品';
        this.isEditing = false;
        this.product = {
          imagesUrl: [],
        };
      }
      this.productModal.show();
    },
    showDeleteModal(product) {
      this.deleteModal.show();
      this.product = JSON.parse(JSON.stringify(product));
    },
    // modal
    hideModel() {
      this.productModal.hide();
      console.log('hide');
      this.deleteModal.hide();
    },
    deleteProduct() {
      this.loading = true;
      this.axios.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`)
        .then(() => {
          alert('成功刪除');
          this.hideModel();
          this.getProducts();
        })
        .catch(() => {
        });
    },
    uploadProduct(data) {
      this.product = data;
      this.loading = true;
      // console.log(this.product, 'this.product')
      // post 資料如果傳送沒有值的陣列，取回來的資料就就不會有"imagesUrl"這個屬性，造成編譯錯誤
      if (this.product.imagesUrl.length === 0) {
        this.product.imagesUrl = [''];
      }
      const postProduct = {
        data: this.product,
      };
      console.log(postProduct, data, 'postProduct');
      this.axios.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`, postProduct)
        .then((response) => {
          this.loading = false;
          console.log(response, 'response');
          this.hideModel();
          this.getProducts();
        })
        .catch((err) => {
          alert('上傳失敗');
          console.log(err, 'err');
          this.loading = false;
        });
    },
    editProduct(data) {
      this.product = data;
      this.loading = true;
      const postProduct = {
        data: this.product,
      };
      this.axios.put(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`, postProduct)
        .then((response) => {
          console.log(response, 'edit');
          this.hideModel();
          this.getProducts();
        })
        .catch(() => {
        });
    },
    signinCheck() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.loading = true;
      this.axios.post(` ${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.getProducts();
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    // console.log(this.$refs.myModal, 'this.$refs.myModal');
    this.signinCheck();
    this.productModal = new Modal(this.$refs.myModal);
    this.deleteModal = new Modal(this.$refs.delModal);
    this.getProducts();
  },
};
</script>

<style lang="scss">
</style>
