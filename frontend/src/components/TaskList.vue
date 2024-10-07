<template>
    <div>
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
        },
    },
    components: {
        TaskDetails,
    },
    setup(props, context) {
        const deleteTasks = (tacheId) => {
            context.emit("deleteTaskFromList", tacheId);
        }

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

<style>

</style>