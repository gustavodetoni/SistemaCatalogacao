<template>
  <div class="container-formulario">
    <h2 class="titulo">{{ isEditing ? 'Editar Animal' : 'Adicionar Novo Animal' }}</h2>
    <form @submit.prevent="enviarFormulario" class="formulario">
      <div class="grupo-campo">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="animal.nome" required />
      </div>
      <div class="grupo-campo">
        <label for="idade">Idade:</label>
        <input type="number" id="idade" v-model="animal.idade" required />
      </div>
      <div class="grupo-campo">
        <label for="peso">Peso (kg):</label>
        <input type="number" id="peso" v-model="animal.peso" step="0.1" required />
      </div>
      <div class="grupo-campo">
        <label for="status_de_saude">Status de Saúde:</label>
        <select id="status_de_saude" v-model="animal.status_de_saude" required>
          <option value="Saudável">Saudável</option>
          <option value="Em tratamento">Em tratamento</option>
          <option value="Crítico">Crítico</option>
        </select>
      </div>
      <div class="grupo-campo">
        <label for="habitat">Habitat:</label>
        <input type="text" id="habitat" v-model="animal.habitat" required />
      </div>
      <div class="grupo-campo">
        <label for="comportamento">Comportamento:</label>
        <input type="text" id="comportamento" v-model="animal.comportamento" required />
      </div>
      <div class="grupo-campo">
        <label for="dieta">Dieta:</label>
        <input type="text" id="dieta" v-model="animal.dieta" required />
      </div>
      <div class="grupo-campo">
        <label for="observacao">Observação:</label>
        <textarea id="observacao" v-model="animal.observacao" rows="3"></textarea>
      </div>
      <button @click="enviarFormulario" type="submit" class="botao-enviar">
        {{ isEditing ? 'Atualizar' : 'Adicionar' }} Animal
      </button>
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
      async enviarFormulario() {
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
  