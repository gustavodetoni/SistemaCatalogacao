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
  data() {
    return {
      animalToEdit: null,
    };
  },
  methods: {
    setAnimalToEdit(animal) {
      this.animalToEdit = animal;
    },
    fetchAnimais() {
      this.animalToEdit = null; // Resetar animal a ser editado após a submissão do formulário
    },
  },
};
</script>

<style>
</style>
