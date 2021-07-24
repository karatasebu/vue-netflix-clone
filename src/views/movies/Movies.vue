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
      { type: "movie", title: "Adventure", genreId: 12 },
      { type: "movie", title: "Animation", genreId: 16 },
      { type: "movie", title: "Drama", genreId: 18 },
      { type: "movie", title: "Family", genreId: 10751 },
      { type: "movie", title: "Crime & Thrillers", genreId: 80 },
      { type: "movie", title: "Science Fiction", genreId: 878 },
    ];
    let moviesHeroParam = "movie/popular";

    return {
      listInfo,
      moviesHeroParam,
    };
  },
};
</script>

<style lang="scss" scoped></style>
