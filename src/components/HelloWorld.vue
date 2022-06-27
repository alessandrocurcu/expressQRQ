<template>
  <div class="max-w-xl mx-auto">
    <h4>prova</h4>
    <Suspense>
      <template #default>
        <div v-if="data" class="grid grid-cols-12">
          <div class="col-span-6 p-4 overflow-y-auto bg-white">
            <pre>
              <code class="text-xs">
                {{data}}
              </code>
            </pre>
          </div>
          <div class="col-span-6 p-4 overflow-y-auto bg-white">
            <pre>
              <code class="text-xs">
                ciao {{data3}}
              </code>
            </pre>
          </div>
        </div>   
      </template>
      <template #fallback>
        <p>loading</p>
      </template>
    </Suspense>
    <!-- <dx-data-grid
      :data-source="tableData"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
      :show-row-lines="true"
      :show-column-lines="true"
      :hover-state-enabled="true"
      :row-alternation-enabled="false"
      @row-click="rowClick"
    >
    </dx-data-grid> -->
  </div>
</template>
<script setup>
  import {
    DxDataGrid,
    DxSearchPanel,
    DxSorting,
    DxExport,
    DxFilterRow,
    DxLoadPanel,
    DxHeaderFilter,
    DxPager,
    DxColumnFixing,
  } from "devextreme-vue/data-grid";
  import { useFetch } from '@vueuse/core'
  import { ref, unref } from 'vue';

  let rowClick = (e) => {
    console.log('ciao', e);
    // this.$router({name: 'Patient', params: {id: e.data.id}})

  }
  const baseUrl = 'http://hapi.fhir.org/baseR4';
  const { isFetching, error, data } = await useFetch(baseUrl + '/Patient').json();
  // const data3 = ref(2)


  let tableData = [
    {
      id: 1,
      name: 'Ale'
    },
    {
      id: 2,
      name: 'Giorgio'
    },
    {
      id: 3,
      name: 'Claudia'
    },
  ]
  // defineProps(['title'])
</script>
