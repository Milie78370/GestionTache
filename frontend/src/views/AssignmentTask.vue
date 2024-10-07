<template>
  <div class="affection">
    <h1></h1>
    <TaskList 
      :tasks="tasks" 
      :employe="employe"
      :isTacheAffected="isTacheAffected"
      :isAffectation="true"
      @deleteTaskFromList="deleteTasks"
      @updateTasks="updateTasks"
    />

  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    TaskList
  },
  setup() {
    let tasks = ref([]);
    const isAffectation = ref(true);
    let employe = ref([]);
    let isTacheAffected = ref("");
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

    const getAllUser = async () => {
      const response = await axios.get("http://localhost:4000/user/list");
      if(response.data.success){
        console.log("Marche", response.data.data);
        employe.value = response.data.data;
      } else {
        console.log("Error");
      }
    }

    onMounted(() => {
      getAllTasks();
      getAllUser();
    })

    const updateTasks = async (emp_id, task_id) => {
      const response = await axios.put("http://localhost:4000/task/update", {emp_id, task_id});
      if(response.data.success){
        tasks.value = response.data.data;
        getAllTasks();
      } else {
        console.log("Error");
      }
    }

    return {
      tasks,
      deleteTasks,
      isAffectation,
      employe,
      updateTasks,
      isTacheAffected
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
