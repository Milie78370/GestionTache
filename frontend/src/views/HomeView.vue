<script setup>
import Form from "../components/FormTask.vue"
import axios from "axios"

/**
 * Appel du endpoint de la creation d'une tâche
 */
const createTask = async (formData) => {
  const response = await axios.post(`http://localhost:4000/task/add`,formData);
  if(response.data.success){
      console.log(response.data.message);
  }else {
      console.log("error",response.data.message);
  }
}
</script>

<template>
  <main>
    <hr>
    <Form @createTask="createTask"/>
  </main>
</template>
