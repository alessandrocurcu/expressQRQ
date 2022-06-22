<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import DxButton from 'devextreme-vue/button';
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const count = ref(0);
</script>

<template>
  <p>count: {{count}}</p>
  <DxButton
    text="Click me"
    @click="count++"
  />
  <img alt="Vue logo"  src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
