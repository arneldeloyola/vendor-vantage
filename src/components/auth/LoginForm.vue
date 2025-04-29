<script setup>
import { ref } from 'vue'

const isPasswordVisible = ref(false)
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <br />
    <v-text-field prepend-icon="mdi-email" label="Email" variant="outlined"></v-text-field>

    <v-text-field
      prepend-icon="mdi-lock"
      label="Password"
      variant="outlined"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-btn
      class="mt-2 py-5"
      type="submit"
      block
      color="green-darken-3"
      elevation="5"
      prepend-icon="mdi-login"
      >Login</v-btn
    >
  </v-form>
</template>
