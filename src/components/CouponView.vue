<template>
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>優惠卷</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row justify-content-center">
          <div class="col-sm-8">
            <div class="form-group mb-3">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                v-model="propsCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-row">
              <div class="form-group mb-3">
                <label for="due_date">日期</label>
                <input type="date" class="form-control" id="due_date"
                  v-model="due_date"
                  placeholder="請輸入日期">
              </div>
              <div class="form-group mb-3">
                <label for="price">代碼</label>
                <input type="unit" class="form-control" id="unit"
                  v-model="propsCoupon.code"
                  placeholder="請輸入代碼">
              </div>
            </div>
              <div class="form-row">
                <div class="form-group mb-5">
                <label for="origin_price">折抵百分比</label>
                  <input type="number" class="form-control" id="origin_price"
                    v-model="propsCoupon.percent"
                    placeholder="請輸入折抵百分比">
                </div>
              </div>
              <hr>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  v-model="propsCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button v-if="!loading" type="button" class="btn btn-outline-secondary"
          data-bs-dismiss="modal">取消</button>
        <button v-if="!isedit && !loading" type="button" class="btn btn-primary"
          @click="createCoupon()">確認新增</button>
        <button v-if="isedit && !loading" type="button" class="btn btn-primary"
          @click="editCoupon()">確認編輯</button>
        <div v-if="loading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    coupon: {
      type: Object,
      default() { return {}; },
    },
    isedit: {
      type: Boolean,
      default() { return false; },
    },
    loading: {
      type: Boolean,
      default() { return false; },
    },
  },
  data() {
    return {
      propsCoupon: {},
      due_date: null,
    };
  },
  emits: ['create-coupon', 'isedit', 'edit-coupon'],
  methods: {
    createCoupon() {
      this.propsCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
      if (!this.propsCoupon.is_enabled) {
        this.propsCoupon.is_enabled = 0;
      }
      this.$emit('create-coupon', this.propsCoupon);
    },
    editCoupon() {
      this.$emit('edit-coupon', this.propsCoupon);
    },
  },
  watch: {
    coupon() {
      this.propsCoupon = this.coupon;
      const date = new Date(this.coupon.due_date * 1000);
      const year = date.getFullYear();
      let month = date.getMonth() + 1; // 從0開始算一月的，所以要加一才會是正確的月份
      let day = date.getDate();
      // 如果是個位數就在前加 0
      month = month.toString().length === 1 ? `0${month.toString()}` : month;
      day = day.toString().length === 1 ? `0${day.toString()}` : day;
      this.due_date = `${year}-${month}-${day}`;
    },
  },
  mounted() {
  },
};
</script>
