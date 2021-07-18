<template>
  <div class="container">
    <iframe
      class="container__video"
      :src="videoUrl"
      frameborder="0"
      allow="autoplay"
    ></iframe>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const apikey = import.meta.env.VITE_KEY;
    const route = useRoute();
    let videoInfo = reactive({
      type: "",
      id: "",
    });
    let videoUrl = ref("");

    async function fetchVideoInfo() {
      await fetch(
        `https://api.themoviedb.org/3/find/${route.params.id}?api_key=${apikey}&language=en-US&external_source=imdb_id`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.movie_results.length > 0) {
            videoInfo.type = "movie";
            videoInfo.id = response.movie_results[0].id;
          } else {
            videoInfo.type = "tv";
            videoInfo.id = response.tv_results[0].id;
          }
          fetchVideoUrl();
        });
    }
    async function fetchVideoUrl() {
      await fetch(
        `https://api.themoviedb.org/3/${videoInfo.type}/${videoInfo.id}?api_key=${apikey}&append_to_response=videos`
      )
        .then((response) => response.json())
        .then((response) => {
          videoUrl.value = `https://www.youtube.com/embed/${response.videos.results[0].key}?autoplay=1`;
        });
    }

    onMounted(() => {
      fetchVideoInfo();
    });

    return {
      route,
      videoInfo,
      videoUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8%;
    background: $color-background;
  }
  &__video {
    width: 100%;
    height: 100vh;
  }
}
</style>
