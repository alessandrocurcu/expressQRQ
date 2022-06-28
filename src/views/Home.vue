<template>
  <div v-if="result" class="grid grid-cols-12">
    <div class="overflow-y-auto bg-white col-span-full">
      <dx-data-grid
        :data-source="tableData"
        :columns="columns"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :show-borders="true"
        :show-row-lines="true"
        :show-column-lines="true"
        :hover-state-enabled="true"
        :row-alternation-enabled="false"
        @row-click="selectRow"
        @toolbar-preparing="onToolbarPreparing($event)"
      >
      <template #exercisesColumnTemplate="{data}">
        <dx-progress-bar
          :min="0"
          :max="data.value.total"
          :status-format="(value) => `Completed: ${data.value.completed}/${data.value.total}`"
          :value="data.value.completed"
        />
      </template>
      <template #tableTitle>
        <div class="flex items-center">
          <h2 class="mr-2 text-3xl font-light text-slate-700">Patients</h2>
        </div>
      </template>
      <template  #action>
        <div style="margin-right: 6px;" class="inline-block">
          <dx-button icon="plus" text="New" type="default" styling-mode="outlined" />
        </div>
      </template>
      <dx-paging :page-size="10"/>
      <dx-search-panel :visible="true" :width="240" placeholder="Search..." />
      <dx-sorting mode="multiple" />
      <dx-filter-row :visible="true" />
      <dx-header-filter :visible="true" />
      <dx-load-panel :enabled="true" text="" :showPane="false" />
      <dx-pager :allowed-page-sizes="[5, 10]" :show-info="true" :show-navigation-buttons="true" :show-page-size-selector="true" />
    </dx-data-grid>
    </div>
    <!-- <div class="col-span-4 overflow-y-auto bg-white">
      <pre>
        <code class="text-xs">
          ciao {{result}}
        </code>
      </pre>
    </div>
    <div class="col-span-full">
      {{tableData}}
    </div> -->
  </div>
</template>

<script setup>
  import { useFetch } from '@vueuse/core';
  import { useRouter, useRoute } from 'vue-router'
  import { ref, onMounted, computed } from 'vue';
  import { DxProgressBar } from "devextreme-vue/progress-bar";
  import DxButton from "devextreme-vue/button";
  import {
    DxDataGrid,
    DxSearchPanel,
    DxSorting,
    DxFilterRow,
    DxLoadPanel,
    DxHeaderFilter,
    DxPager,
    DxPaging,
  } from "devextreme-vue/data-grid";
  const baseUrl = 'http://hapi.fhir.org/baseR4';
  const result = ref(null);
  const tableData = ref([]);
  const router = useRouter();
  const statuses = ['Idle', 'Waiting', 'Processing'];
  const columns = computed(() => {
    return [
      {
        caption: "Id",
        dataField: "id",
        allowSorting: false,
        allowHeaderFiltering: false,
        allowFiltering: false,
        visible: false,
      },
      {
        caption: "Name",
        dataField: "name",
        allowSorting: true,
        allowHeaderFiltering: false,
        allowFiltering: true,
      },
      {
        caption: "Status",
        dataField: "status",
        allowSorting: true,
        allowHeaderFiltering: true,
        allowFiltering: false,
      },
      {
        caption: "Exercises",
        dataField: "exercises",
        allowSorting: false,
        allowHeaderFiltering: false,
        allowFiltering: false,
        cellTemplate: "exercisesColumnTemplate",
      },
    ]
  })
  let onToolbarPreparing = (e) => {
    e.toolbarOptions.items.unshift(
      {
        location: "before",
        template: "tableTitle",
      },
      {
        location: "after",
        template: "action",
      }, 
    );
  };
  onMounted(async () => {
    const { isFetching, error, data } = await useFetch(baseUrl + '/Patient?_format=json').json();
    result.value = data.value.entry.map(el => {
      const max = Math.floor(Math.random() * 8);
      return {
        id: el.resource.id, 
        name: el.resource.name?.[0]?.family ?? '',
        status: statuses[Math.floor(statuses.length * Math.random())],
        exercises:  {
          completed: Math.floor(Math.random() * max),
          total: max
        }
      }
    });
    tableData.value = [...tableData.value, ...result.value]
  })

  let selectRow = (e) => {
    router.push({
      name: 'PatientDetail',
      params: {
        id: e.data.id
      }
    })
  }
</script>