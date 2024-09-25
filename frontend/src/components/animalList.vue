<template>
    <div class="container-lista">
      <h2 class="titulo">Lista de Animais</h2>
      <div class="lista-cards">
        <div v-for="animal in animais" :key="animal.id" class="card-animal">
          <h3 class="nome-animal">{{ animal.nome }}</h3>
          <div class="info-animal">
            <p><strong>Idade:</strong> {{ animal.idade }} anos</p>
            <p><strong>Peso:</strong> {{ animal.peso }}</p>
            <p><strong>Status de Saúde:</strong> {{ animal.statusSaude }}</p>
            <p><strong>Habitat:</strong> {{ animal.habitat }}</p>
            <p><strong>Comportamento:</strong> {{ animal.comportamento }}</p>
            <p><strong>Dieta:</strong> {{ animal.dieta }}</p>
            <p><strong>Observação:</strong> {{ animal.observacao }}</p>
          </div>
          <div class="acoes-animal">
            <button @click="editarAnimal(animal)" class="botao botao-editar">Editar</button>
            <button @click="excluirAnimal(animal.id)" class="botao botao-excluir">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        animais: [],
      };
    },
    methods: {
      async fetchAnimais() {
        try {
          const response = await axios.get('http://localhost:3000/animais');
          this.animais = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async deleteAnimal(id) {
        try {
          await axios.delete(`http://localhost:3000/animais/${id}`);
          this.fetchAnimais();
        } catch (error) {
          console.error(error);
        }
      },
      editAnimal(animal) {
        this.$emit('edit-animal', animal);
      },
    },
    mounted() {
      this.fetchAnimais();
    },
  };
  </script>

<style>
    @import '../styles/animalList.css';
</style>
  