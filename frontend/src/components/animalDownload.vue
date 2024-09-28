<template>
    <div class="container">
        <h1 class="titulo">Lista de Animais para Download</h1>
        <table class="tabela">
            <thead>
                <tr>
                    <th>Selecionar</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Peso</th>
                    <th>Status de Saúde</th>
                    <th>Habitat</th>
                    <th>Comportamento</th>
                    <th>Dieta</th>
                    <th>Observação</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="animal in animais" :key="animal.id" :class="{ 'selecionado': animal.selecionado }">
                    <td>
                        <input type="checkbox" :id="'animal-' + animal.id" v-model="animal.selecionado" class="checkbox-animal">
                    </td>
                    <td>{{ animal.nome }}</td>
                    <td>{{ animal.idade }}</td>
                    <td>{{ animal.peso }}</td>
                    <td>{{ animal.status_de_saude }}</td>
                    <td>{{ animal.habitat }}</td>
                    <td>{{ animal.comportamento }}</td>
                    <td>{{ animal.dieta }}</td>
                    <td>{{ animal.observacao }}</td>
                </tr>
            </tbody>
        </table>
        <button @click="baixarCSV" class="botao-baixar">Baixar Selecionados (CSV)</button>
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
        baixarCSV() {
            const animaisSelecionados = this.animais.filter(animal => animal.selecionado);
            const csvContent = [
                ["Nome", "Idade", "Peso", "Status de Saúde", "Habitat", "Comportamento", "Dieta", "Observação"],
                ...animaisSelecionados.map(animal => [
                    animal.nome,
                    animal.idade,
                    animal.peso,
                    animal.status_de_saude,
                    animal.habitat,
                    animal.comportamento,
                    animal.dieta,
                    animal.observacao
                ])
            ].map(e => e.join(",")).join("\n");
            //https://gist.github.com/dhunmoon/d743b327c673b589e7acfcbc5633ff4b
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "animais_selecionados.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        },
    },
    mounted() {
        this.fetchAnimais();
    },
}
</script>

<style>
@import '../styles/animalDownload.css';
</style>