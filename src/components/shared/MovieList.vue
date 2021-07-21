<template>
  <div class="carousel">
    <h3 class="carousel__title">{{ movie.title }}</h3>
    <button
      v-if="leftArrow"
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
    <button v-if="rightArrow" @click="nextSlide" class="carousel__btn">
      <i class="fas fa-chevron-right carousel__icon"></i>
    </button>
  </div>
</template>

<script>
import MovieCardComponent from "@/components/shared/MovieCard.vue";
import { onMounted, ref } from "vue";

export default {
  props: ["movie"],
  components: { MovieCardComponent },
  setup(props) {
    const apikey = import.meta.env.VITE_KEY;
    let moviesId = ref([]);
    let movies = ref([]);
    let slider = ref("");
    let leftArrow = ref(false);
    let rightArrow = ref(true);

    async function fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/discover/${props.movie.type}?api_key=${apikey}&include_adult=false&with_genres=${props.movie.genreId}`
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
        `https://api.themoviedb.org/3/${props.movie.type}/${value}?api_key=${apikey}&append_to_response=external_ids,videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          let item = localStorage.getItem(response.id);
          if (!item) {
            response.isAdded = false;
            response.isLiked = null;
          } else {
            response.isAdded = JSON.parse(item).isAdded;
            response.isLiked = JSON.parse(item).isLiked;
          }
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
      leftArrow.value = true;
      if (
        slider.value.scrollLeft + slider.value.clientWidth * 2 >
        slider.value.scrollWidth
      ) {
        rightArrow.value = false;
      }
    }
    function prevSlide() {
      slider.value.scrollLeft -= (slider.value.clientWidth * 90) / 100;
      rightArrow.value = true;
      if (slider.value.scrollLeft < slider.value.clientWidth) {
        leftArrow.value = false;
      }
    }

    onMounted(() => {
      fetchMovies();
    });

    return {
      moviesId,
      movies,
      slider,
      leftArrow,
      rightArrow,
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
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    padding: 0 5%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__item {
    padding-right: 4px;
    max-width: calc(100% / 6);
    min-width: calc(100% / 6);
    @include mq("desktop", max) {
      max-width: calc(100% / 5);
      min-width: calc(100% / 5);
    }
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
    @include mq("mid-tablet", max) {
      @include font-size(14);
    }
    @include mq("tablet", max) {
      @include font-size(12);
    }
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
    @include mq("tablet", max) {
      height: calc(60% - 8px);
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
