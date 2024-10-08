<template>
    <div>
        <h3 v-show="isAffectation">Affectation de tâches : </h3>
        <h3 v-if="!isAffectation">Voir toutes les tâches : </h3>
        <div class="taskDetails">
            <TaskDetails 
                :task='task'
                :employe="employe" 
                :isAffectation="isAffectation" 
                v-for="task in tasks" 
                :key="task.tache_id" 
                @deleteTask="deleteTasks"
                @updateTasks="updateTasks"
            />
         </div>
    </div>
   
</template>

<script>
import TaskDetails from "../components/TaskDetails.vue"

export default {
    name: "TaskList",
    props: {
        tasks: {
            required: true
        },
        isAffectation: {
            required: true
        },
        employe: {
            required: false
        }

    },
    components: {
        TaskDetails,
    },
    setup(props, context) {
        /**
         * Fonction qui envoie un custom event vers la page
         * parent Assignment, avec payload tache_id
         */
        const deleteTasks = (tacheId) => {
            context.emit("deleteTaskFromList", tacheId);
        }

        /**
         * Fonction qui envoie un custom event vers la page
         * parent Assignment, avec payload tache_id, employe_id
         */
        const updateTasks = (emp_id, task_id) => {
            context.emit("updateTasks", emp_id, task_id);
        }

        return {
            deleteTasks,
            updateTasks
        }
    }
}
</script>

<style scoped>
.taskDetails{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
}
h3{
    font-family: "Montserrat", sans-serif;
}
</style>