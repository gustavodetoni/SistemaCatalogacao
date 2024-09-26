<template>
    <header class="cabecalho">
      <div class="conteudo">
        <div class="marca">
          <span class="nome-marca">Sistema de Catalogação</span>
        </div>
  
        <nav class="menu-desktop">
          <a v-for="item in itensMenu" :key="item.nome" :href="item.link" class="link-menu">
            {{ item.nome }}
          </a>

          <router-link to="/adicionar-animal" class="botao-acao">
          Adicionar Animal
        </router-link>
        </nav>
  
        <button @click="abrirMenuMobile" class="botao-menu-mobile">
          <span v-if="!menuMobileAberto">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
  
      <div v-if="menuMobileAberto" class="menu-mobile">
        <a v-for="item in itensMenu" :key="item.nome" :href="item.link" class="link-menu-mobile">
          {{ item.nome }}
        </a>
        <button class="botao-acao-mobile" @click="irParaAdicionarAnimal">
            Adicionar Animal
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  
  const router = useRouter(); 

  const itensMenu = [
    { nome: 'Catalogo', link: '/' },
    { nome: 'Download', link: '/download' },
  ]
  
  const menuMobileAberto = ref(false)
  
  const abrirMenuMobile = () => {
    menuMobileAberto.value = !menuMobileAberto.value
  }

  
  </script>
  
  <style>
  @import '../styles/header.css';
  </style>