<template>
  <div class="hero">
    <img
      loading="lazy"
      class="hero__img"
      :src="`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`"
      alt=""
    />
    <div class="hero__main">
      <h1 class="hero__title">{{ movieInfo.title || movieInfo.name }}</h1>
      <p class="hero__overview">{{ movieOverview }}</p>
      <div class="hero__btns">
        <button @click="watchMovie" class="hero__btn hero__btn--play">
          <i class="fas fa-play hero__btn-icon"></i> Play
        </button>
        <button @click="openModal" class="hero__btn hero__btn--info">
          <i class="fas fa-info-circle hero__btn-icon"></i> More Info
        </button>
      </div>
    </div>
    <ModalComponent
      @likeMovie="likeMovie"
      @dislikeMovie="dislikeMovie"
      @addToList="addToList"
      @removeMovie="removeMovie"
      @closeModal="closeModal"
      :cardInfo="movieInfo"
      v-if="isActive"
    />
  </div>
</template>

<script>
import ModalComponent from "@/components/shared/Modal.vue";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";

export default {
  props: ["heroParam"],
  components: { ModalComponent },
  setup(props) {
    const apikey = import.meta.env.VITE_KEY;
    const router = useRouter();
    let isActive = ref(false);
    let movies = ref([]);
    let movieInfo = ref("");
    let randomMovie = ref("");
    let movieOverview = computed(() => {
      if (!randomMovie.value.overview) return "";
      else return randomMovie.value.overview.split(".")[0] + ".";
    });

    function openModal() {
      isActive.value = true;
    }
    function closeModal() {
      isActive.value = false;
    }

    function watchMovie() {
      router.push({
        name: "video",
        params: { id: movieInfo.value.external_ids.imdb_id },
      });
      window.scrollTo(0, 0);
    }

    function addToList() {
      movieInfo.value.isAdded = true;
      localStorage.setItem(movieInfo.value.id, JSON.stringify(movieInfo.value));
    }

    function removeMovie() {
      movieInfo.value.isAdded = false;
      localStorage.removeItem(movieInfo.value.id);
    }

    function likeMovie() {
      movieInfo.value.isLiked
        ? (movieInfo.value.isLiked = null)
        : (movieInfo.value.isLiked = true);
      localStorage.setItem(movieInfo.value.id, JSON.stringify(movieInfo.value));
    }

    function dislikeMovie() {
      movieInfo.value.isLiked === false
        ? (movieInfo.value.isLiked = null)
        : (movieInfo.value.isLiked = false);
      localStorage.setItem(movieInfo.value.id, JSON.stringify(movieInfo.value));
    }

    async function fetchMovies() {
      await fetch(
        `https://api.themoviedb.org/3/${props.heroParam}?api_key=${apikey}&include_adult=false`
      )
        .then((response) => response.json())
        .then((response) => {
          movies.value = response.results.filter(
            (el) => el.backdrop_path !== null
          );
          randomMovie.value =
            movies.value[Math.floor(Math.random() * movies.value.length)];
          appendInfo(randomMovie.value.id);
        });
    }

    async function appendInfo(value) {
      await fetch(
        `https://api.themoviedb.org/3/${
          props.heroParam.split("/")[0]
        }/${value}?api_key=${apikey}&append_to_response=external_ids,videos,credits,release_dates,similar`
      )
        .then((response) => response.json())
        .then((response) => {
          movieInfo.value = response;
        });
    }

    onMounted(() => {
      fetchMovies();
    });

    return {
      isActive,
      randomMovie,
      movieInfo,
      movieOverview,
      openModal,
      closeModal,
      watchMovie,
      addToList,
      removeMovie,
      likeMovie,
      dislikeMovie,
    };
  },
};
</script>

<style lang="scss">
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  color: $color-white;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(247, 247, 247, 0) 10%,
      rgba(20, 20, 20, 1) 90%
    );
  }
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    position: absolute;
    bottom: 35%;
    margin-left: 5%;
  }
  &__img {
    width: 100%;
  }
  &__btns {
    display: flex;
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    background: $color-white;
    border: none;
    border-radius: 5px;
    padding: 8px 22px;
    margin-right: 15px;
    @include font-size(18);
    font-weight: 600;
    cursor: pointer;
    &--info {
      background-color: rgba(127, 138, 145, 0.5);
      color: $color-white;
    }
    @include mq("tablet", max) {
      @include font-size(14);
      padding: 5px 15px;
      gap: 10px;
    }
    @include mq("small", max) {
      @include font-size(8);
      padding: 3px 10px;
      gap: 5px;
      border-radius: 2px;
    }
  }
  &__title {
    margin: 0;
    margin-bottom: 10px;
    @include mq("tablet", max) {
      @include font-size(24);
      margin: 0;
      margin-bottom: 5px;
    }
    @include mq("small", max) {
      @include font-size(16);
      line-height: 1.4;
    }
  }
  &__overview {
    margin: 0 0 30px;
    max-width: 500px;
    @include font-size(18);
    @include mq("mid-tablet", max) {
      display: none;
    }
  }
}
</style>
