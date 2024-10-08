<template>
    <div class="card" style="width: 18rem;margin-bottom: 10px;">
        <div class="card-body">
            <h5 class="card-title">Libelle : {{ task.libelle }}</h5>
            <p class="card-text">Heure début : {{ task.heureDeb }}</p>
            <p class="card-text">Heure de fin : {{ task.heureFin }}</p>
            <div v-show="isAffectation">
                <EmployeDetailsVue :employe="employe" @affectationTache="updateTasks" :emp_id_task="task.emp_id"/>
            </div>
            <div v-show="!isAffectation">
                <button class="btn btn-success" @click="() => deleteTasks(task.tache_id)">Supprimer</button>
            </div>
        </div>
  </div>
</template>

<script>
import EmployeDetailsVue from './EmployeDetails.vue';


export default {
    props: {
        task: {
            required: true
        },
        isAffectation: {
            required: true
        },
        employe: {
            required: true
        }
    },
    components: {
        EmployeDetailsVue
    },
    setup(props, context){
        /**
         * Fonction qui envoie un custom event vers le composant
         * parent TaskList, avec payload tache_id
         */
        const deleteTasks = (tacheId) =>{
            context.emit("deleteTask", tacheId);
        };

        /**
         * Fonction qui envoie un custom event vers le 
         * composant parent TaskList, avec payload employe_id
         */
        const updateTasks = (emp_id) => {
            const task_id = props.task.tache_id;
            context.emit("updateTasks",emp_id, task_id);
        };

        return {
            deleteTasks,
            updateTasks,
        }
    }
}
</script>

<style scoped>
button{
  margin-right: 5px;
  background-color: #42b983;
}
h5, p {
    font-family: "Montserrat", sans-serif;
}
</style>