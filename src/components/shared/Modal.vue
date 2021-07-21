<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__video">
        <button
          @click="$emit('closeModal')"
          class="modal__btn modal__btn--close"
        >
          <i class="fas fa-times modal__icon"></i>
        </button>
        <iframe
          class="modal__video-frame"
          :src="`https://www.youtube.com/embed/${cardInfo.videos.results[0].key}?autoplay=1`"
          frameborder="0"
          allow="autoplay"
        ></iframe>
        <div class="modal__overlay">
          <h3 class="modal__title">{{ cardInfo.name || cardInfo.title }}</h3>
          <div class="modal__btns">
            <button @click="watchMovie" class="modal__btn modal__btn--play">
              <i class="fas fa-play modal__icon modal__icon--play"></i> Play
            </button>
            <button
              v-if="!cardInfo.isAdded"
              @click="$emit('addToList')"
              class="modal__btn"
            >
              <i class="fas fa-plus modal__icon"></i>
            </button>
            <button
              v-else
              @click="$emit('removeMovie'), $emit('removeFromArr', cardInfo)"
              class="modal__btn"
            >
              <i class="fas fa-check modal__icon"></i>
            </button>
            <button
              @click="$emit('likeMovie')"
              :class="[{ act: cardInfo.isLiked }, 'modal__btn']"
            >
              <i class="far fa-thumbs-up modal__icon"></i>
            </button>
            <button
              @click="$emit('dislikeMovie')"
              :class="[{ act: cardInfo.isLiked === false }, 'modal__btn']"
            >
              <i class="far fa-thumbs-down modal__icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal__info">
        <p class="modal__overview">
          {{ cardInfo.overview.split(".")[0] + "." }}
        </p>
        <div class="modal__credits">
          <p class="modal__text">
            <span class="modal__text--gray">Cast: </span>{{ cast }}
          </p>
          <p class="modal__text">
            <span class="modal__text--gray">Genres: </span>{{ genre }}
          </p>
        </div>
      </div>
      <div class="modal__related">
        <h3 class="modal__related-title">More Like This</h3>
        <div class="modal__cards">
          <div
            :key="index"
            v-for="(item, index) in related"
            class="modal__card"
          >
            <div class="modal__card-main">
              <p class="modal__card-name">{{ item.name || item.title }}</p>
              <img
                class="modal__card-img"
                :src="`https://image.tmdb.org/t/p/w300${item.backdrop_path}`"
                alt=""
              />
            </div>
            <div class="modal__card-info">
              <p class="modal__card-vote">{{ item.vote_average.toFixed(1) }}</p>
              <p class="modal__card-date">
                {{
                  item.release_date
                    ? item.release_date.split("-")[0]
                    : item.first_air_date.split("-")[0]
                }}
              </p>
            </div>
            <p class="modal__card-overview">
              {{ item.overview.split(".")[0] + "." }}
            </p>
          </div>
          <div class="modal__about">
            <h3 class="modal__title">
              <span class="modal__title--thin">About</span>
              {{ cardInfo.name || cardInfo.title }}
            </h3>
            <p v-if="cardInfo.credits.crew.length > 0" class="modal__text">
              <span class="modal__text--gray">Director: </span
              >{{ cardInfo.credits.crew[0].name }}
            </p>
            <p class="modal__text">
              <span class="modal__text--gray">Cast: </span>{{ cast }}
            </p>
            <p v-if="cardInfo.credits.crew.length > 1" class="modal__text">
              <span class="modal__text--gray">Writer: </span
              >{{ cardInfo.credits.crew[1].name }}
            </p>
            <p class="modal__text">
              <span class="modal__text--gray">Genres: </span>{{ genre }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["cardInfo"],
  emits: [
    "closeModal",
    "addToList",
    "removeMovie",
    "removeFromArr",
    "likeMovie",
    "dislikeMovie",
  ],
  setup(props) {
    const router = useRouter();
    let related = computed(() => {
      return props.cardInfo.similar.results
        .filter(
          (el) =>
            el.backdrop_path !== null && el.overview.split(".")[0].length > 30
        )
        .slice(0, 9);
    });
    let cast = computed(() => {
      if (props.cardInfo.credits.cast.length > 1) {
        return `${props.cardInfo.credits.cast[0].name}, ${props.cardInfo.credits.cast[1].name}`;
      } else {
        return props.cardInfo.credits.cast[0].name;
      }
    });
    let genre = computed(() => {
      if (props.cardInfo.genres.length > 1) {
        return `${props.cardInfo.genres[0].name}, ${props.cardInfo.genres[1].name}`;
      } else {
        return props.cardInfo.genres[0].name;
      }
    });

    function watchMovie() {
      router.push({
        name: "video",
        params: { id: props.cardInfo.external_ids.imdb_id },
      });
      window.scrollTo(0, 0);
    }

    return {
      related,
      cast,
      genre,
      watchMovie,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: z-index(popup);
  &__content {
    position: fixed;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 850px;
    height: 100vh;
    padding-bottom: 30px;
    color: $color-white;
    background: $color-background;
    overflow: auto;
    @include mq("mid-tablet", max) {
      width: 90%;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__video {
    position: relative;
    &-frame {
      width: 100%;
      height: 400px;
    }
  }
  &__title {
    color: $color-white;
    @include font-size(28);
    margin: 0;
    margin-bottom: 10px;
    &--thin {
      font-weight: lighter;
    }
    @include mq("tablet", max) {
      @include font-size(22);
    }
  }
  &__overlay {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 15%;
    padding: 0 5%;
  }
  &__btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(42, 42, 42, 0.6);
    cursor: pointer;
    border: 1px solid $color-white;
    @include font-size(16);
    &.act {
      @include font-size(17);
      border-width: 2px;
      @include mq("tablet", max) {
        @include font-size(13);
      }
    }
    @include mq("tablet", max) {
      @include font-size(12);
      width: 30px;
      height: 30px;
    }
    &--play {
      font-weight: 600;
      background: $color-white;
      width: 120px;
      gap: 10px;
      border-radius: 5px;
      @include mq("tablet", max) {
        width: 80px;
      }
    }
    &--close {
      position: absolute;
      top: 30px;
      right: 30px;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  &__icon {
    color: $color-white;
    &--play {
      color: $color-background;
      margin-left: 2px;
    }
  }
  &__info {
    padding: 5px 5%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 40px;
    @include font-size(16);
    @include mq("tablet", max) {
      @include font-size(13);
    }
  }
  &__overview {
    max-width: 60%;
  }
  &__text {
    &--gray {
      color: gray;
    }
  }
  &__related {
    padding: 10px 5%;
    @include font-size(16);
    @include mq("tablet", max) {
      @include font-size(14);
    }
    &-title {
      margin-bottom: 10px;
    }
  }
  &__cards {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__card {
    width: 32%;
    margin-top: 10px;
    background: #2f2f2f;
    border-radius: 5px;
    @include font-size(16);
    @include mq("tablet", max) {
      @include font-size(13);
    }
    @include mq("small", max) {
      width: 49%;
    }
    &-main {
      position: relative;
    }
    &-name {
      position: absolute;
      bottom: 0;
      left: 5px;
    }
    &-img {
      width: 100%;
      border-radius: 5px 5px 0 0;
    }
    &-info {
      display: flex;
      flex-direction: row;
      gap: 5px;
      margin: 0;
      margin-left: 5px;
    }
    &-vote {
      padding: 3px 8px;
      border: 1px solid $color-white;
    }
    &-date {
      padding: 3px 8px;
    }
    &-overview {
      padding: 10px 8px;
      margin: 0;
      color: #c8c8c8;
    }
  }
  &__about {
    margin-top: 50px;
    @include mq("tablet", max) {
      @include font-size(13);
    }
  }
}
</style>
