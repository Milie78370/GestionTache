<template>
  <div>
    <div>
      <div v-show="emp.emp_id == emp_id_task" v-for="emp in employe" :key="emp.emp_id">
        <p>La tâche est affectée : <strong>{{ emp.nom }}</strong></p>
      </div>
      <select class="custom-select" v-model="emp_id">
        <option
          v-for="emp in employe"
          :key="emp.emp_id"
          :value="emp.emp_id"
        >
        {{ emp.nom }}
        </option>
      </select>
      <button class="btn btn-success" @click="() => updateTasks(emp_id)">Confirmer</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    employe: {
      required: true
    },
    emp_id_task: {
      required: false
    }
  },
  setup(props, context) {
    let emp_id = ref('')

    /**
     * Fonction qui a pour seul objectif d'emettre un custom event vers
     * le composant parent TaskDetails, le payload est l'employe id
     */
    const updateTasks = (emp_id) => {
      context.emit('affectationTache', emp_id)
    }

    return {
      emp_id,
      updateTasks
    }
  }
}
</script>

<style scoped>
button{
  margin-left: 50px;
  background-color: #42b983;
}
p {
  font-family: "Montserrat", sans-serif;
}
.custom-select{
  width: 85px;
}
</style>