

<template>
  <div class="max-w-6xl px-8 mx-auto">
    <TheLogo />
    <!-- <router-link :to="{name: 'About'}">About</router-link> -->
    <div class="mt-16">
      <router-view>
      </router-view>
    </div>
  </div>
</template>
<script setup>
import TheLogo from "./components/TheLogo.vue";
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
