import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Beranda",
      component: () => import("@/views/Beranda/Berandaview.vue"),
    },
  ],
});

export default router;