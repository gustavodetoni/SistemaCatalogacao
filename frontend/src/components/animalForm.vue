<template>
    <div>
      <h2 v-if="isEditing">Editar Animal</h2>
      <h2 v-else>Criar Animal</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nome">Nome:</label>
          <input type="text" v-model="animal.nome" required />
        </div>
        <div>
          <label for="idade">Idade:</label>
          <input type="number" v-model="animal.idade" required />
        </div>
        <div>
          <label for="peso">Peso:</label>
          <input type="number" v-model="animal.peso" required />
        </div>
        <div>
          <label for="status_de_saude">Status de Saúde:</label>
          <input type="text" v-model="animal.status_de_saude" required />
        </div>
        <div>
          <label for="habitat">Habitat:</label>
          <input type="text" v-model="animal.habitat" required />
        </div>
        <div>
          <label for="comportamento">Comportamento:</label>
          <input type="text" v-model="animal.comportamento" required />
        </div>
        <div>
          <label for="dieta">Dieta:</label>
          <input type="text" v-model="animal.dieta" required />
        </div>
        <div>
          <label for="observacao">Observação:</label>
          <textarea v-model="animal.observacao" rows="3" required></textarea>
        </div>
        <button type="submit">{{ isEditing ? 'Atualizar' : 'Criar' }}</button>
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
  