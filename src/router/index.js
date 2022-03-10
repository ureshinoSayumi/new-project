import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/about-products',
    name: 'about-products',
    component: () => import('../views/backEnd/ProductsView.vue'),
  },
  {
    path: '/about-order',
    name: 'about-order',
    component: () => import('../views/backEnd/OrderView.vue'),
  },
  {
    path: '/about-coupon',
    name: 'about-coupon',
    component: () => import('../views/backEnd/CouponView.vue'),
  },
  // {
  //   path: '/admin',
  //   component: () => import('../views/Dashboard.vue'),
  //   children: [
  //     {
  //       path: 'products',
  //       component: () => import('../views/Dashboard/Products.vue'),
  //     },
  //     {
  //       path: 'orders',
  //       component: () => import('../views/Dashboard/Orders.vue'),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
