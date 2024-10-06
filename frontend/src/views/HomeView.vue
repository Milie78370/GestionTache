<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Form from "../components/FormTask.vue"

const createTask = () => {
  
}
</script>

<template>
  <main>
    <HelloWorld msg="Créer une tâche"/>
    <Form @createTask="createTask"/>
  </main>
</template>
