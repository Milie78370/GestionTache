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
    let tasks = ref([])
    let dataTasks = ref([])
    const isAffectation = ref(true)
    let employe = ref([])
    let isTacheAffected = ref([])
    let heureTotalTravailleEmp = ref([])
    let horaireDeTravail = ref(0)


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
      const response = await axios.get('http://localhost:4000/user/list')
      if (response.data.success) {
        console.log('Marche', response.data.data)
        employe.value = response.data.data
      } else {
        console.log('Error')
      }
    }

    onMounted(() => {
      getAllTasks()
      getAllUser()
    })

    const updateTasks = async (emp_id, task_id) => {
      try {
        await getDataFromTasks(task_id);
        let taskDetail = {};
        dataTasks.value.forEach((obj) => {
          taskDetail = Object.values(obj);
        })
      
        const nombreTotalHeure = calculeNombreHeure(taskDetail[1], taskDetail[2]);
        await checkValidAffectation(emp_id, taskDetail, nombreTotalHeure);
        
        await updateTaskAxios(emp_id, task_id);
        await updateUserHeureTravail(horaireDeTravail.value, emp_id);
        await getNomEmp(emp_id);
      } catch (error) {
        throw new Error(error)
      }
    }

    const updateTaskAxios = async (emp_id, task_id) => {
      try {
        const response = await axios.put('http://localhost:4000/task/update', { emp_id, task_id })
        if (response.data.success) {
          tasks.value = response.data.data
          getAllTasks()
        } else {
          console.log('Error')
        }
      } catch (error) {
        throw new Error("Update task n'a pas marche")
      }
    }

    const updateUserHeureTravail = async (heureTotal, emp_id) => {
      try {
        const response = await axios.put('http://localhost:4000/user/update', {
          heureTotal,
          emp_id
        })
        if (response.data.success) {
          console.log('marche bien')
        } else {
          console.log('Error')
        }
      } catch (error) {
        throw new Error("Update user n'a pas marche")
      }
    }

    const getDataFromTasks = async (task_id) => {
      try {
        const response = await axios.post('http://localhost:4000/task/getDataTask', { task_id })
        if (response.data.success) {
          dataTasks.value = response.data.data
        }
      } catch (error) {
        throw new Error('Recuperer des champs heureDeb, heureFin a echoue')
      }
    }

    const getNomEmp = async (emp_id) => {
      try {
        const response = await axios.post('http://localhost:4000/user/getNomEmp', { emp_id })
        if (response.data.success) {
          isTacheAffected.value = response.data.data;
          console.log(isTacheAffected);
        }
      } catch (error) {
        throw new Error('Recuperer des champs heureDeb, heureFin a echoue')
      }
    }

    function getMinute(temps) {
      const [heure, minute] = temps.split(':')
      return parseInt(heure) * 60 + parseInt(minute)
    }

    const calculeNombreHeure = (heureDeb, heureFin) => {
      const debut = getMinute(heureDeb)
      const fin = getMinute(heureFin)
      let totalMinutes = 0
      if (fin < debut) {
        totalMinutes = 1440 - debut + fin
      } else {
        totalMinutes = fin - debut
      }

      return totalMinutes
    }

    const getHeureTravailForEmp = async (emp_id) => {
      try {
        const response = await axios.post(`http://localhost:4000/user/getHeureTravailForEmp`, {
          emp_id
        })
        if (response.data.success) {
          heureTotalTravailleEmp.value = response.data.data
          console.log('Recupération réussie')
        } else {
          console.log('Recupération echoue')
        }
      } catch (error) {
        throw new Error('Error recuperation heure de travail total')
      }
    }

    const checkValidAffectation = async (emp_id, taskDetail, nombreTotalHeure) => {
      let heureTotalEmp = {};
      const creaneauDejaPris = tasks.value.filter(
        (element) =>
          element.heureDeb === taskDetail[1] &&
          element.heureFin === taskDetail[2] &&
          element.emp_id === emp_id
      )

      await getHeureTravailForEmp(emp_id);

      heureTotalTravailleEmp.value.forEach((obj) => {
        heureTotalEmp = Object.values(obj);
      });

      horaireDeTravail.value = (heureTotalEmp[0] + nombreTotalHeure);

      if (creaneauDejaPris.length === 1) {
        throw new Error(
          `Attention vous avez déjà une tâche à ce creneaux ${taskDetail[1]} - ${taskDetail[2]}`
        )
      } else if (  horaireDeTravail.value > 480) {
        throw new Error('Vous ne pouvez pas travailler plus de huit heure')
      }
    }

    return {
      tasks,
      deleteTasks,
      isAffectation,
      employe,
      updateTasks,
      isTacheAffected,
      checkValidAffectation,
      dataTasks
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
