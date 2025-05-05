<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const isPasswordVisible = ref(false) // This controls password visibility toggle

const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({ ...formDataDefault })

const onSubmit = () => {
  // alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      class="mb-3"
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
    ></v-text-field>
    <v-btn
      class="mt-2"
      elevation="12"
      type="submit"
      block
      color="grey-darken-1"
      prepend-icon="mdi-login"
      >Login</v-btn
    >
    <v-divider class="my-5"></v-divider>
  </v-form>
</template>
