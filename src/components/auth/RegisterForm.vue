<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

import { ref } from 'vue'

const isPasswordVisible = ref(false)
const isConfirmationVisible = ref(false)
const refVForm = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

const onRegister = () => {
  //alert(formData.value.email)
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onRegister()
  })
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onSubmit">
    <br />
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.firstname"
          prepend-icon="mdi-account"
          :counter="10"
          label="First name"
          required
          variant="outlined"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.lastname"
          :counter="10"
          label="Last name"
          required
          variant="outlined"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-text-field
      v-model="formData.email"
      label="Email"
      variant="outlined"
      prepend-icon="mdi-email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="formData.password"
          prepend-icon="mdi-lock"
          label="Password"
          variant="outlined"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator, passwordValidator]"
        ></v-text-field
      ></v-col>
      <v-col cols="12" md="6"
        ><v-text-field
          v-model="formData.password_confirmation"
          label="Password Confirmation"
          variant="outlined"
          :type="isConfirmationVisible ? 'text' : 'password'"
          :append-inner-icon="isConfirmationVisible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isConfirmationVisible = !isConfirmationVisible"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password_confirmation, formData.password),
          ]"
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
