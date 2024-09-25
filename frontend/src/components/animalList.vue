<template>
    <div>
      <h2>Lista de Animais</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Peso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in animais" :key="animal.id">
            <td>{{ animal.nome }}</td>
            <td>{{ animal.idade }}</td>
            <td>{{ animal.peso }}</td>
            <td>
              <button @click="editAnimal(animal)">Editar</button>
              <button @click="deleteAnimal(animal.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
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
          this.fetchAnimais(); // Recarrega a lista após a exclusão
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
  