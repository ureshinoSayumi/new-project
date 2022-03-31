import { createApp } from 'vue';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/scss/bootstrap.scss';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import store from './store';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');
// 導航守衛
router.beforeEach((to, from, next) => {
  console.log(to.meta.requiresAuth);
  if (to.meta.requiresAuth) {
    if (store.state.isLogged) {
      console.log(store.state.isLogged, 'store已有驗證');
      next();
    } else {
      console.log(store.state.isLogged, 'store無驗證');
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      axios.post(`${process.env.VUE_APP_API}/api/user/check`)
        .then((res) => {
          console.log(res, '驗證登入');
          store.commit('updateAuth', true);
          next();
        })
        .catch(() => {
          next('/login');
          alert('沒有權限，請先登入');
        });
    }
  } else {
    next();
  }
});
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .component('Form', Form)
  .component('Field', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');
