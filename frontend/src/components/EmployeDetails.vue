<template>
  <div>
    <div>
      <div v-show="task_emp.emp_id" v-for="task_emp in isTacheAffected" :key="task_emp.emp_id">
        <p>La tâche est affectée :{{ emp_id_task }} {{ task_emp.nom }}</p>
      </div>
      <select v-model="emp_id">
        <option
          v-for="emp in employe"
          :key="emp.emp_id"
          :value="emp.emp_id"
          :selected="emp.emp_id === emp.emp_id"
        >
          <p>{{ emp.nom }}</p>
        </option>
      </select>
      <button @click="() => updateTasks(emp_id)">Confirmer</button>
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
    isTacheAffected: {
      required: true
    },
    emp_id_task: {
      required: false
    }
  },
  setup(props, context) {
    let emp_id = ref('')

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

<style>
</style>