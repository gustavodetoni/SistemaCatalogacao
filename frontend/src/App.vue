<template>
  <div id="app">
    <HeaderPrincipal />
    <main>
      <AnimalForm @form-submitted="fetchAnimais" :animalToEdit="animalToEdit" />
      <AnimalList @edit-animal="setAnimalToEdit" />
    </main>
  </div>
</template>

<script>
import AnimalList from './components/animalList.vue';
import AnimalForm from './components/animalForm.vue';
import HeaderPrincipal from './components/header.vue';

export default {
  components: {
    AnimalList,
    AnimalForm,
    HeaderPrincipal
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
