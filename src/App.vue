

<template>
  <div class="flex flex-col h-full">
    <nav class="flex items-center px-8 bg-gray-200">
      <TheLogo />
      <ul class="ml-8 space-x-10 text-sm font-medium text-gray-500">
        <router-link class="inline-block px-2 py-4" :to="{name: 'Home'}">patients</router-link>
        <router-link class="inline-block px-2 py-4" :to="{name: 'Questionnaires'}">questionnaires</router-link>
      </ul>
      <DxDropDownButton
        class="ml-auto"
        :items="['Log out']"
        :drop-down-options="{ width: 230 }"
        icon="user"
        stylingMode='text'
        text="Alessandro"
      />
      <!-- <DxToolbar :items="toolbarItems">
        <template #accountItem="{ data }">
          <div>
            ciao
          </div>
        </template>
      </DxToolbar>    -->
    </nav>
    <!-- <router-link :to="{name: 'About'}">About</router-link> -->
    <div class="flex-1 px-8 mt-12">
      <router-view>
      </router-view>
    </div>
    <div class="pb-12 text-center">
      <p class="text-sm font-light text-gray-500">Sbrex ©2022 - <span class="text-[10px]">pre-alpha 0.0.2</span></p>
    </div>
  </div>
</template>
<script setup>
  import TheLogo from "./components/TheLogo.vue";
  import { ref } from 'vue';
  import DxDropDownButton from 'devextreme-vue/drop-down-button';
  // import DxToolbar from 'devextreme-vue/toolbar';
  // const toolbarItems = ref([
  //   {
  //     location: 'before',
  //     widget: 'dxDropDownButton',
  //     options: {
  //       displayExpr: 'name',
  //       keyExpr: 'id',
  //       selectedItemKey: 3,
  //       width: 125,
  //       stylingMode: 'text',
  //       useSelectMode: true,
  //       onSelectionChanged: (e) => {
  //         console.log(e)
  //         // this.alignment = e.item.name.toLowerCase();
  //       },
  //       items: [{id: 1, label: 'log out'}],
  //     },
  //   },
  // ])
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-link-active {
  @apply text-gray-900;
  @apply border-b-2;
  @apply border-gray-900;
}
</style>
