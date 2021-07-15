<template>
  <footer class="footer">
    <div class="footer_icons">
      <a href="#" class="footer__icon"
        ><img src="@/assets/svg/facebook-icon.svg" alt="facebook-icon"
      /></a>
      <a href="#" class="footer__icon"
        ><img src="@/assets/svg/instagram-icon.svg" alt="instagram-icon"
      /></a>
      <a href="#" class="footer__icon"
        ><img src="@/assets/svg/twitter-icon.svg" alt="twitter-icon"
      /></a>
      <a href="#" class="footer__icon"
        ><img src="@/assets/svg/youtube-icon.svg" alt="youtube-icon"
      /></a>
    </div>
    <div class="footer__links">
      <div class="footer__column">
        <a class="footer__link" href="#">Audio and Subtitles</a>
        <a class="footer__link" href="#">Media Center</a>
        <a class="footer__link" href="#">Privacy</a>
        <a class="footer__link" href="#">Contact Us</a>
      </div>
      <div class="footer__column">
        <a class="footer__link" href="#">Audio Description</a>
        <a class="footer__link" href="#">Investor Relations</a>
        <a class="footer__link" href="#">Legal Notices</a>
      </div>
      <div class="footer__column">
        <a class="footer__link" href="#">Help Center</a>
        <a class="footer__link" href="#">Jobs</a>
        <a class="footer__link" href="#">Cookie Preferences</a>
      </div>
      <div class="footer__column">
        <a class="footer__link" href="#">Gift Cards</a>
        <a class="footer__link" href="#">Term od Use</a>
        <a class="footer__link" href="#">Corporate Information</a>
      </div>
    </div>
    <div class="footer_service-code">
      <button @click="changeText" class="footer__btn">
        {{ btnText }}
      </button>
    </div>
    <div class="footer__copyright">
      © 2021 Netflix Clone by Ebubekir Karataş
    </div>
  </footer>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    let btnText = ref("Service Code");

    function changeText() {
      btnText.value = "345-986";
    }

    return {
      btnText,
      changeText,
    };
  },
};
</script>

<style lang="scss">
.footer {
  max-width: 1040px;
  margin: 0 auto;
  padding: 15px 40px;
  @include mq("mobile", max) {
    text-align: center;
  }

  &__links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  &__column {
    display: flex;
    flex-direction: column;
    color: $footer-link;
    @include mq("tablet", max) {
      width: 230px;
    }
    @include mq("small", max) {
      width: 160px;
    }
    @include mq("mobile", max) {
      margin: auto;
    }
  }
  &__link {
    @include font-size(13);
    color: $footer-link;
    text-decoration: none;
    margin-bottom: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
  &__btn {
    background: transparent;
    color: $footer-link;
    border: 1px solid $footer-link;
    padding: 5px;
    cursor: pointer;
    margin-block: 15px;
  }
  &__copyright {
    color: $footer-link;
  }
  &__icon {
    margin-right: 20px;
  }
}
</style>
