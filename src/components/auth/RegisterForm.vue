<template>
  <v-form fast-fail @submit.prevent>
    <br />
    <v-text-field label="Fullname" variant="outlined"></v-text-field>
    <v-text-field label="Lastname" variant="outlined"></v-text-field>
    <v-text-field label="Email" variant="outlined"></v-text-field>

    <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

    <v-text-field label="Password Confirmation" type="password" variant="outlined"></v-text-field>

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="blue-lighten-1"
      elevation="5"
      prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>
