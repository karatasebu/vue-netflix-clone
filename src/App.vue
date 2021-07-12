<template>
  <HeaderComponent />
  <router-view :key="route.path" />
  <FooterComponent />
</template>

<script>
import { useRoute } from "vue-router";

import HeaderComponent from "@/components/shared/Header.vue";
import FooterComponent from "@/components/shared/Footer.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    let route = useRoute();
    return {
      route,
    };
  },
};
</script>

<style lang="scss"></style>
