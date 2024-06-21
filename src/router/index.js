import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';
import SelectGrid from '../components/SelectGrid.vue';
import Feedback from '../components/Feedback.vue';
import FeedbackHistory from '../components/FeedbackHistory.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home},
  { path: '/selectGrid', component: SelectGrid },
  { path: '/feedback', component: Feedback },
  { path: '/feedbackHistory', component: FeedbackHistory }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if ((to.path !== '/home' && to.path !== '/selectGrid' && to.path !== '/feedback' && to.path !== '/feedbackHistory' ) && Cookies.get('username') !== undefined){
    next('/home');
  } else if (to.path === '/feedback' && from.path !== '/selectGrid'){
    next('/selectGrid');
    ElMessage.error('Please select address first');
  } else if (to.path !== '/login' && to.path !== '/register' && Cookies.get('username') === undefined) {
    next('/login');
    ElMessage.error('Please login first');
  } else {
    next();
  }
});

export default router;
