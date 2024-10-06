<template>
  <div>
    <h3>Créer une tâche</h3>
    <form @submit.prevent="createTask">
      <input type="text" placeholder="Libelle" v-model="libelle" ref="txtName" />
      <input type="time" placeholder="heure de debut" v-model="heureDeb" />
      <input type="time" placeholder="heure de fin" v-model="heureFin" />
      <button :disabled="!isValidForm">Confirmer</button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
export default {
  setup(props, context) {
    const libelle = ref('')
    const heureDeb = ref('')
    const heureFin = ref('')
    let txtName = ref(null)

    const isValidForm = computed(() => {
      if (libelle.value !== '' && heureDeb.value !== '' && heureFin.value !== '') {
        return true
      }
      return false
    })

    function resetForm() {
      libelle.value = ''
      heureDeb.value = ''
      heureFin.value = ''
    }

    function createTask() {
      const tasks = {
        libelle: libelle.value,
        heureDeb: heureDeb.value,
        heureFin: heureFin.value
      }
      context.emit('createTask', tasks)
      resetForm()
    }

    onMounted(() => {
      txtName.value.focus();
    })

    return {
      libelle,
      heureDeb,
      heureFin,
      isValidForm,
      resetForm,
      createTask,
      txtName
    }
  }
}
</script>

<style scoped>
input,
button {
  width: 90%;
  margin: 5px 10px;
}
</style>