<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{ modaltitle }}</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">上傳圖片</label>
                <input ref="fileInput" type="file" class="form-control"
                  placeholder="上傳圖片" @input="fileReader">
              </div>
              <div class="mb-3">
                <button
                  v-if="!proploading"
                  class="btn btn-outline-primary btn-sm d-block w-100" @click="imgUpload">
                  上傳圖片
                </button>
                <div v-if="proploading" class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <img class="img-fluid" :src="file" alt="">
            </div>

            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control"
                  placeholder="請輸入圖片連結" v-model="productProp.imageUrl">
              </div>
              <img class="img-fluid" :src="productProp.imageUrl" alt="">
            </div>

            <h3 class="md-3">多圖新增</h3>
            <div>
              <div class="mb-1" v-for="(img, index) in productProp.imagesUrl" :key="index">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control"
                    placeholder="請輸入圖片連結" v-model="productProp.imagesUrl[index]">
                </div>
                <img class="img-fluid" :src="product.imagesUrl[index]" alt="">
              </div>
            </div>

            <div v-if="product.imagesUrl[productProp.imagesUrl.length -1] ||
              productProp.imagesUrl == 0">
              <button
                class="btn btn-outline-primary btn-sm d-block w-100" @click="addImg">
                新增圖片
              </button>
            </div>
            <div v-else>
              <button class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImg">
                刪除圖片
              </button>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input id="title" type="text" class="form-control"
                placeholder="請輸入標題" v-model="productProp.title">
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control"
                  placeholder="請輸入分類" v-model="productProp.category">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control"
                  placeholder="請輸入單位" v-model="productProp.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control"
                  placeholder="請輸入原價" v-model.number="productProp.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control"
                  placeholder="請輸入售價" v-model.number="productProp.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control"
                placeholder="請輸入產品描述" v-model="productProp.description">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control"
                placeholder="請輸入說明內容" v-model="productProp.content">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                  :true-value="1" :false-value="0" v-model="productProp.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" @click="hideModel()">
          取消
        </button>
        <template v-if="isediting">
          <button v-if="!loading" type="button" class="btn btn-primary"
            @click="editProduct(productProp)">
          編輯
        </button>
        <div v-if="loading" class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        </template>
        <template v-else>
          <button v-if="!loading" type="button" class="btn btn-primary"
            @click="uploadProduct(productProp)">
            建立
          </button>
          <div v-if="loading" class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-modal',
  props: ['modaltitle', 'product', 'loading', 'isediting'],
  emits: ['hide-model', 'edit-product', 'upload-product'],
  data() {
    return {
      file: 'modal',
      productProp: this.product,
      proploading: false,
    };
  },
  methods: {
    // emit
    uploadProduct(productProp) {
      this.$emit('upload-product', productProp);
    },
    editProduct(productProp) {
      this.$emit('edit-product', productProp);
    },
    hideModel() {
      this.$refs.fileInput.value = null;
      this.file = null;
      console.log(this.$refs.fileInput.outerHTML);
      this.$emit('hide-model');
    },
    addImg() {
      this.productProp.imagesUrl.push('');
    },
    deleteImg() {
      this.productProp.imagesUrl.pop();
    },
    fileReader() {
      // 解析上傳的檔案，讓 <img> 能即時顯示上傳的圖片
      // console.log(this.$refs.fileInput.files[0].type)
      if (this.$refs.fileInput.files[0].type !== 'image/jpeg' && this.$refs.fileInput.files[0].type !== 'image/png') {
        alert('僅支援 jpg、png 檔，請重新上傳！');
        return;
      }
      this.file = null;
      const reader = new FileReader();
      reader.readAsDataURL(this.$refs.fileInput.files[0]);
      reader.onload = (e) => {
        this.file = e.target.result;
      };
    },
    imgUpload() {
      if (!this.file) return;
      this.proploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', this.$refs.fileInput.files[0]);
      this.axios.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`, formData)
        .then((response) => {
          this.$refs.fileInput.value = null;
          this.file = null;
          if (this.productProp.imageUrl) {
            // 多圖上傳這欄位如果沒值，會回傳一個有一個 '' 的陣列，如果直接 push 會出現一個空值。
            if (this.productProp.imagesUrl[0]) {
              this.productProp.imagesUrl.push(response.data.imageUrl);
            } else {
              this.productProp.imagesUrl[0] = response.data.imageUrl;
            }
          } else {
            this.productProp.imageUrl = response.data.imageUrl;
          }
          console.log(this.$refs.fileInput.files[0]);
          this.proploading = false;
          alert('上傳成功');
        })
        .catch(() => {
          alert('上傳失敗');
        });
    },
  },
  watch: {
    'product.title': function () {
      console.log(this.productProp, this.product);
      this.productProp = this.product;
    },
  },
  mounted() {
    this.productProp = this.product;
    console.log('子元建');
  },
};
</script>

<style scoped lang="scss">
</style>
