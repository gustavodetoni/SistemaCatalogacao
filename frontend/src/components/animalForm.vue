<template>
  <div class="container-formulario">
    <h2 class="titulo">Adicionar Novo Animal</h2>
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
        <input type="text" id="status_de_saude" v-model="animal.status_de_saude" required />
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
        <textarea id="observacao" v-model="animal.observacao" rows="2"></textarea>
      </div>
      <div class="grupo-campo-botao">
          <button type="submit" class="botao-enviar">
            Cadastrar
          </button>
          <button @click="resetForm" type="submit" class="botao-limpar">Limpar</button>
      </div>
    </form>
  </div>
  <div v-if="popupVisivel" class="popup">
    <p>Animal adicionado com sucesso!</p>
    <button @click="fecharPopup">Fechar</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
      popupVisivel: false,
    };
  },
  methods: {
    async enviarFormulario() {
      if (
      !this.animal.nome ||
      !this.animal.idade ||
      !this.animal.peso ||
      !this.animal.status_de_saude ||
      !this.animal.habitat ||
      !this.animal.comportamento ||
      !this.animal.dieta
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
      try {
        await axios.post('http://localhost:3000/animais', this.animal);
        this.popupVisivel = true;
        this.resetForm();
      } catch (error) {
        if (error.response.status === 400) {
        alert('Usuário já existe, digite outro.');
        this.resetForm();
      } else {
        console.error('Erro ao adicionar animal:', error);
      }
      }
    },
    resetForm() {
      this.animal = {
        nome: '',
        idade: null,
        peso: null,
        status_de_saude: '',
        habitat: '',
        comportamento: '',
        dieta: '',
        observacao: ''
      };
    },
    fecharPopup() {
      this.popupVisivel = false;
    },
  },
};
</script>

<style>
@import '../styles/animalForm.css';
</style>