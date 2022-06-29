<template>
  <div v-if="id">
    <span @click="router.push({name: 'Home'});" class="flex items-center -ml-1 text-sm cursor-pointer text-sky-600"><ArrowLeft class="mr-1 text-xl" /> Back to patients</span>
    <div class="grid items-start grid-cols-12 gap-8 mt-8" style="grid-template-columns: min-content auto;">
      <div style="width: max-content" class="p-8 space-y-3 text-sm bg-white rounded-sm border border-gray-100 min-h-[400px]">
        <div>
          <span class="inline-block w-24 text-gray-500">name</span>
          <span class="whitespace-nowrap">{{patient.name}}</span>
        </div>
        <div>
          <span class="inline-block w-24 text-gray-500">gender</span>
          <span>{{patient.gender}}</span>
        </div>
      </div>
      <dx-data-grid
        style="width: calc(100vw - 358px);"
        class="text-sm"
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
        @toolbar-preparing="onToolbarPreparing($event)"
      >
        <DxMasterDetail
          :enabled="true"
          template="masterDetailTemplate"
        />
        <template #masterDetailTemplate="{ data: excercise }">
          <div class="mb-6 space-y-3">
            <p class="flex items-center"><span class="inline-block w-24 mr-4 text-gray-500">status</span><span class="flex items-center"><span class="mr-1 text-green-600" v-show="excercise.data.status === 'Completed'"><CheckCircle /></span>{{excercise.data.status}}</span><DxButton
              class="ml-auto text-base"
              text="signals"
              icon="chart"
            /></p>
            <p class="flex items-center" v-show="excercise.data.status === 'Completed'"><span class="inline-block w-24 mr-4 text-gray-500">completed at</span><span>{{excercise.data.completedAt}}</span></p>
          </div>
          <dx-data-grid
            class="text-sm"
            :data-source="excercise.data.surveys.data"
            :columns="columns2"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            :column-auto-width="true"
            :show-borders="true"
            :show-row-lines="true"
            :show-column-lines="true"
            :hover-state-enabled="true"
            :row-alternation-enabled="false"
          >

            <dx-paging :page-size="10"/>
            <dx-sorting mode="multiple" />
            <dx-filter-row :visible="true" />
            <dx-header-filter :visible="true" />
            <dx-load-panel :enabled="true" text="" :showPane="false" />
            <dx-pager :allowed-page-sizes="[5, 10]" :show-info="true" :show-navigation-buttons="true" :show-page-size-selector="true" />
          </dx-data-grid>
        </template>
        <template #tableTitle>
          <div class="flex items-center">
            <h2 class="mr-2 text-2xl text-gray-700">Exercises</h2>
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
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core';
import ArrowLeft from '@/components/ArrowLeft.vue';
import CheckCircle from '@/components/CheckCircle.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue';
import DxButton from "devextreme-vue/button";
import patients from '@/patients.json';
import {
  DxDataGrid,
  DxSearchPanel,
  DxSorting,
  DxFilterRow,
  DxLoadPanel,
  DxHeaderFilter,
  DxPager,
  DxPaging,
  DxMasterDetail,
} from "devextreme-vue/data-grid";
const baseUrl = 'http://hapi.fhir.org/baseR4';
const router = useRouter();

const props = defineProps({
  id: String,
})

const patientFromJson = patients.find(patient => patient.id === props.id);


const patient = ref({
  ...patientFromJson,
  "exercises": {
    "total": "4",
    "completed": "1",
    "data": [
      {
        "id": "77c84646-964b-4e44-87ae-097c83567d7f",
        "label": "Writing Ex 1",
        "status": "Completed",
        "submittedAt": "2022-04-11T20:07:23.822Z",
        "completedAt": "2022-04-11T20:07:23.822Z",
        "surveys": {
          "total": 2,
          "completed": 1,
          "data": [
            {
              "id": "a662da05-ff81-421a-bcf8-9310c96d7816",
              "label": "Logopedistic Survey Carvey",
              "status": "Completed",
              "submittedAt": "2022-04-11T20:07:23.822Z",
              "completedAt": "2021-06-29T20:43:34.649Z"
            },
            {
              "id": "2b0aee37-daba-4d0e-9e52-e8e703fa062e",
              "label": "Likert Scale Questionairre",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            }
          ]
        }
      },
      {
        "id": "8fcb4c38-311a-4ab6-8c9e-b80c802f8d68",
        "label": "Writing Ex 2",
        "status": "Unsubmitted",
        "submittedAt": null,
        "completedAt": null,
        "surveys": {
          "total": 2,
          "completed": 0,
          "data": [
            {
              "id": "a662da05-ff81-421a-bcf8-9310c96d7816",
              "label": "Logopedistic Survey Carvey",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            },
            {
              "id": "2b0aee37-daba-4d0e-9e52-e8e703fa062e",
              "label": "Likert Scale Questionairre",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            }
          ]
        }
      },
      {
        "id": "5dc061bc-9ed5-42ce-a80a-ce0daaa8b8bb",
        "label": "Writing Ex 3",
        "status": "Unsubmitted",
        "submittedAt": null,
        "completedAt": null,
        "surveys": {
          "total": 2,
          "completed": 0,
          "data": [
            {
              "id": "a662da05-ff81-421a-bcf8-9310c96d7816",
              "label": "Logopedistic Survey Carvey",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            },
            {
              "id": "2b0aee37-daba-4d0e-9e52-e8e703fa062e",
              "label": "Likert Scale Questionairre",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            }
          ]
        }
      },
      {
        "id": "141a5064-ed35-4e2d-9009-1f5378a3ae03",
        "label": "Writing Ex 4",
        "status": "Unsubmitted",
        "submittedAt": null,
        "completedAt": null,
        "surveys": {
          "total": 2,
          "completed": 0,
          "data": [
            {
              "id": "a662da05-ff81-421a-bcf8-9310c96d7816",
              "label": "Logopedistic Survey Carvey",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            },
            {
              "id": "2b0aee37-daba-4d0e-9e52-e8e703fa062e",
              "label": "Likert Scale Questionairre",
              "status": "Unsubmitted",
              "submittedAt": null,
              "completedAt": null
            }
          ]
        }
      },
    ]
  }  
});

const tableData = computed(() => {
  return patient.value.exercises.data
});

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
        caption: "Label",
        dataField: "label",
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
    ]
})

const columns2 = computed(() => {
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
        caption: "Label",
        dataField: "label",
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
        caption: "Submitted At",
        dataField: "submittedAt",
        allowSorting: true,
        allowHeaderFiltering: true,
        allowFiltering: true,
        dataType: "date",
        format: "MMM dd, HH:mm",
      },
      {
        caption: "Completed At",
        dataField: "completedAt",
        allowSorting: true,
        allowHeaderFiltering: true,
        allowFiltering: true,
        dataType: "date",
        format: "MMM dd, HH:mm",
      },
    ]
})

const onToolbarPreparing = (e) => {
  e.toolbarOptions.items.unshift(
    {
      location: "before",
      template: "tableTitle",
    }, 
  );
};



// onMounted(async () => {
//   const { isFetching, error, data } = await useFetch(baseUrl + '/Patient/' + props.id).json();
//   result.value = {...data.value, exercices: [{
//     id: '1',
//     name: 'Esercizio 1'
//   }]};
// })

</script>