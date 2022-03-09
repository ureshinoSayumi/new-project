<template>
  <div>
    <h1>產品細節</h1>
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
</template>

<script>

export default {
  // components: {
  //   PagesView,
  // },
  data() {
    return {
      product: {},
      name: null,
      qty: 1,
    };
  },
  methods: {
    inputCart(productId, qtys = 1) {
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
    gatProductData() {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.$route.params.id}`)
        .then((response) => {
          console.log(response, 'get');
          this.product = response.data.product;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.gatProductData();
    this.name = this.$route.params;
  },
};
</script>

<style lang="scss">
</style>
