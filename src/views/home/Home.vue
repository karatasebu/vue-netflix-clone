<template>
  <HeroComponent :heroParam="moviesHeroParam" />
  <main class="main">
    <MovieListComponent
      :movie="item"
      :key="index"
      v-for="(item, index) in listInfo"
    />
  </main>
</template>

<script>
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
    let moviesHeroParam = "movie/popular";

    return {
      listInfo,
      moviesHeroParam,
    };
  },
};
</script>

<style></style>
