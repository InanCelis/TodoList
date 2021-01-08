import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueRouter);
Vue.use(VueSweetalert2);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
        title: 'About'
    }
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: {
        title: 'Project'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - TodoList'
    next()
});

export default router
