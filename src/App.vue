

<template>
  <div class="max-w-6xl mx-auto">
    <TheLogo />
    <!-- <router-link :to="{name: 'About'}">About</router-link> -->
    <router-view></router-view>
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
