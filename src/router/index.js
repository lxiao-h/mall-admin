import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
}, {
  path: '/login',
  name: 'Login',
  component: Login,
}];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    const user = store.state.userData;
    console.log(user);
    console.log(user.username);
    console.log(user.email);
    console.log(user.role);
    console.log(user.appkey);

    if (user.username && user.appkey && user.email && user.role) {
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
