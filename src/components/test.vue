<template>
  <div class="container text-center">
    <!--* Display single Data -->
    <h1>Single Data</h1>
    <div class="uidCng">
      <label for="uid">User Id:</label>
      <input type="text" v-model="uid" id="uid" />
    </div>
    <div v-if="error">Oops! An error encountered :{{ error }}</div>
    <div v-else-if="userData">
      <h3>ID: {{ userData.id }}</h3>
      <h2>Full Name: {{ userData.first_name }} {{ userData.last_name }}</h2>
      <h3>Email: {{ userData.email }}</h3>
      <img :src="userData.avatar" alt="avatar" />
    </div>

    <div v-else>Loading...</div>
    <!-- Display single Data # -->
    <!------------------------------------------------>
    <hr>
    <!-- * Display All Data -->
    <h1>All Data</h1>

    <div v-if="errors">Oops! An error encountered :{{ error }}</div>
    <div v-else-if="usersData">
      <div v-for="user in usersData" :key="user.id">
        <h3>ID: {{ user.id }}</h3>
        <h2>Full Name: {{ user.first_name }} {{ user.last_name }}</h2>
        <h3>Email: {{ user.email }}</h3>
        <img :src="user.avatar" class="rounded-circle" alt="avatar" />
      </div>
    </div>
    <div v-else>Loading...</div>
    <!------------------------------------------------>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getSingleUserData, getAllUserData } from "../composables/userApi";
const url = ref("https://reqres.in/api/users/");
const uid = ref(1);
const { userData, error } = getSingleUserData(url, uid);
// all data
const { usersData, errors } = getAllUserData(url);
// console.log(userData);
</script>
