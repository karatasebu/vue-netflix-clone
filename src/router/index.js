import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../views/home/Home.vue";
import ShowsComponent from "../views/shows/Shows.vue";
import MoviesComponent from "../views/movies/Movies.vue";
import PopularComponent from "../views/popular/Popular.vue";
import MyListComponent from "../views/mylist/MyList.vue";
import SearchComponent from "../views/search/Search.vue";
import VideoComponent from "../views/video/Video.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeComponent,
  },
  {
    path: "/shows",
    name: "Shows",
    component: ShowsComponent,
  },
  {
    path: "/movies",
    name: "Movies",
    component: MoviesComponent,
  },
  {
    path: "/popular",
    name: "Popular",
    component: PopularComponent,
  },
  {
    path: "/my-list",
    name: "MyList",
    component: MyListComponent,
  },
  {
    path: "/search",
    name: "search",
    component: SearchComponent,
    props: (route) => ({ query: route.query.q }),
  },
  {
    path: "/video/:id",
    name: "video",
    component: VideoComponent,
  },
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
