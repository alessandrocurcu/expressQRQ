<template>
  <div v-if="result" class="grid grid-cols-12">
    <div class="col-span-8 overflow-y-auto bg-white">
      
      <dx-data-grid
        :data-source="tableData"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :show-borders="true"
        :show-row-lines="true"
        :show-column-lines="true"
        :hover-state-enabled="true"
        :row-alternation-enabled="false"
      >
    </dx-data-grid>
    </div>
    <div class="col-span-4 overflow-y-auto bg-white">
      <pre>
        <code class="text-xs">
          ciao {{result}}
        </code>
      </pre>
    </div>
    <div class="col-span-full">
      {{tableData}}
    </div>
  </div>
</template>

<script setup>
  import { useFetch } from '@vueuse/core';
  import { ref, onMounted } from 'vue';
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
  const baseUrl = 'http://hapi.fhir.org/baseR4';
  const result = ref(null);
  const tableData = ref([]);
  onMounted(async () => {
    const { isFetching, error, data } = await useFetch(baseUrl + '/Patient?_format=json').json();
    result.value = data.value.entry.map(el => ({
      id: el.resource.id, 
      name: el.resource.name?.[0]?.family ?? ''
    }));
    tableData.value = [...tableData.value, ...result.value]
  })
</script>