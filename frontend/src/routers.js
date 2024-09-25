import { createRouter, createWebHistory } from 'vue-router';
import AnimalList from './components/animalList.vue';
import AnimalForm from './components/animalForm.vue';

const routes = [
  {
    path: '/', 
    name: 'AnimalList',
    component: AnimalList,
  },
  {
    path: '/adicionar-animal',
    name: 'AdicionarAnimal',
    component: AnimalForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
