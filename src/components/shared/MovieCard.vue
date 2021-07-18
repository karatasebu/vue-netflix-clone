<template>
  <div class="card">
    <div class="card__main">
      <img
        class="card__img"
        loading="lazy"
        :src="`https://image.tmdb.org/t/p/w300${cardInfo.backdrop_path}`"
        alt=""
      />
    </div>
    <div class="card__info">
      <p class="card__title">{{ cardInfo.name || cardInfo.title }}</p>
      <div class="card__btns">
        <div class="card__main-btns">
          <button @click="watchMovie" class="card__btn card__btn--play">
            <i class="fas fa-play card__icon card__icon--play"></i>
          </button>
          <button v-if="!cardInfo.isAdded" @click="addToList" class="card__btn">
            <i class="fas fa-plus card__icon"></i>
          </button>
          <button
            v-else
            @click="$emit('removeFromList', cardInfo), removeMovie()"
            class="card__btn"
          >
            <i class="fas fa-check card__icon"></i>
          </button>
          <button
            @click="likeMovie"
            :class="[{ act: cardInfo.isLiked }, 'card__btn']"
          >
            <i class="far fa-thumbs-up card__icon"></i>
          </button>
          <button
            @click="dislikeMovie"
            :class="[{ act: cardInfo.isLiked === false }, 'card__btn']"
          >
            <i class="far fa-thumbs-down card__icon"></i>
          </button>
        </div>
        <button @click="openModal" class="card__btn">
          <i class="fas fa-chevron-down card__icon"></i>
        </button>
      </div>
      <div class="card__genres">
        <span class="card__genre">{{ cardInfo.genres[0].name }} </span>
        <i v-if="cardInfo.genres[1]" class="fas fa-circle card__genre-dot"></i>
        <span v-if="cardInfo.genres[1]" class="card__genre"
          >{{ cardInfo.genres[1].name }}
        </span>
      </div>
    </div>
  </div>
  <ModalComponent
    @likeMovie="likeMovie"
    @dislikeMovie="dislikeMovie"
    @addToList="addToList"
    @removeMovie="removeMovie"
    @closeModal="closeModal"
    @watchMovie="watchMovie"
    v-bind="$attrs"
    :cardInfo="cardInfo"
    v-if="isActive"
  />
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ModalComponent from "@/components/shared/Modal.vue";

export default {
  props: ["cardInfo"],
  emits: ["removeFromList"],
  components: { ModalComponent },

  setup(props) {
    const router = useRouter();
    let isActive = ref(false);

    function openModal() {
      isActive.value = true;
    }
    function closeModal() {
      isActive.value = false;
    }

    function watchMovie() {
      router.push({
        name: "video",
        params: { id: props.cardInfo.external_ids.imdb_id },
      });
      window.scrollTo(0, 0);
    }

    function addToList() {
      props.cardInfo.isAdded = true;
      localStorage.setItem(props.cardInfo.id, JSON.stringify(props.cardInfo));
      console.log(props.cardInfo);
    }

    function removeMovie() {
      props.cardInfo.isAdded = false;
      localStorage.setItem(props.cardInfo.id, JSON.stringify(props.cardInfo));
      if (props.cardInfo.isLiked === null) {
        localStorage.removeItem(props.cardInfo.id);
      }
    }

    function likeMovie() {
      props.cardInfo.isLiked
        ? (props.cardInfo.isLiked = null)
        : (props.cardInfo.isLiked = true);
      localStorage.setItem(props.cardInfo.id, JSON.stringify(props.cardInfo));
    }

    function dislikeMovie() {
      props.cardInfo.isLiked === false
        ? (props.cardInfo.isLiked = null)
        : (props.cardInfo.isLiked = false);
      localStorage.setItem(props.cardInfo.id, JSON.stringify(props.cardInfo));
    }

    return {
      isActive,
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

<style lang="scss" scoped>
.card {
  border-radius: 5px;
  margin-bottom: 30%;
  margin-top: 10%;
  cursor: pointer;
  transition: transform 0.5s ease-out;
  &:hover {
    margin-bottom: 0;
    transform: scale(1.2);
    .card__info {
      display: block;
    }
  }
  &__title {
    color: $color-white;
    position: absolute;
    top: 0;
    @include font-size(12);
    @include mq("tablet", max) {
      @include font-size(10);
    }
    @include mq("small", max) {
      @include font-size(8);
    }
  }
  &__img {
    width: 100%;
    border-radius: 5px;
  }
  &__btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__main-btns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &__info {
    display: none;
    padding: 3px 0 3px 10px;
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: $color-white;
    background: transparent;
    cursor: pointer;
    @include font-size(10);
    border: 1px solid $color-white;
    &.act {
      @include font-size(11);
      border-width: 2px;
      @include mq("desktop", max) {
        @include font-size(9);
      }
      @include mq("small", max) {
        @include font-size(6);
      }
    }
    &--play {
      background: $color-white;
    }
    @include mq("desktop", max) {
      width: 20px;
      height: 20px;
      @include font-size(8);
    }
    @include mq("small", max) {
      width: 15px;
      height: 15px;
      margin-right: 5px;

      @include font-size(5);
    }
  }
  &__icon {
    &--play {
      color: $color-background;
      margin-left: 2px;
    }
  }
  &__genres {
    padding: 5px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
  }
  &__genre {
    color: $color-white;
    @include font-size(10);
    @include mq("desktop", max) {
      @include font-size(8);
    }
    @include mq("small", max) {
      @include font-size(6);
    }
    &-dot {
      color: $color-white;
      @include font-size(2);
    }
  }
}
</style>
