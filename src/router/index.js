import { createRouter, createWebHistory } from "vue-router";
import IdentitasView from "../views/IdentitasView.vue";
import RawatInapView from "../views/RawatInapView.vue";
import LoginView from "@/views/LoginView.vue";
import NoRegistrasiView from "@/views/NoRegistrasiView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/identitas",
      name: "identitas",
      component: IdentitasView,
      meta: { requiresAuth: true },
    },
    {
      path: "/rawat-inap",
      name: "rawat-inap",
      component: RawatInapView,
      meta: { requiresAuth: true },
    },
    {
      path: "/noRegistrasi",
      name: "noRegistrasi",
      component: NoRegistrasiView,
      meta: { requiresAuth: true },
    },
    {
      path: "/",
      redirect: "/login",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next({ name: "login" });
  } else if (to.name === "login" && token) {
    next({ name: "noRegistrasi" });
  } else {
    next();
  }
});

export default router;
