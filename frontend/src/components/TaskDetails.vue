<template>
    <div class="card" style="width: 18rem;margin-bottom: 10px;">
        <div class="card-body">
            <h5 class="card-title">Libelle : {{ task.libelle }}</h5>
            <h6 class="card-text">HeureDeb : {{ task.heureDeb }}</h6>
            <p class="card-text">HeureFin : {{ task.heureFin }}</p>
            <div v-show="isAffectation">
                <select>
                    <option value=""></option>
                </select>
                <button @click="() => updateTasks()">Confirmer</button>
            </div>
            <div v-show="!isAffectation">
                <button @click="editTask">Modifier</button>
                <button @click="() => deleteTasks(task.tache_id)">Supprimer</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        task: {
            required: true
        },
        isAffectation: {
            required: true
        }
    },
    setup(props, context){
        const deleteTasks = (tacheId) =>{
            context.emit("deleteTask", tacheId);
        }
        return {
            deleteTasks
        }
    }
}
</script>

<style scoped>
button {
  margin-right: 5px;
}
</style>