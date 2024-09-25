<template>
    <div class="filtros">
      <input v-model="filtroNome" @input="aplicarFiltros" placeholder="Filtrar por nome" class="filtro-input">
      <input v-model.number="filtroIdade" @input="aplicarFiltros" type="number" placeholder="Filtrar por idade"
        class="filtro-input">
      <input v-model.number="filtroPeso" @input="aplicarFiltros" type="number" placeholder="Filtrar por peso"
        class="filtro-input">
      <select v-model="filtroHabitat" @change="aplicarFiltros" class="filtro-select">
        <option value="">Todos os habitats</option>
        <option v-for="habitat in habitatsUnicos" :key="habitat" :value="habitat">
          {{ habitat }}
        </option>
      </select>
    </div>
    <div class="container-lista">
    <h2 class="titulo"></h2>
    <div class="lista-cards">
      <div v-for="animal in animaisFiltrados" :key="animal.id" class="card-animal">
        <h3 class="nome-animal">{{ animal.nome }}</h3>
        <div class="info-animal">
          <p><strong>Idade:</strong> {{ animal.idade }} anos</p>
          <p><strong>Peso:</strong> {{ animal.peso }}</p>
          <p><strong>Status de Saúde:</strong> {{ animal.status_de_saude }}</p>
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
      animaisFiltrados: [],
      filtroNome: '',
      filtroIdade: null,
      filtroPeso: null,
      filtroHabitat: '',
    };
  },
  computed: {
    habitatsUnicos() {
      return [...new Set(this.animais.map(animal => animal.habitat))];
    },
  },
  methods: {
    async fetchAnimais() {
      try {
        const response = await axios.get('http://localhost:3000/animais');
        this.animais = response.data;
        this.animaisFiltrados = [...this.animais]; // Inicialize animaisFiltrados
        this.aplicarFiltros(); // Aplique os filtros inicialmente
      } catch (error) {
        console.error(error);
      }
    },
    aplicarFiltros() {
      this.animaisFiltrados = this.animais.filter(animal => {
        const nomeCorresponde = animal.nome.toLowerCase().includes(this.filtroNome.toLowerCase());
        const idadeCorresponde = !this.filtroIdade || animal.idade === Number(this.filtroIdade);
        const pesoCorresponde = !this.filtroPeso || animal.peso === Number(this.filtroPeso);
        const habitatCorresponde = !this.filtroHabitat || animal.habitat === this.filtroHabitat;

        return nomeCorresponde && idadeCorresponde && pesoCorresponde && habitatCorresponde;
      });
    },
    async excluirAnimal(id) {
      try {
        await axios.delete(`http://localhost:3000/animais/${id}`);
        await this.fetchAnimais(); // Use await aqui
        this.aplicarFiltros(); // Reaplique os filtros após excluir
      } catch (error) {
        console.error(error);
      }
    },
    editarAnimal(animal) {
      this.$emit('edit-animal', animal);
    },
  },
  mounted() {
    this.fetchAnimais();
  },
  watch: {
    // Adicione watchers para os filtros
    filtroNome() { this.aplicarFiltros(); },
    filtroIdade() { this.aplicarFiltros(); },
    filtroPeso() { this.aplicarFiltros(); },
    filtroHabitat() { this.aplicarFiltros(); },
  },
};
</script>

<style>
@import '../styles/animalList.css';
</style>