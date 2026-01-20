import { createRouter, createWebHistory } from "vue-router";
import IdentitasView from "../views/IdentitasView.vue";
import Identitas2View from "@/views/Identitas2View.vue";
import RawatInapView from "../views/RawatInapView.vue";
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
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
  ],
});

export default router;
