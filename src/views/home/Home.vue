<template>
  <HeroComponent :heroInfo="homeHeroInfo" />
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
      { type: "movie", title: "Trending Now", genreId: 28 },
      { type: "tv", title: "Watch It Again", genreId: 10759 },
      { type: "movie", title: "Recently Added", genreId: 10751 },
      { type: "tv", title: "Popular Tv Shows", genreId: 16 },
      { type: "movie", title: "Crime & Thrillers", genreId: 80 },
      { type: "tv", title: "Top Rated", genreId: 35 },
    ];
    let homeHeroInfo = ref("");

    async function getHeroInfo() {
      await fetch(
        `https://api.themoviedb.org/3/tv/19885?api_key=${env.apikey}&append_to_response=videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          homeHeroInfo.value = response;
        });
    }
    onMounted(() => {
      getHeroInfo();
    });
    return {
      listInfo,
      homeHeroInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: -13%;
}
</style>
