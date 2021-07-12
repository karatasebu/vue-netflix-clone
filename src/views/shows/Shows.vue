<template>
  <HeroComponent :heroInfo="showsHeroInfo" />
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
      { type: "tv", title: "Crime", genreId: 80 },
      { type: "tv", title: "Drama", genreId: 18 },
      { type: "tv", title: "Family", genreId: 10751 },
      { type: "tv", title: "Kids", genreId: 10762 },
      { type: "tv", title: "Mystery", genreId: 9648 },
      { type: "tv", title: "War & Politics", genreId: 10768 },
    ];
    let showsHeroInfo = ref("");

    async function getHeroInfo() {
      await fetch(
        `https://api.themoviedb.org/3/tv/77994?api_key=${env.apikey}&append_to_response=videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          showsHeroInfo.value = response;
        });
    }
    onMounted(() => {
      getHeroInfo();
    });
    return {
      listInfo,
      showsHeroInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: -13%;
}
</style>
