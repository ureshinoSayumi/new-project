<template>
  <div class="container">
    <button @click="tst">asdad</button>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1>購物車</h1>
        <div class="mt-4">
          <!-- 購物車列表 -->
          <div class="text-end">
            <button class="btn btn-outline-danger" type="button"
              :disabled="this.productCarts.final_total === 0 ? true : false"
              @click="deleteAllCart()">
              清空購物車
            </button>
          </div>
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 150px">數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="true">
                <tr v-for="product in productCarts.carts" :key="product.id">
                  <td>
                    <button type="button" class="btn btn-outline-danger btn-sm"
                      @click="deleteCart(product.id)">
                      <i v-if="loading" class="fas fa-spinner fa-pulse"></i>
                      移除購物車
                    </button>
                  </td>
                  <td>
                    {{ product.product.title }}
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <div class="input-group mb-3">
                        <label for="qty" class="form-label"></label>
                        <input id="qty" min="1" type="number"
                          class="form-control" v-model="product.qty"
                          :disabled="loadInput === product.id"  @blur="editCart(product)">
                        <span class="input-group-text"
                          id="basic-addon2">
                          {{ product.product.unit }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    {{ product.product.origin_price }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ productCarts.total }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">{{ productCarts.final_total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="my-5 row justify-content-center">
      <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="orderPost()">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            v-model="user.email"
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
          >
          </Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field
            v-model="user.name"
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
          >
          </Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field
            v-model="user.telephone"
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8|max:10"
            >
          </Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            v-model="user.address"
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
          >
          </Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea v-model="user.message" id="message"
            class="form-control" cols="30" rows="10" ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger"
            :disabled="this.productCarts.final_total === 0 ? true : false"
            >送出訂單
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allProducts: [],
      loading: false,
      loadInput: null,
      user: {
        email: '',
        name: null,
        telephone: null,
        address: null,
        message: null,
      },
      productModal: null,
      // modal
      product: { title: 'ss' },
      // cart
      productCarts: {},
    };
  },
  methods: {
    getCart() {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((response) => {
          console.log(response, 'cart');
          this.productCarts = response.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    editCart(product) {
      this.loading = true;
      this.loadInput = product.id;
      const data = {
        data: {
          product_id: product.id,
          qty: product.qty,
        },
      };
      this.axios.put(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`, data)
        .then((response) => {
          this.loading = false;
          this.loadInput = null;
          console.log(response);
          alert('更新完成');
          this.getCart();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    deleteCart(productId) {
      this.loading = true;
      this.axios.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${productId}`)
        .then((response) => {
          this.loading = false;
          console.log(response);
          this.getCart();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    deleteAllCart() {
      this.axios.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`)
        .then((response) => {
          alert('刪除完成');
          console.log(response);
          this.getCart();
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
          this.getCart();
          console.log(response);
          alert('新增成功');
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    orderPost() {
      if (this.productCarts.carts.length === 0) {
        alert('購物車無商品');
        return;
      }
      const data = {
        data: {
          user: {
            name: this.user.name,
            email: this.user.email,
            tel: this.user.telephone,
            address: this.user.address,
          },
          message: this.user.message,
        },
      };
      this.loading = true;
      this.axios.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, data)
        .then(() => {
          this.productCarts = {};
          this.loading = false;
          this.user = {
            email: null,
            name: null,
            telephone: null,
            address: null,
            message: null,
          };
          alert('成功建立訂單');
          this.$refs.form.resetForm();
          this.getCart();
          this.getOrderData();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getOrderData() {
      this.axios.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`)
        .then((response) => {
          this.loading = false;
          console.log(response, 'getOrderData');
        })
        .catch(() => {
          this.loading = false;
        });
    },
    showProductModel(product) {
      this.product = product;
      this.productModal.show();
    },
    tst() {
      this.$refs.form.resetForm();
    },
  },
  mounted() {
    this.getCart();
    this.getOrderData();
  },
};
</script>

<style lang="scss">
</style>
