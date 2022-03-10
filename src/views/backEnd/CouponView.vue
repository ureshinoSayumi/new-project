<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-toggle="modal"
        @click="showModal()" >建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <!-- CSS直接套用bs 但如果想自訂 也可直接修改 -->
          <th width="130">名稱</th>
          <th width="100">代碼</th>
          <th width="150">到期日</th>
          <th width="100">折扣百分比</th>
          <th width="120">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <!--  v-for="(item) in coupons" :key="item.id" -->
        <tr v-for="(item) in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>
            {{ item.due_date }}
          </td>
          <td>
            {{ item.percent}}
          </td>
          <td>
            <!-- 產品如果為啟用 is_enabled == 1 -->
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="showModal(item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm"
              @click="showDeleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PagesView :pages="pagination" @emit-pages="getCoupons"></PagesView>
    <!-- modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="couponModal"
    >
      <CouponModal
        :loading="loading"
        :coupon="coupon"
        :isedit="isEdit"
        @create-coupon="createCoupon"
        @edit-coupon="editCoupon"
      ></CouponModal>
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
            <strong v-if="this.coupon" class="text-danger">
              {{ this.coupon.title }}
            </strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button v-if="!loading" type="button" class="btn btn-outline-secondary"
              @click="hideModal">
              取消
            </button>
            <button v-if="!loading" type="button" class="btn btn-danger"
              @click="deletecoupon()">
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
import CouponModal from '../../components/CouponView.vue';

export default {
  components: {
    PagesView,
    CouponModal,
  },
  data() {
    return {
      // table
      loading: false,
      isEdit: false,
      data: 'data',
      coupons: null,
      coupon: null,
      couponModal: null,
      deleteModal: null,
      products: [], // 取得所有產品資料
      pagination: {}, // 分頁
    };
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.axios.get(url)
        .then((response) => {
          console.log(response, 'getCoupons');
          this.coupons = response.data.coupons;
          this.pagination = response.data.pagination;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    },
    createCoupon(item) {
      const data = {
        data: item,
      };
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      this.axios.post(url, data)
        .then((response) => {
          console.log(response, 'createCoupon');
          this.getCoupons();
          this.couponModal.hide();
          alert('新增完成');
        })
        .catch((err) => {
          alert('上傳失敗');
          console.log(err, 'err');
        });
    },
    editCoupon(item) {
      const data = {
        data: item,
      };
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
      this.axios.put(url, data)
        .then((response) => {
          console.log(response, 'editCoupon');
          this.getCoupons();
          this.couponModal.hide();
          alert('編輯完成');
        })
        .catch((err) => {
          alert('編輯失敗');
          console.log(err, 'err');
        });
    },
    showModal(clickCoupon) {
      if (clickCoupon) {
        this.isEdit = true;
        this.coupon = JSON.parse(JSON.stringify(clickCoupon));
      } else {
        this.isEdit = false;
        this.coupon = {};
      }
      this.couponModal.show();
    },
    showDeleteModal(clickCoupon) {
      this.coupon = clickCoupon;
      this.deleteModal.show();
    },
    hideModal() {
      this.deleteModal.hide();
    },
    deletecoupon() {
      this.loading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.coupon.id}`;
      console.log(url);
      this.axios.delete(url)
        .then((response) => {
          console.log(response, 'delete');
          alert('成功刪除');
          this.hideModal();
          this.getCoupons();
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
        .then((response) => {
          console.log(response);
          this.getCoupons();
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
  },
  mounted() {
    this.signinCheck();
    this.deleteModal = new Modal(this.$refs.delModal);
    this.couponModal = new Modal(this.$refs.couponModal);
    console.log(this.data);
  },
};
</script>

<style lang="scss">
</style>
