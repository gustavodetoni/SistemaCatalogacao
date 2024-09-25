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

        <button class="botao-acao">
          Adicionar Animal
        </button>
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
        <button class="botao-acao-mobile">
            Adicionar Animal
        </button>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const itensMenu = [
    { nome: 'Início', link: '#' },
    { nome: 'Sobre', link: '#' },
  ]
  
  const menuMobileAberto = ref(false)
  
  const abrirMenuMobile = () => {
    menuMobileAberto.value = !menuMobileAberto.value
  }
  </script>
  
  <style scoped>
  .cabecalho {
    background: linear-gradient(to right, #1a202c, #2d3748);
    color: white;
    padding: 1rem;
    width: 100%; 
    position: fixed; 
    top: 0; 
    left: 0; 
    z-index: 1000; 
}
  
  .conteudo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .marca {
    display: flex;
    align-items: center;
  }
  
  
  .nome-marca {
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }
  
  .menu-desktop {
    gap: 10px;
    display: none;
  }
  
  @media (min-width: 768px) {
    .menu-desktop {
      display: flex;
    }
  }
  
  .link-menu {
    color: #e2e8f0;
    padding: 0.5rem 1rem;
    text-decoration: none;
    transition: background-color 0.3s;
    
  }
  
  .link-menu:hover {
    background-color: #4a5568;
    border-radius: 0.25rem;
  }
  
  .botao-acao {
    background-color: #4eafa4;
    color: white;
    padding: 0.5rem 1 rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .botao-acao:hover {
    background-color: #337162;
  }
  
  .botao-menu-mobile {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .botao-menu-mobile {
      display: none;
    }
  }
  
  .menu-mobile {
    background-color: #2d3748;
    padding: 1rem;
  }
  
  .link-menu-mobile {
    display: block;
    color: #e2e8f0;
    padding: 0.5rem 0;
    text-decoration: none;
  }
  
  .botao-acao-mobile {
    width: 100%;
    background-color: #4eafa4;
    color: white;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  </style>