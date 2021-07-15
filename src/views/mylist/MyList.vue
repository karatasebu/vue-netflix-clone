<template>
  <div class="list">Sa</div>
  <div :key="index" v-for="(item, index) in myList">
    <MovieCardComponent @addTolist="addMovie" :cardInfo="item" />
  </div>
</template>

<script>
import MovieCardComponent from "@/components/shared/MovieCard.vue";

import { ref } from "vue";

export default {
  components: { MovieCardComponent },
  setup() {
    let myList = ref([]);

    function addMovie(cardInfo) {
      myList.value.push(cardInfo);
      console.log(myList.value);
    }

    return {
      addMovie,
      myList,
    };
  },
};
</script>

<style lang="scss" scoped>
.list {
  color: $color-white;
  padding-top: 100px;
  min-height: 150vh;
}
</style>
