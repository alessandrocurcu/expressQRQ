<script setup>
import { ref } from "vue";
import TheLogo from "./components/TheLogo.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Patient from "./components/Patient.vue";



</script>

<template>
  <div class="max-w-6xl mx-auto">
    <TheLogo />
    <Patient />
    <HelloWorld />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
