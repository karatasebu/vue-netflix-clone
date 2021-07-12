<template>
  <div class="carousel">
    <h3 class="carousel__title">{{ movie.title }}</h3>
    <button
      v-if="isActive"
      @click="prevSlide"
      class="carousel__btn carousel__btn--left"
    >
      <i class="fas fa-chevron-right carousel__icon"></i>
    </button>
    <div ref="slider" class="carousel__list">
      <div class="carousel__item" :key="item.id" v-for="item in movies">
        <MovieCardComponent :cardInfo="item" />
      </div>
    </div>
    <button @click="nextSlide" class="carousel__btn">
      <i class="fas fa-chevron-right carousel__icon"></i>
    </button>
  </div>
</template>

<script>
import MovieCardComponent from "@/components/shared/MovieCard.vue";

import { onMounted, ref } from "vue";
import env from "@/env.js";

export default {
  props: ["movie"],
  components: { MovieCardComponent },
  setup(props) {
    let moviesId = ref([]);
    let movies = ref([]);
    let slider = ref("");
    let isActive = ref(false);

    async function fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/discover/${props.movie.type}?api_key=${env.apikey}&with_genres=${props.movie.genreId}`
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
          moviesId.value.forEach((el) => {
            appendInfo(el);
          });
        });
    }

    async function appendInfo(value) {
      await fetch(
        `https://api.themoviedb.org/3/${props.movie.type}/${value}?api_key=${env.apikey}&append_to_response=videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          if (
            response.videos.results.length > 0 &&
            response.similar.results.length > 0
          ) {
            movies.value.push(response);
          }
        });
    }

    function nextSlide() {
      slider.value.scrollLeft += (slider.value.clientWidth * 90) / 100;
      isActive.value = true;
    }
    function prevSlide() {
      slider.value.scrollLeft -= (slider.value.clientWidth * 90) / 100;
      if (slider.value.scrollLeft < slider.value.clientWidth) {
        isActive.value = false;
      }
    }

    onMounted(() => {
      fetchMovies();
    });

    return {
      moviesId,
      movies,
      slider,
      isActive,
      nextSlide,
      prevSlide,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  &:hover {
    .carousel__icon {
      color: #fff;
      transition: color 0.5s ease;
    }
  }

  &__list {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    scroll-behavior: smooth;
    padding: 0 5%;
  }
  &__item {
    padding-right: 4px;

    max-width: calc(100% / 6);
    min-width: calc(100% / 6);
    @include mq("mid-tablet", max) {
      max-width: calc(100% / 4);
      min-width: calc(100% / 4);
    }
    @include mq("tablet", max) {
      max-width: calc(100% / 3);
      min-width: calc(100% / 3);
    }
    @include mq("mobile", max) {
      max-width: calc(100% / 2);
      min-width: calc(100% / 2);
    }
  }
  &__title {
    color: $color-white;
    padding-left: 5%;
    margin-top: 0;
    margin-bottom: -10px;
  }
  &__btn {
    position: absolute;
    bottom: 30%;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    height: calc(60% - 10px);
    width: 5%;
    cursor: pointer;
    padding: 0;
    &--left {
      left: 0;
      transform: rotate(180deg);
    }
  }
  &__icon {
    color: rgba(0, 0, 0, 0);
    @include font-size(28);
    @include mq("tablet", max) {
      @include font-size(20);
    }
  }
}
</style>
