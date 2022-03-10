<template>
  <div class="container">
    <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.orders" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }} 單價 {{ product.product.price }}
                </li>
              </ul>
            </td>
            <td>
              {{item.total  }}
            </td>
            <td>
              <!-- 產品如果付款完成  -->
              <span v-if="item.is_paid" class="text-success">付款完成</span>
              <span v-else>尚未付款</span>
            </td>
            <td>
              <button class="btn btn-outline-primary btn-sm"
              @click="showOrderModel(item)">詳細</button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="showDeleteModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PagesView :pages="pagination" @emit-pages="getOrders"></PagesView>
    <!-- 細項 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="orderModal"
    >
      <OrderModal
        :loading="loading"
        :order="order"
        @update-order="updateOrder"
      ></OrderModal>
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
            是否刪除
            <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button v-if="!loading" type="button" class="btn btn-outline-secondary"
              @click="hideModal">
              取消
            </button>
            <button v-if="!loading" type="button" class="btn btn-danger"
              @click="deleteProduct(this.order)">
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
import OrderModal from '../../components/OrderView.vue';

export default {
  components: {
    PagesView,
    OrderModal,
  },
  data() {
    return {
      // table
      orders: null,
      order: {},
      pagination: {},
      loading: false,
      loadInput: null,
      // modal
      modalTitle: null,
      isEditing: false,
      orderModal: null,
      deleteModal: null,
      product: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    getOrders(page = 1) {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then((response) => {
          // pagination
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
          console.log(response.data, 'getOrders');
          this.loading = false;
        })
        .catch((error) => {
          console.log(error, 'getOrders');
        });
    },
    showOrderModel(clickOrder) {
      console.log(clickOrder, 'cli');
      this.order = clickOrder;
      this.orderModal.show();
    },
    updateOrder(order) {
      const data = {
        data: {
          is_paid: order.is_paid,
        },
      };
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      this.axios.put(url, data)
        .then((response) => {
          console.log(response, 'updateOrder');
          this.orderModal.hide();
          this.getOrders();
          alert('更改完成');
        })
        .catch((error) => {
          console.log(error, 'getOrders');
        });
    },
    showDeleteModal(clickOrder) {
      this.deleteModal.show();
      this.order = clickOrder;
    },
    // modal
    hideModal() {
      console.log('hide');
      this.deleteModal.hide();
    },
    deleteProduct(order) {
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      console.log(url);
      this.axios.delete(url)
        .then((response) => {
          console.log(response, 'delete');
          alert('成功刪除');
          this.hideModal();
          this.getOrders();
        })
        .catch((error) => {
          console.log(error, 'daltet');
        });
    },
    signinCheck() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = token;
      this.loading = true;
      this.axios.post(` ${process.env.VUE_APP_API}/api/user/check`)
        .then(() => {
          this.getOrders();
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.signinCheck();
    this.deleteModal = new Modal(this.$refs.delModal);
    this.orderModal = new Modal(this.$refs.orderModal);
  },
};
</script>

<style lang="scss">
</style>
