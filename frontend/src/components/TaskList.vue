<template>
    <div>
        <TaskDetails :task='task' :isAffectation="isAffectation" v-for="task in tasks" :key="task.tache_id" @deleteTask="deleteTasks"/>
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
        }
    },
    components: {
        TaskDetails,
    },
    setup(props, context) {
        const deleteTasks = (tacheId) => {
            console.log("id",tacheId);
            context.emit("deleteTaskFromList", tacheId);
        }
        return {
            deleteTasks
        }
    }
}
</script>

<style>

</style>