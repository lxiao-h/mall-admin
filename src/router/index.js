import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Index from '../views/page/index.vue';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import roleAdmin from '../utils/permission';

Vue.use(VueRouter);
const asyncRoutes = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品管理',
    role: 'all',
    icon: 'pie-chart',
    showBar: true,
  },
  component: Home,
  children: [{
    path: '/category',
    name: 'Category',
    meta: {
      title: '类别管理',
      role: 'admin',
      icon: 'info',
      showBar: true,
    },
    component: () => import('@/views/page/category.vue'),
  }, {
    path: '/productAdd',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      role: 'all',
      icon: 'plus',
      showBar: true,
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: '/productList',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      role: 'all',
      icon: 'ordered-list',
      showBar: true,
    },
    component: () => import('@/views/page/productList.vue'),
  }, {
    path: '/productEdit:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      role: 'all',
      icon: '324',
      showBar: false,
    },
    component: () => import('@/views/page/productAdd.vue'),
  }],
}];

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页',
    role: 'all',
    icon: 'fullscreen-exit',
    showBar: true,
  },
  component: Home,
  children: [{
    path: '/index',
    name: 'Index',
    meta: {
      title: '统计',
      role: 'all',
      icon: 'line-chart',
      showBar: true,
    },
    component: Index,
  }],
}, {
  path: '/login',
  name: 'Login',
  meta: {
    title: '登陆',
    role: 'all',
    icon: '',
    showBar: false,
  },
  component: Login,
}];

const router = new VueRouter({
  routes,
});
let isAdd = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const user = store.state.userData;
    if (user.username && user.appkey && user.email && user.role) {
      if (!isAdd) {
        const menuRoutes = roleAdmin(user.role, asyncRoutes);
        store.dispatch('asyncChangeMenuRoute', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAdd = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
