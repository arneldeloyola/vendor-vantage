<template>
  <v-form fast-fail @submit.prevent>
    <br />
    <v-text-field label="Email" variant="outlined" placeholder="johndoe@gmail.com"></v-text-field>

    <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

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
