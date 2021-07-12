<template>
  <div class="hero">
    <video
      class="hero__video"
      :src="heroVideo"
      type="video/mp4"
      autoplay
      muted
    ></video>
    <div class="hero__main">
      <div class="hero__action">
        <h1 class="hero__title">{{ heroInfo.title || heroInfo.name }}</h1>
        <p class="hero__overview">{{ heroInfo.overview }}</p>
        <div class="hero__btns">
          <button class="hero__btn hero__btn--play">
            <i class="fas fa-play hero__btn-icon"></i> Play
          </button>
          <button class="hero__btn hero__btn--info">
            <img src="@/assets/svg/info-icon.svg" alt="info-icon" /> More Info
          </button>
        </div>
      </div>
      <button class="hero__audio">
        <i class="fas fa-volume-mute hero__audio-icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["heroInfo"],
  setup(props) {
    let heroVideo = computed(() => {
      if (!props.heroInfo) {
        return "";
      } else {
        if (props.heroInfo.title) {
          return `./src/assets/hero-videos/${props.heroInfo.title
            .toLowerCase()
            .replace(" ", "")}.mp4`;
        } else {
          return `./src/assets/hero-videos/${props.heroInfo.name
            .toLowerCase()
            .replace(" ", "")}.mp4`;
        }
      }
    });
    return {
      props,
      heroVideo,
    };
  },
};
</script>

<style lang="scss">
.hero {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15%;
    background: linear-gradient(
      180deg,
      rgba(247, 247, 247, 0) 10%,
      rgba(0, 0, 0, 0.1) 20%,
      $color-background 50%
    );
  }
  &__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 90%;
    position: absolute;
    bottom: 35%;
    margin-left: 5%;
  }
  &__video {
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
    }
    @include mq("small", max) {
      @include font-size(10);
      padding: 3px 10px;
    }
  }
  &__title {
    color: $color-white;
  }
  &__overview {
    color: $color-white;
    max-width: 500px;
    @include font-size(18);
    @include mq("mid-tablet", max) {
      display: none;
    }
  }
  &__audio {
    border: 1px solid $color-white;
    background: transparent;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @include mq("tablet", max) {
      width: 35px;
      height: 35px;
    }
    @include mq("small", max) {
      width: 25px;
      height: 25px;
    }
    &-icon {
      @include font-size(18);
      color: $color-white;
      @include mq("tablet", max) {
        @include font-size(14);
      }
      @include mq("small", max) {
        @include font-size(10);
      }
    }
  }
}
</style>
