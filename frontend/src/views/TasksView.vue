<template>
  <div class="task">
    <div class="radio-filters">
      <label for="libelle">
        <input type="radio" id="all" value="" v-model="choixFiltrage" />
        Toutes
      </label>
      <label for="libelle">
        <input type="radio" id="libelle" value="libelle" v-model="choixFiltrage" />
        Libelle
      </label>
      <label for="heureDeb">
        <input type="radio" id="heureDeb" value="heureDeb" v-model="choixFiltrage" />
        Heure de début
      </label>
      <label for="heureFin">
        <input type="radio" id="heureFin" value="heureFin" v-model="choixFiltrage" />
        Heure de fin
      </label>
    </div>
    <br />
    
    <h5>Trié par :</h5>
    <div class="radio-filters-trie">
      <label for="ordre croissant">
        <input type="radio" id="ordreCroissant" value="asc" v-model="modeDeTrie" />
        Ordre croissant
      </label>
      <label for="ordre decroissant">
        <input type="radio" id="ordreDecroissant" value="desc" v-model="modeDeTrie" />
        Ordre décroissant
      </label>
    </div>
    <hr>
    <TaskList :tasks="tasks" :isAffectation="isAffectation" @deleteTaskFromList="deleteTasks" />
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import TaskList from '../components/TaskList.vue'

export default {
  name: 'TaskView',
  components: {
    TaskList
  },
  setup() {
    let tasks = ref([]);
    const choixFiltrage = ref('');
    const modeDeTrie = ref('');
    let tasksFiltered = ref([]);
    const isAffectation = ref(false);

    /**
     * Appel du endpoint task list, pour récuperer toutes les tâches
     * Initialisation de tasks.value avec le tableau de données
     */
    const getAllTasks = async () => {
      const response = await axios.get(`http://localhost:4000/task/list`);
      if (response.data.success) {
        tasks.value = response.data.data;
        console.log('Recupération réussie');
      } else {
        console.log('Recupération echoue');
      }
    }

    /**
     * Appel du endpoint task remove, pour supprimer une tâches
     * 
     */
    const deleteTasks = async (tacheId) => {
      const taskRemove = {
        tache_id: tacheId
      };

      const response = await axios.post(`http://localhost:4000/task/remove`, taskRemove);
      if (response.data.success) {
        console.log('suppression de la tâche');
        getAllTasks();
      } else {
        console.log('Echoue de la tâche');
      }
    }

    onMounted(() => {
      getAllTasks()
    })

    /**
     * Fonction de filtrage par rapport aux valeurs des inputs (libelle, heureDeb, heureFin)
     * et du mode de trie (asc, desc)
     * @return void
     */
    const filtrageTask = () => {
      if (modeDeTrie.value === 'asc' && choixFiltrage.value === 'libelle') {
        tasksFiltered.value = tasks.value.sort((a, b) => a.libelle.localeCompare(b.libelle))
      } else if (modeDeTrie.value === 'asc' && choixFiltrage.value === 'heureDeb') {
        tasksFiltered.value = tasks.value.sort((a, b) => a.heureDeb.localeCompare(b.heureDeb))
      } else if (modeDeTrie.value === 'asc' && choixFiltrage.value === 'heureFin') {
        tasksFiltered.value = tasks.value.sort((a, b) => a.heureFin.localeCompare(b.heureFin))
      } else if (modeDeTrie.value === 'desc' && choixFiltrage.value === 'libelle') {
        tasksFiltered.value = tasks.value.sort((a, b) => b.libelle.localeCompare(a.libelle))
      } else if (modeDeTrie.value === 'desc' && choixFiltrage.value === 'heureDeb') {
        tasksFiltered.value = tasks.value.sort((a, b) => b.heureDeb.localeCompare(a.heureDeb))
      } else {
        tasksFiltered.value = tasks.value.sort((a, b) => b.heureFin.localeCompare(a.heureFin))
      }
    }

    /**
     * Mise en place de l'observateur qui va ecoute par rapport aux changements
     * de modeDeTrie si rien selectionnée on affiche tous sinon on trie
     */
    watch(modeDeTrie,(newValueModeDeTrie) => {
        if (newValueModeDeTrie !== '') {
          filtrageTask();
        } else {
          // sinon on affiche tous
          tasksFiltered.value = tasks.value;
          filtrageTask();
        }
      }
    )

    return {
      tasks,
      choixFiltrage,
      deleteTasks,
      tasksFiltered,
      modeDeTrie,
      filtrageTask,
      isAffectation
    }
  }
}
</script>

<style scoped>
.task {
  margin: 10px 15px;
}

label, input{
  margin-right: 10px;
}

h3{
  font-family: "Montserrat", sans-serif;
  font-style: italic;
}
</style>