<template>
  <div>
    <div>
      <p >La tâche est affectée : </p>
      <select v-model="emp_id">
        <option v-for="emp in employe" :key="emp.emp_id" :value="emp.emp_id" :selected="emp.emp_id === emp.emp_id">
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