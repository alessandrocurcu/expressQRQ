<template>
  <div v-if="id">
    <span @click="router.push({name: 'Home'});" class="flex items-center text-sm cursor-pointer text-sky-600"><ArrowLeft class="mr-1 text-xl" /> Back to patients</span>
    {{id}}
    {{result}}
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core';
import ArrowLeft from '@/components/ArrowLeft.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
const baseUrl = 'http://hapi.fhir.org/baseR4';
const router = useRouter();
const result = ref(null);
const props = defineProps({
  id: String,
})

onMounted(async () => {
  const { isFetching, error, data } = await useFetch(baseUrl + '/Patient/' + props.id).json();
  result.value = {...data.value, exercices: [{
    id: '1',
    name: 'Esercizio 1'
  }]};
})

</script>