<template>
  <div class="hero">
    <video
      @ended="controlEnd"
      ref="videoRef"
      class="hero__video"
      :src="heroVideo"
      type="video/mp4"
      autoplay
      :muted="isMuted"
    ></video>
    <div class="hero__main">
      <div class="hero__action">
        <h1 class="hero__title">{{ heroInfo.title || heroInfo.name }}</h1>
        <p class="hero__overview">{{ heroInfo.overview }}</p>
        <div class="hero__btns">
          <button @click="watchMovie" class="hero__btn hero__btn--play">
            <i class="fas fa-play hero__btn-icon"></i> Play
          </button>
          <button @click="openModal" class="hero__btn hero__btn--info">
            <i class="fas fa-info-circle hero__btn-icon"></i> More Info
          </button>
        </div>
      </div>
      <button v-if="!isEnded" @click="muteVideo" class="hero__audio">
        <i v-if="isMuted" class="fas fa-volume-mute hero__audio-icon"></i>
        <i v-else class="fas fa-volume-up hero__audio-icon"></i>
      </button>
      <button @click="replayVideo" v-else class="hero__audio">
        <i class="fas fa-reply hero__audio-icon"></i>
      </button>
    </div>
    <ModalComponent
      @closeModal="closeModal"
      :cardInfo="heroInfo"
      v-if="isActive"
    />
  </div>
</template>

<script>
import ModalComponent from "@/components/shared/Modal.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

export default {
  props: ["heroInfo"],
  components: { ModalComponent },
  setup(props) {
    const router = useRouter();
    let isMuted = ref(true);
    let heroVideo = computed(() => {
      if (!props.heroInfo) {
        return "";
      } else {
        if (props.heroInfo.title) {
          return `./src/assets/hero-videos/${props.heroInfo.title
            .toLowerCase()
            .replaceAll(" ", "")}.mp4`;
        } else {
          return `./src/assets/hero-videos/${props.heroInfo.name
            .toLowerCase()
            .replaceAll(" ", "")}.mp4`;
        }
      }
    });
    let isActive = ref(false);
    let videoRef = ref("");
    let isEnded = ref(false);

    function openModal() {
      isActive.value = true;
      videoRef.value.pause();
    }
    function closeModal() {
      isActive.value = false;
      videoRef.value.play();
    }

    function muteVideo() {
      isMuted.value ? (isMuted.value = false) : (isMuted.value = true);
    }

    function controlEnd() {
      isEnded.value ? (isEnded.value = false) : (isEnded.value = true);
    }

    function replayVideo() {
      videoRef.value.currentTime = 0;
      videoRef.value.play();
      isEnded.value = false;
    }

    function watchMovie() {
      router.push({
        name: "video",
        params: { id: props.heroInfo.external_ids.imdb_id },
      });
      window.scrollTo(0, 0);
    }

    return {
      props,
      heroVideo,
      muteVideo,
      isMuted,
      isActive,
      openModal,
      closeModal,
      videoRef,
      controlEnd,
      isEnded,
      replayVideo,
      watchMovie,
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
    color: $color-white;
    @include mq("tablet", max) {
      @include font-size(24);
      margin: 0;
      margin-bottom: 5px;
    }
    @include mq("mobile", max) {
      @include font-size(16);
    }
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
    @include font-size(18);
    @include mq("tablet", max) {
      @include font-size(14);
      width: 35px;
      height: 35px;
    }
    @include mq("small", max) {
      @include font-size(10);
      width: 25px;
      height: 25px;
    }
    &-icon {
      color: $color-white;
    }
  }
}
</style>
