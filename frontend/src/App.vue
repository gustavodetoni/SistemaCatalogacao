<template>
  <div id="app">
    <HeaderPrincipal />
    <router-view />
  </div>
</template>
<script>
import AnimalList from './components/animalList.vue';
import AnimalForm from './components/animalForm.vue';
import HeaderPrincipal from './components/header.vue';
import AnimalDownload from './components/animalDownload.vue';

export default {
  components: {
    HeaderPrincipal,
    AnimalList,
    AnimalForm,
    AnimalDownload,
  },
};
</script>
