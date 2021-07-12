import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../views/home/Home.vue";
import ShowsComponent from "../views/shows/Shows.vue";
import MoviesComponent from "../views/movies/Movies.vue";
import PopularComponent from "../views/popular/Popular.vue";
import MyListComponent from "../views/mylist/MyList.vue";

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
];

const routing = createRouter({
  history: createWebHistory(),
  routes,
});

export default routing;
