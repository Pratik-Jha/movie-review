import { createWebHistory, createRouter } from "vue-router";
import Movies from "@/views/Movies.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import NotFound from "@/components/404.vue";

const routes = [
  {
    path: "/",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    props: true,
    component: MovieDetails,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
