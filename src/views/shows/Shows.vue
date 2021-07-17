<template>
  <HeroComponent :heroParam="showsHeroParam" />
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
      { type: "tv", title: "Crime", genreId: 80 },
      { type: "tv", title: "Drama", genreId: 18 },
      { type: "tv", title: "Family", genreId: 10751 },
      { type: "tv", title: "Kids", genreId: 10762 },
      { type: "tv", title: "Mystery", genreId: 9648 },
      { type: "tv", title: "War & Politics", genreId: 10768 },
    ];
    let showsHeroParam = "tv/top_rated";

    return {
      listInfo,
      showsHeroParam,
    };
  },
};
</script>

<style></style>
