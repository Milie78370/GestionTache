<template>
    <div class="card" style="width: 18rem;margin-bottom: 10px;">
        <div class="card-body">
            <h5 class="card-title">Libelle : {{ task.libelle }}</h5>
            <h6 class="card-text">HeureDeb : {{ task.heureDeb }}</h6>
            <p class="card-text">HeureFin : {{ task.heureFin }}</p>
            <div v-show="isAffectation">
                <EmployeDetailsVue :employe="employe" @affectationTache="updateTasks" :isTacheAffected="isTacheAffected"  :emp_id_task="task.emp_id"/>
            </div>
            <div v-show="!isAffectation">
                <button @click="editTask">Modifier</button>
                <button @click="() => deleteTasks(task.tache_id)">Supprimer</button>
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
        },
        isTacheAffected: {
            required: false
        }
    },
    components: {
        EmployeDetailsVue
    },
    setup(props, context){
        const deleteTasks = (tacheId) =>{
            context.emit("deleteTask", tacheId);
        }

        const updateTasks = (emp_id) => {
            const task_id = props.task.tache_id;
            context.emit("updateTasks",emp_id, task_id);
        }

       
        return {
            deleteTasks,
            updateTasks,
        }
    }
}
</script>

<style scoped>
button {
  margin-right: 5px;
}
</style>