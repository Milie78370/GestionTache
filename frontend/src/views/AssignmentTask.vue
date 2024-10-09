<template>
  <div class="affection">
    <h1></h1>
    <TaskList
      :tasks="tasks"
      :employe="employe"
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
    let dataTasks = ref([]);
    const isAffectation = ref(true);
    let employe = ref([]);
    let heureTotalTravailleEmp = ref([]);
    let horaireDeTravail = ref(0);

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
      }
      const response = await axios.post(`http://localhost:4000/task/remove`, taskRemove);
      if (response.data.success) {
        console.log('suppression de la tâche');
        getAllTasks(); // pour affichage des données
      } else {
        console.log('Echoue de la tâche');
      }
    }

    /**
     * Appel du endpoint user list, pour récupérer tous les employés 
     * Initialisation de employe.value avec le tableau de données
     */
    const getAllUser = async () => {
      const response = await axios.get('http://localhost:4000/user/list');
      if (response.data.success) {
        employe.value = response.data.data;
      } else {
        console.log('Error');
      }
    }

    /**
     * Appel du endpoint task getDataTask, pour récupérer les informations 
     * de la tâche selectionnée (emp_id, heureDeb, heureFin) 
     * Initialisation de dataTasks.value avec le tableau de données
     */
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

    /**
     * Appel du endpoint task updateTaskAxios, pour mettre à jour employe sur la
     * la tâche selectionnée
     * @param emp_id, task_id 
     * Initialisation de tasks.value avec le tableau de données
     */
    const updateTaskAxios = async (emp_id, task_id) => {
      try {
        const response = await axios.put('http://localhost:4000/task/update', { emp_id, task_id });
        if (response.data.success) {
          tasks.value = response.data.data;
          getAllTasks();
        } else {
          console.log('Error');
        }
      } catch (error) {
        throw new Error("Update task n'a pas marche");
      }
    }

     /**
     * Appel du endpoint task updateUserHeureTravail, pour mettre à jour temps de travail d'un employe
     * par rapport au temps de la tâche
     * @param heureTotal, emp_id 
     */
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

     /**
     * Appel du endpoint task getHeureTravailForEmp, pour récupérer le temps de travail d'un employe
     * @param heureTotal, emp_id 
     */
    const getHeureTravailForEmp = async (emp_id) => {
      try {
        const response = await axios.post(`http://localhost:4000/user/getHeureTravailForEmp`, {
          emp_id
        });
        if (response.data.success) {
          heureTotalTravailleEmp.value = response.data.data;
          console.log('Recupération réussie');
        } else {
          console.log('Recupération echoue');
        }
      } catch (error) {
        throw new Error('Error recuperation heure de travail total');
      }
    }

    /**
     * Appel de la fonction onMounted 
     * (faisant partie du cycle de vie vue)
     * Appel de la fonction getAllTasks et getAllUser
     */
    onMounted(() => {
      getAllTasks();
      getAllUser();
    })

    /**
     * Fonction qui affecte une tâche à un employe
     * @param emp_id et task_id prend l'id de l'employe selectionné et la tache
     * @returns void
     */
    const updateTasks = async (emp_id, task_id) => {
      try {
        let taskDetail = {};

        //Récupération des informations sur la tâche selectionnée (emp_id, heureDeb, heureFin)
        await getDataFromTasks(task_id);

        //Récupération des informations dans le tableau
        dataTasks.value.forEach((obj) => {
          taskDetail = Object.values(obj);
        })

        //Calcule du nombre d'heure pour une tâche par rapport à heureDebut et heureFin
        const nombreTotalHeure = calculeNombreHeure(taskDetail[1], taskDetail[2]);
        // Vérification des contraintes
        await checkValidAffectation(emp_id, taskDetail, nombreTotalHeure);
        
        // Si la vérification est bon, on update la tache avec l'employe id
        // et on update le temps de travail de l'employe avec la tâche
        await updateTaskAxios(emp_id, task_id);
        await updateUserHeureTravail(horaireDeTravail.value, emp_id);
      } catch (error) {
        throw new Error(error);
      }
    }

    /**
     * Fonction de conversion du temps en minute
     * return les temps en minutes
     */
    function getMinute(temps) {
      const [heure, minute] = temps.split(':')
      return parseInt(heure) * 60 + parseInt(minute)
    }

    /**
     * Fonction calcule nombre heure d'une tache 
     * converti en minute
     * @param heureDeb, heureFin
     * @returns Renvoie le nombre total de minutes entre deux plages
     */
    const calculeNombreHeure = (heureDeb, heureFin) => {
      const tempsDeb = getMinute(heureDeb);
      const tempsFin = getMinute(heureFin);

      let totalMinutes = 0;
      //Si la tâche commence tard dans la soirée et se finit le lendemain alors pour éviter d' avoir un nombre négatif on soustrait (24*60) = 1440 - début + fin.
      if (tempsFin < tempsDeb) {
        totalMinutes = 1440 - tempsDeb + tempsFin;
      } else {
        totalMinutes = tempsFin - tempsDeb;
      }

      return totalMinutes;
    }

    /**
     * Fonction de vérification des contraintes
     * Une tâche ne peut pas être prise dans les mêmes creneaux horaires
     * Un employe ne peut pas travailler plus de huits heures
     * @param emp_id (employe id), taskDetail(detail de la tâche), 
     * nombreTotalHeure(durée que reprensente la tâche convertie en minute)
     */
    const checkValidAffectation = async (emp_id, taskDetail, nombreTotalHeure) => {
      let heureTotalEmp = {};

      // vérification de l'existence d'une tâche 
      // ayant le même plage d'horaire pour un employe particulier
      const creaneauDejaPris = tasks.value.filter(
        (element) =>
          element.heureDeb === taskDetail[1] &&
          element.heureFin === taskDetail[2] &&
          element.emp_id === emp_id
      )

      //Récupération du temps de travail de l'employe
      await getHeureTravailForEmp(emp_id);

      heureTotalTravailleEmp.value.forEach((obj) => {
        heureTotalEmp = Object.values(obj);
      });
      // la somme de temps de travail de l'employe + le temps que prendra la tache
      horaireDeTravail.value = (heureTotalEmp[0] + nombreTotalHeure);

      if (creaneauDejaPris.length === 1) {
        throw new Error(
          `Attention vous avez déjà une tâche à ce creneaux ${taskDetail[1]} - ${taskDetail[2]}`
        )
      } else if ( horaireDeTravail.value > 480) { //si la somme est supérieur a 480 min (8*60)
        throw new Error('Vous ne pouvez pas travailler plus de huit heure')
      }
    }

    return {
      tasks,
      deleteTasks,
      isAffectation,
      employe,
      updateTasks,
      checkValidAffectation,
      dataTasks
    }
  }
}
</script>


<style scoped>
.affection {
  margin: 10px 15px;
}
</style>
