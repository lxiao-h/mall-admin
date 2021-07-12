import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Index from '@/views/page/index.vue';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import roleAdmin from '../utils/permission';

const asyncRoutes = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品管理',
    role: 'all',
  },
  component: 'Home',
  children: [{
    path: '/category',
    name: 'Category',
    meta: {
      title: '类别管理',
      role: 'admin',
    },
    component: () => import('@/views/page/category.vue'),
  }, {
    path: '/productAdd',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      role: 'all',

    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: '/productList',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      role: 'all',

    },
    component: () => import('@/views/page/productList.vue'),
  }],
}];

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
    role: 'all',
  },
  component: Home,
  children: [{
    path: '/',
    name: 'Index',
    meta: {
      title: '统计',
      role: 'all',
    },
    component: Index,
  }],
}, {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登陆',
    role: 'all',
  },
  component: Login,
}];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  let isAdd = false;
  if (to.path !== '/login') {
    const user = store.state.userData;
    if (user.username && user.appkey && user.email && user.role) {
      if (!isAdd) {
        const menuRoutes = roleAdmin(user.role, asyncRoutes);
        router.addRoute(menuRoutes);
        isAdd = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
