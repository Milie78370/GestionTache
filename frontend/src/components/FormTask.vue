<template>
  <div>
    <h3>Création de tâches :</h3>
    <div class="formulaire">
      <form  @submit.prevent="createTask">
        <div class="form-group">
          <label>Libelle : </label>
          <input type="text" placeholder="Libelle" v-model="libelle" ref="txtName" />
        </div>
        <div class="form-group">
          <label>Heure de début : </label>
          <input type="time" placeholder="heure de debut" v-model="heureDeb" />
        </div>
        <div class="form-group">
          <label>Heure de fin : </label>
          <input type="time" placeholder="heure de fin" v-model="heureFin" />
        </div>
        <button class="btn btn-success" :disabled="!isValidForm">Confirmer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
export default {
  setup(props, context) {
    const libelle = ref('');
    const heureDeb = ref('');
    const heureFin = ref('');
    let txtName = ref(null);

    /**
     * Fonction qui verifie si tous les champs du formulaire sont 
     * entrée 
     * @returns un boolean 
     */
    const isValidForm = computed(() => {
      if (libelle.value !== '' && heureDeb.value !== '' && heureFin.value !== '') {
        return true
      }
      return false
    });

    /**
     * Fonction qui remet les champs à vide
     * @returns void
     */
    function resetForm() {
      libelle.value = ''
      heureDeb.value = ''
      heureFin.value = ''
    }

    /**
     * Fonction de creation de tâches
     * où sa responsabilité est d'envoyer un custom event vers le parent
     * avec le payload contenant les valeurs du formulaire
     */
    function createTask() {
      const tasks = {
        libelle: libelle.value,
        heureDeb: heureDeb.value,
        heureFin: heureFin.value
      };
      context.emit('createTask', tasks);
      resetForm();
    }

    /**
     * Appel de la fonction onMounted 
     * (faisant partie du cycle de vie vue)
     * focus sur le champs input
     */
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
.formulaire {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 50%;
  margin: auto;
  border: 1px solid black;
  border-radius: 2%;
  padding: 5px;
}
form{
 width: 90%;
}
input {
  width: 90%;
  margin-bottom: 5px;
}
button {
  width: 90%;
  margin-bottom: 5px;
  background-color: #42b983;
}
h3{
  font-family: "Montserrat", sans-serif;
  margin-bottom: 2%;
}
</style>