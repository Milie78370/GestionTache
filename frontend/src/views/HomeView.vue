<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Form from "../components/FormTask.vue"
import axios from "axios"

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
    <HelloWorld msg="Créer une tâche"/>
    <Form @createTask="createTask"/>
  </main>
</template>
