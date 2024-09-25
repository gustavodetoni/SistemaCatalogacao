<template>
  <div class="container">
    <h2>{{ isEditing ? 'Editar Animal' : 'Criar Animal' }}</h2>
    <form @submit.prevent="enviarFormulario">
      <div class="campo">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="animal.nome" required />
      </div>
      <div class="campo">
        <label for="idade">Idade:</label>
        <input type="number" id="idade" v-model="animal.idade" required />
      </div>
      <div class="campo">
        <label for="peso">Peso:</label>
        <input type="number" id="peso" v-model="animal.peso" required />
      </div>
      <div class="campo">
        <label for="status_de_saude">Status de Saúde:</label>
        <input type="text" id="status_de_saude" v-model="animal.status_de_saude" required />
      </div>
      <div class="campo">
        <label for="habitat">Habitat:</label>
        <input type="text" id="habitat" v-model="animal.habitat" required />
      </div>
      <div class="campo">
        <label for="comportamento">Comportamento:</label>
        <input type="text" id="comportamento" v-model="animal.comportamento" required />
      </div>
      <div class="campo">
        <label for="dieta">Dieta:</label>
        <input type="text" id="dieta" v-model="animal.dieta" required />
      </div>
      <div class="campo">
        <label for="observacao">Observação:</label>
        <textarea id="observacao" v-model="animal.observacao"></textarea>
      </div>
      <button @click="submitForm" type="submit">{{ isEditing ? 'Atualizar' : 'Criar' }}</button>
    </form>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
    return {
      isEditing: false,
      animal: {
        nome: '',
        idade: '',
        peso: '',
        status_de_saude: '',
        habitat: '',
        comportamento: '',
        dieta: '',
        observacao: '',
      },
    };
  },
    methods: {
      async submitForm() {
        if (this.isEditing) {
          await axios.put(`http://localhost:3000/animais/${this.animalToEdit.id}`, this.animal);
        } else {
          await axios.post('http://localhost:3000/animais', this.animal);
        }
        this.$emit('form-submitted');
        this.resetForm();
      },
      resetForm() {
        this.animal = { nome: '', idade: null, peso: null };
        this.isEditing = false;
      },
    },
    watch: {
      animalToEdit: {
        immediate: true,
        handler(newAnimal) {
          if (newAnimal) {
            this.animal = { ...newAnimal };
            this.isEditing = true;
          } else {
            this.resetForm();
          }
        },
      },
    },
  };
  </script>

<style>
    @import '../styles/animalForm.css';
</style>
  