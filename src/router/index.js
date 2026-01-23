import { createRouter, createWebHistory } from "vue-router";
import IdentitasView from "../views/IdentitasView.vue";
import Identitas2View from "@/views/Identitas2View.vue";
import RawatInapView from "../views/RawatInapView.vue";
import LoginView from "@/views/LoginView.vue";
import NoRegistrasiView from "@/views/NoRegistrasiView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/identitas",
      name: "identitas",
      component: IdentitasView,
    },
    {
      path: "/identitas2",
      name: "identitas2",
      component: Identitas2View,
    },
    {
      path: "/rawat-inap",
      name: "rawat-inap",
      component: RawatInapView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/noRegistrasi",
      name: "noRegistrasi",
      component: NoRegistrasiView,
    },
    {
      path: "/",
      redirect: "/login",
    },
  ],
});

export default router;
