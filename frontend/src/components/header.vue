<template>
  <header class="cabecalho">
    <div class="conteudo">
      <div class="marca">
        <span class="nome-marca">Sistema de Catalogação</span>
      </div>

      <nav class="menu-desktop">
        <router-link v-for="item in itensMenu" :key="item.nome" :to="item.link" class="link-menu">
          {{ item.nome }}
        </router-link>

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
      <router-link to="/" class="link-menu-mobile">
        Catalogo
        </router-link>
      <router-link to="/download" class="link-menu-mobile">
          Download
        </router-link>
      <router-link to="/adicionar-animal" class="botao-acao-mobile">
          Adicionar Animal
        </router-link>
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