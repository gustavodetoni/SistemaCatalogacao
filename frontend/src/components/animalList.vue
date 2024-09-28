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
          <img src="../assets/editar.png" class="botao" @click="abrirModalEdicao(animal)" />
          <img src="../assets/lixo.png" class="botao" @click="confirmarExclusao(animal.id)" />
        </div>
      </div>
    </div>
  </div>

  <div v-if="modalVisivel" class="modal-fundo" @click="fecharModal">
    <div class="modal-conteudo" @click.stop>
      <h2 class="modal-titulo">Editar Animal</h2>
      <form @submit.prevent="salvarEdicao" class="formulario">
        <div class="campo">
          <label for="nome">Nome:</label>
          <input id="nome" v-model="animalEditado.nome" type="text" />
        </div>
        <div class="campo">
          <label for="idade">Idade:</label>
          <input id="idade" v-model.number="animalEditado.idade" type="number" />
        </div>
        <div class="campo">
          <label for="peso">Peso:</label>
          <input id="peso" v-model.number="animalEditado.peso" type="number" />
        </div>
        <div class="campo">
          <label for="status">Status de Saúde:</label>
          <input id="status" v-model="animalEditado.status_de_saude" type="text" />
        </div>
        <div class="campo">
          <label for="habitat">Habitat:</label>
          <input id="habitat" v-model="animalEditado.habitat" type="text" />
        </div>
        <div class="campo">
          <label for="comportamento">Comportamento:</label>
          <input id="comportamento" v-model="animalEditado.comportamento" type="text" />
        </div>
        <div class="campo">
          <label for="dieta">Dieta:</label>
          <input id="dieta" v-model="animalEditado.dieta" type="text" />
        </div>
        <div class="campo">
          <label for="observacao">Observação:</label>
          <textarea id="observacao" v-model="animalEditado.observacao" rows="2"></textarea>
        </div>
      </form>
      <div class="botoes">
        <button type="submit" @click="salvarEdicao" class="botao botao-salvar">Salvar</button>
        <button type="button" @click="fecharModal" class="botao botao-cancelar">Cancelar</button>
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
      animalSelecionado: null,
      animalEditado: {},
      modalVisivel: false,
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
        const response = await axios.get('https://sistema-catalogacao-back-git-main-gustavo-detonis-projects.vercel.app/animais');
        this.animais = response.data;
        this.animaisFiltrados = [...this.animais];
        this.aplicarFiltros();
      } catch (error) {
        console.error(error);
      }
    },
    aplicarFiltros() {
      this.animaisFiltrados = this.animais.filter(animal => {
        const nomeCorresponde = !this.filtroNome || animal.nome.toLowerCase().startsWith(this.filtroNome.toLowerCase());
        const idadeCorresponde = !this.filtroIdade || animal.idade.toString().startsWith(this.filtroIdade); //Startswith-> para buscar pela primeira letra 
        const pesoCorresponde = !this.filtroPeso || animal.peso.toString().startsWith(this.filtroPeso);
        const habitatCorresponde = !this.filtroHabitat || animal.habitat === this.filtroHabitat;

        return nomeCorresponde && idadeCorresponde && pesoCorresponde && habitatCorresponde;
      });
    },
    confirmarExclusao(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este animal?");
    if (confirmacao) {
      this.excluirAnimal(id);
    }
  },
    async excluirAnimal(id) {
      try {
        await axios.delete(`https://sistema-catalogacao-back-git-main-gustavo-detonis-projects.vercel.app/animais/${id}`);
        await this.fetchAnimais();
        this.aplicarFiltros();
      } catch (error) {
        console.error(error);
      }
    },
    abrirModalEdicao(animal) {
      this.animalEditado = { ...animal };
      this.modalVisivel = true;
    },
    fecharModal() {
      this.modalVisivel = false;
    },
    async salvarEdicao() {
      try {
        await axios.put(`https://sistema-catalogacao-back-git-main-gustavo-detonis-projects.vercel.app/animais/${this.animalEditado.id}`, this.animalEditado);
        this.animalSelecionado = null;
        this.modalVisivel = false;
        await this.fetchAnimais();
      } catch (error) {
        console.error(error);
      }
    },
    cancelarEdicao() {
      this.animalSelecionado = null;
    },
  },
  mounted() {
    this.fetchAnimais();
  },
  watch: {
    filtroNome() {
      this.aplicarFiltros();
    },
    filtroIdade() {
      this.aplicarFiltros();
    },
    filtroPeso() {
      this.aplicarFiltros();
    },
    filtroHabitat() {
      this.aplicarFiltros();
    },
  },
};
</script>

<style>
@import '../styles/animalList.css';
</style>