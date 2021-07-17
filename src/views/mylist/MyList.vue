<template>
  <div class="movies">
    <div class="movies__content">
      <div class="movies__card" :key="index" v-for="(item, index) in myList">
        <MovieCardComponent
          @removeFromArr="removeMovie"
          @removeFromList="removeMovie"
          :cardInfo="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import MovieCardComponent from "@/components/shared/MovieCard.vue";

export default {
  components: { MovieCardComponent },
  setup() {
    let myList = ref([]);

    function getMovies() {
      for (let i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(localStorage.key(i))).isAdded) {
          myList.value.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }

    function removeMovie(cardInfo) {
      cardInfo.isAdded = false;
      localStorage.setItem(cardInfo.id, JSON.stringify(cardInfo));
      for (var i = 0; i < myList.value.length; i++) {
        if (myList.value[i].id === cardInfo.id) {
          myList.value.splice(i, 1);
        }
      }
    }

    onMounted(() => {
      getMovies();
    });

    return {
      myList,
      removeMovie,
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
