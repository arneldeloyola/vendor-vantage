<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const isPasswordVisible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const onLogin = () => {
  //alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <br />
    <v-text-field
      v-model="formData.email"
      prepend-inner-icon="mdi-email"
      label="Email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      class="pt-2"
      v-model="formData.password"
      prepend-inner-icon="mdi-lock"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
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
