<script setup>
import { ref } from 'vue'

const isPasswordVisible = ref(false)
const isConfirmationVisible = ref(false)
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <br />
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          prepend-icon="mdi-account"
          v-model="firstname"
          :counter="10"
          :rules="nameRules"
          label="First name"
          required
          variant="outlined"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="lastname"
          :counter="10"
          :rules="nameRules"
          label="Last name"
          required
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field label="Email" variant="outlined" prepend-icon="mdi-email"></v-text-field>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          prepend-icon="mdi-lock"
          label="Password"
          variant="outlined"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          label="Password Confirmation"
          variant="outlined"
          :type="isConfirmationVisible ? 'text' : 'password'"
          :append-inner-icon="isConfirmationVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isConfirmationVisible = !isConfirmationVisible"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="green-darken-3"
      elevation="5"
      prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
