import Vue from "vue";
import Router from "vue-router";
import Home from "./layouts/home";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login")
    },
    {
      path: "/article",
      name: "article",
      component: Home,
      children: [
        {
          path: "/",
          name: "article-list",
          component: () => import("@/views/articles")
        },
        {
          path: ":id",
          name: "article-detail",
          component: () => import("@/views/articles/id"),
          props: route => ({
            id: route.params.id
          })
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
