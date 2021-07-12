<template>
  <div class="popular">
    <MovieListComponent
      :movie="item"
      :key="index"
      v-for="(item, index) in listInfo"
    />
  </div>
</template>

<script>
import MovieListComponent from "@/components/shared/MovieList.vue";

export default {
  components: {
    MovieListComponent,
  },
  setup() {
    let listInfo = [
      { type: "movie", title: "New on Netflix", genreId: 12 },
      { type: "tv", title: "Worth to Wait", genreId: 10768 },
      { type: "movie", title: "Netflix Originals", genreId: 10751 },
      { type: "tv", title: "Coming This Week", genreId: 9648 },
      { type: "movie", title: "Coming Next Week", genreId: 35 },
    ];
    return {
      listInfo,
    };
  },
};
</script>

<style lang="scss">
.popular {
  padding-top: 100px;
  margin-bottom: 50px;
}
</style>
