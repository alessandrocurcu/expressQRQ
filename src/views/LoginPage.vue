<template>
  <div class="max-w-sm mx-auto mt-48 space-y-8">
    <div>
      <span>Username</span>
      <dx-text-box 
        v-model="username"
        placeholder="Username"
      />
    </div>
    <div>
      <span>Password</span>
      <dx-text-box 
        v-model="password"
        placeholder="Password"
        mode="password"
      />
    </div>
    <!-- <p class="text-sm">Forgot your password?</p>
    <p class="text-sm">Don't have an accout? Signup</p> -->
    <dx-button @click="onLoginIn" class="w-full" text="Login" type="default" styling-mode="outlined" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import DxTextBox from 'devextreme-vue/text-box';
  import DxButton from "devextreme-vue/button";
  
  const username = ref('');
  const password = ref('');
  const onLoginIn = () => {
    console.log('ciao')
  }
</script>