<template>
  <HeroComponent :heroInfo="moviesHeroInfo" />
  <main class="main">
    <MovieListComponent
      :movie="item"
      :key="index"
      v-for="(item, index) in listInfo"
    />
  </main>
</template>

<script>
import { onMounted, ref } from "vue";
import env from "@/env.js";

import HeroComponent from "@/components/shared/Hero.vue";
import MovieListComponent from "@/components/shared/MovieList.vue";

export default {
  components: {
    HeroComponent,
    MovieListComponent,
  },
  setup() {
    let listInfo = [
      { type: "movie", title: "Science Fiction", genreId: 878 },
      { type: "movie", title: "Western", genreId: 37 },
      { type: "movie", title: "Horror", genreId: 27 },
      { type: "movie", title: "Comedy", genreId: 35 },
      { type: "movie", title: "Music", genreId: 10402 },
      { type: "movie", title: "Action", genreId: 28 },
    ];
    let moviesHeroInfo = ref("");

    async function getHeroInfo() {
      await fetch(
        `https://api.themoviedb.org/3/movie/508943?api_key=${env.apikey}&append_to_response=videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          moviesHeroInfo.value = response;
        });
    }
    onMounted(() => {
      getHeroInfo();
    });
    return {
      listInfo,
      moviesHeroInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: -11%;
}
</style>
