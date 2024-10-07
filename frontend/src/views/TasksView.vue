<template>
  <div>
    <div class="radio-filters">
      <label for="libelle">
        <input type="radio" id="all" value="" v-model="choixFiltrage" />
        Toutes
      </label>
      <label for="libelle">
        <input type="radio" id="libelle" value="libelle" v-model="choixFiltrage" />
        libelle
      </label>
      <label for="heureDeb">
        <input type="radio" id="heureDeb" value="heureDeb" v-model="choixFiltrage" />
        heure de début
      </label>
      <label for="heureFin">
        <input type="radio" id="heureFin" value="heureFin" v-model="choixFiltrage" />
        heure de fin
      </label>
    </div>
    <br />
    
    <h3>Trié par :</h3>
    <div class="radio-filters-trie">
      <label for="ordre croissant">
        <input type="radio" id="ordreCroissant" value="asc" v-model="modeDeTrie" />
        ordre croissant
      </label>
      <label for="ordre decroissant">
        <input type="radio" id="ordreDecroissant" value="desc" v-model="modeDeTrie" />
        ordre décroissant
      </label>
    </div>
    
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

    const getAllTasks = async () => {
      const response = await axios.get(`http://localhost:4000/task/list`)
      if (response.data.success) {
        tasks.value = response.data.data
        console.log('Recupération réussie')
      } else {
        console.log('Recupération echoue')
      }
    }

    const deleteTasks = async (tacheId) => {
      const taskRemove = {
        tache_id: tacheId
      }
      const response = await axios.post(`http://localhost:4000/task/remove`, taskRemove)
      if (response.data.success) {
        console.log('suppression de la tâche')
        getAllTasks()
      } else {
        console.log('Echoue de la tâche')
      }
    }

    onMounted(() => {
      getAllTasks()
    })

    const editTask = () => {}

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

    watch(modeDeTrie,(newValueModeDeTrie, oldValueChoixFiltrage) => {
        console.log('newValue: ', newValueModeDeTrie, 'oldValue: ', oldValueChoixFiltrage)
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
      editTask,
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
  border: 3px solid #42b983;
  border-radius: 5px;
}
</style>