import { createRouter, createWebHistory } from "vue-router";
// 1. Import komponen view yang baru dibuat
import IdentitasView from "@/views/IdentitasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // 2. Pasang sebagai halaman utama (atau path lain misal '/form')
      component: IdentitasView,
    },
    // ... route lainnya biarkan saja
  ],
});

export default router;
