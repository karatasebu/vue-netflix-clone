<template>
  <header :class="[{ scroll: isScrolled }, 'header']">
    <nav class="header__nav">
      <router-link
        @click="scrollTop"
        class="header__link header__link--logo"
        to="/"
        ><svg
          class="header__link-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 69.186"
        >
          <path
            d="M35.2 64.726c-3.85.676-7.77.88-11.823 1.42L11.013 29.93V67.7c-3.85.405-7.364.946-11.013 1.486V0h10.27l14.053 39.255V0H35.2v64.726zm21.283-39.39l14.46-.203v10.8l-14.46.203v16.08l19.12-1.15v10.404l-29.93 2.365V0h29.93v10.8h-19.12v14.526zm59.32-14.526H104.59v49.727l-10.8.135V10.81H82.564V0h33.24v10.81zm17.567 13.783h14.797v10.8H133.37V59.93h-10.608V0h30.202v10.8H133.37v13.783zm37.16 25.877c6.15.135 12.364.608 18.377.946V62.09l-29.187-1.42V0h10.8v50.47zm27.5 12.364c3.446.203 7.094.406 10.607.81V0H198.03v62.835zM256 0l-13.716 32.904L256 69.186c-4.054-.54-8.108-1.284-12.162-1.96l-7.77-19.998-7.904 18.378c-3.92-.676-7.703-.88-11.62-1.42l13.918-31.688L217.894 0h11.62l7.094 18.175L244.176 0H256z"
            fill="#d81f26"
          />
        </svg>
      </router-link>
      <div class="header__navbar">
        <div @click="toggleMenu(navRef)" class="header__menu">
          <span class="header__browse">Browse</span>
          <div class="header__account-arrow"></div>
        </div>
        <div ref="navRef" class="header__links">
          <router-link @click="scrollTop" class="header__link" to="/"
            >Home</router-link
          >
          <router-link @click="scrollTop" class="header__link" to="/shows"
            >TV Shows</router-link
          >
          <router-link @click="scrollTop" class="header__link" to="/movies"
            >Movies</router-link
          >
          <router-link @click="scrollTop" class="header__link" to="/popular"
            >New & Popular</router-link
          >
          <router-link @click="scrollTop" class="header__link" to="/my-list"
            >My List</router-link
          >
        </div>
      </div>
    </nav>
    <div class="header__settings">
      <div @click="getFocus" class="header__search">
        <form @submit.prevent>
          <input
            v-model="search"
            ref="searchRef"
            id="textField"
            name="search"
            autocomplete="off"
            placeholder="Titles, people, genres"
            class="header__input"
            type="text"
            @keyup="goToSearch"
          />
        </form>
        <button class="header__search-btn">
          <i class="fas fa-search header__search-icon"></i>
        </button>
      </div>
      <div class="header__notification">
        <i
          @click="toggleMenu(notificationRef)"
          class="fas fa-bell header__notification-icon"
        ></i>
        <div ref="notificationRef" class="header__notification-list">
          <a class="header__notification-item" href="#"
            ><img
              class="header__notification-img"
              src="@/assets/notification-images/lupin.jpg"
              alt="lupin-poster"
            />
            <p>Now available Part 2.</p>
          </a>
          <hr class="header__notification-line" />
          <a class="header__notification-item" href="#"
            ><img
              class="header__notification-img"
              src="@/assets/notification-images/strangerthings.jpg"
              alt="stranger things-poster"
            />
            <p>Suggestion for tonight.</p></a
          >
        </div>
      </div>
      <div @click="toggleMenu(accountRef)" class="header__account">
        <div class="header__account-menu">
          <img
            class="header__account-img"
            src="https://occ-0-2705-2706.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUCZYfPbupvQjzSa3egePk8TFNDy2A_w15DEAq50IqW8MYmOtmbWwN4Txem7mgNYEMPJ1BY6uasiIJQ8JeFO3EU.png?r=b97"
            alt=""
          />
          <div class="header__account-arrow"></div>
        </div>
        <div ref="accountRef" class="header__account-links">
          <a href="#" class="header__account-link">Manage Profiles</a>
          <hr class="header__account-line" />
          <a href="#" class="header__account-link">Account</a>
          <a href="#" class="header__account-link">Help Center</a>
          <a href="#" class="header__account-link">Sign out of Netflix</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const navRef = ref("");
    const searchRef = ref("");
    const accountRef = ref("");
    const notificationRef = ref("");
    let search = ref("");
    let movies = ref([]);
    let isScrolled = ref(false);

    function getFocus() {
      searchRef.value.focus();
    }
    function scroll() {
      window.pageYOffset > 30
        ? (isScrolled.value = true)
        : (isScrolled.value = false);
    }
    function goToSearch() {
      if (search.value) {
        router.replace({ path: "/search", query: { q: search.value } });
      } else {
        router.replace("/");
      }
    }
    function scrollTop() {
      window.scrollTo(0, 0);
      if (navRef.value.classList.contains("show")) {
        navRef.value.classList.remove("show");
      }
    }

    function toggleMenu(element) {
      element.classList.toggle("show");
    }

    onMounted(() => {
      window.addEventListener("scroll", scroll);
    });

    return {
      navRef,
      searchRef,
      accountRef,
      notificationRef,
      isScrolled,
      search,
      movies,
      getFocus,
      goToSearch,
      scrollTop,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss">
.header {
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5%;
  z-index: z-index(mid);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  @include mq("tablet", max) {
    padding-block: 10px;
  }
  &.scroll {
    background: #121212;
  }
  &__menu {
    display: none;
    cursor: pointer;
    @include mq("mid-tablet", max) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
  &__browse {
    color: $color-white;
    @include font-size(16);
    @include mq("mid-tablet", max) {
      @include font-size(16);
    }
    @include mq("tablet", max) {
      @include font-size(12);
    }
  }
  &__nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &__links {
    @include mq("mid-tablet", max) {
      display: none;
      &.show {
        display: flex;
        position: absolute;
        top: 70px;
        left: 50px;
        display: flex;
        flex-direction: column;
        width: 250px;
        padding-top: 20px;
        border-top: 1px solid $color-white;
        background: rgba(0, 0, 0, 0.9);
        @include mq("tablet", max) {
          top: 60px;
          left: -35px;
        }
        @include mq("small", max) {
          width: 200px;
          left: -10px;
        }
      }
    }
  }
  &__link {
    text-decoration: none;
    color: $header-link;
    margin-right: 15px;
    @include font-size(14);
    @include mq("mid-tablet", max) {
      margin-right: 0;
      margin-bottom: 20px;
      text-align: center;
    }
    &:hover {
      color: #cacaca;
    }
    &--logo {
      margin: 0;
      margin-right: 50px;
      @include mq("tablet", max) {
        margin-right: 20px;
      }
    }
    &-icon {
      width: 100px;
      height: 27px;
      @include mq("tablet", max) {
        width: 50px;
        height: 14px;
      }
    }
  }
  // Right side of header
  &__settings {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 25px;
  }
  // Search input
  &__input {
    display: none;
    background: $color-black;
    padding: 5px 30px;
    border: 1px solid $color-white;
    color: $color-white;
    z-index: z-index(bot);
    @include mq("small", max) {
      margin-left: 10px;
      width: 200px;
    }
  }
  &__search {
    position: relative;
    &:focus-within {
      .header__input {
        display: block;
      }
      .header__search-btn {
        position: absolute;
        top: 0;
        @include mq("tablet", max) {
          top: 3px;
        }
        @include mq("small", max) {
          left: 10px;
        }
      }
    }
    &-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: z-index(top);
      color: $color-white;
      @include font-size(18);
      margin-left: 5px;
      @include mq("tablet", max) {
        @include font-size(14);
      }
    }
  }
  // Notification Button
  &__notification {
    position: relative;
    color: $color-white;
    &-icon {
      cursor: pointer;
      @include font-size(18);
      @include mq("tablet", max) {
        @include font-size(14);
      }
    }
    &-list {
      position: absolute;
      display: none;
      top: 60px;
      right: 0;
      padding: 15px 10px;
      width: 250px;
      border-top: 1px solid $color-white;
      background: rgba(0, 0, 0, 0.9);
      &.show {
        display: block;
      }
    }
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-white;
      text-decoration: none;
      gap: 10px;
    }
    &-img {
      width: 90px;
      height: 55px;
      border-radius: 5px;
    }
    &-line {
      border: none;
      border-top: 1px solid $header-link;
    }
  }
  // Account Button
  &__account {
    position: relative;

    &-links {
      position: absolute;
      display: none;
      top: 60px;
      right: 0;
      padding: 15px 10px;
      width: 170px;
      border-top: 1px solid $color-white;
      background: rgba(0, 0, 0, 0.9);
      &.show {
        display: block;
      }
    }
    &-line {
      border: none;
      border-top: 1px solid $header-link;
    }
    &-link {
      display: block;
      text-decoration: none;
      color: $header-link;
      @include font-size(14);
      &:hover {
        text-decoration: underline;
      }
    }
    &-menu {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
    &-img {
      border-radius: 5px;
      @include mq("tablet", max) {
        width: 25px;
      }
    }
    &-arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid $color-white;
    }
  }
}
.router-link-exact-active {
  color: $color-white;
  font-weight: 600;
  &:hover {
    color: $color-white;
  }
}
</style>
