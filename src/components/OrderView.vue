<template>
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>訂單細節</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <h3>用戶資料</h3>
            <table class="table">
              <tbody v-if="propsOrder.user">
                <tr>
                  <th style="width: 100px">姓名</th>
                  <td>{{ propsOrder.user.name }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ propsOrder.user.email }}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{ propsOrder.user.tel }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{ propsOrder.user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-8">
            <h3>訂單細節</h3>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 100px">訂單編號</th>
                  <td>{{ propsOrder.id }}</td>
                </tr>
                <tr>
                  <th>下單時間</th>
                  <td>{{ new Date(propsOrder.create_at * 1000).toLocaleDateString() }}</td>
                </tr>
                <tr>
                  <th>付款時間</th>
                  <td>
                    <span v-if="propsOrder.paid_date">
                      {{ propsOrder.paid_date }}
                    </span>
                    <span v-else>時間不正確</span>
                  </td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <strong v-if="propsOrder.is_paid" class="text-success"
                      >已付款</strong
                    >
                    <span v-else class="text-muted">尚未付款</span>
                  </td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td>
                    {{ propsOrder.total }}
                  </td>
                </tr>
              </tbody>
            </table>
            <h3>選購商品</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>數量/單位</th>
                  <th class="text-end">總價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in propsOrder.products" :key="item.id">
                  <th>
                    {{ item.product.title }}
                  </th>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="text-end">
                    {{ item.final_total }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  v-model="propsOrder.is_paid"
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  <span v-if="propsOrder.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="updateOrder(propsOrder)"
        >
          修改付款狀態
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      propsOrder: {},
      isPaid: false,
    };
  },
  emits: ['update-order'],
  methods: {
    updateOrder(item) {
      this.$emit('update-order', item);
    },
  },
  watch: {
    order() {
      this.propsOrder = this.order;
      console.log(this.propsOrder, '原建');
    },
  },
  mounted() {
    console.log(this.propsOrder, 'this.order');
  },
};
</script>
