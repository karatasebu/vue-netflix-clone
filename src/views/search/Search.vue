<template>
  <div class="movies">
    <div class="movies__content">
      <div class="movies__card" :key="index" v-for="(item, index) in movies">
        <MovieCardComponent :cardInfo="item" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCardComponent from "@/components/shared/MovieCard.vue";

import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

export default {
  components: { MovieCardComponent },
  setup() {
    let route = useRoute();
    let moviesId = ref([]);
    let movies = ref([]);

    async function fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${env.apikey}&include_adult=false&query=${route.query.q}`
      )
        .then((response) => response.json())
        .then((response) => {
          moviesId.value = response.results
            .filter(
              (el) =>
                el.backdrop_path !== null &&
                el.overview.split(".")[0].length > 30
            )
            .map((el) => el.id);

          movies.value.splice(0, moviesId.value.length);

          moviesId.value.forEach((el) => {
            appendInfo(el);
          });
        });
    }

    async function appendInfo(value) {
      await fetch(
        `https://api.themoviedb.org/3/movie/${value}?api_key=${env.apikey}&append_to_response=external_ids,videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          if (localStorage.getItem(response.id) === null) {
            response.isAdded = false;
            response.isLiked = null;
          } else {
            if (JSON.parse(localStorage.getItem(response.id)).isAdded) {
              response.isAdded = true;
            }
            if (JSON.parse(localStorage.getItem(response.id)).isLiked) {
              response.isLiked = true;
            } else {
              response.isLiked = false;
            }
          }
          if (
            response.videos.results.length > 0 &&
            response.similar.results.length > 0
          ) {
            movies.value.push(response);
          }
        });
    }

    watchEffect(() => {
      fetchMovies();
    });
    return {
      movies,
    };
  },
};
</script>

<style lang="scss" scoped>
.movies {
  min-height: 100vh;
  padding: 80px 5% 0 5%;
  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  &__card {
    padding-right: 4px;
    width: calc(100% / 6);
    @include mq("desktop", max) {
      width: calc(100% / 5);
    }
    @include mq("mid-tablet", max) {
      width: calc(100% / 4);
    }
    @include mq("tablet", max) {
      width: calc(100% / 3);
    }
    @include mq("mobile", max) {
      width: calc(100% / 2);
    }
  }
}
</style>
