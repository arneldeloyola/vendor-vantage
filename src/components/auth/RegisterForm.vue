<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import { ref } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { supabase, formActionDefault } from '@/utils/supabase'

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

const formAction = ref({
  ...formActionDefault,
})

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

// Functions
const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        is_admin: false, // Just turn to true if admin account
      },
    },
  })

  if (error) {
    // Add Error Message and Status Code
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account'
    //Can Add more actions here
  }
  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <v-col col="12" md="6">
        <v-text-field
          v-model="formData.firstname"
          label="Firstname"
          variant="outlined"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col col="12" md="6">
        <v-text-field
          v-model="formData.lastname"
          label="Last Name"
          variant="outlined"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col col="12" md="12">
        <v-text-field
          v-model="formData.email"
          label="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="[requiredValidator, emailValidator]"
        ></v-text-field>
      </v-col>
      <v-col col="12" md="6">
        <v-text-field
          v-model="formData.password"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPasswordVisible ? 'text' : 'password'"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator, passwordValidator]"
        ></v-text-field>
      </v-col>
      <v-col col="12" md="6">
        <v-text-field
          v-model="formData.password_confirmation"
          :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="isPasswordConfirmVisible ? 'text' : 'password'"
          label="Password Confirmation"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password_confirmation, formData.password),
          ]"
        ></v-text-field>
      </v-col>
      <v-btn
        class="mt-2"
        elevation="12"
        type="submit"
        block
        color="grey-darken-1"
        prepend-icon="mdi-account-plus"
        :disabled="formAction.formProcess"
        :loading="formAction.formProcess"
        >Register</v-btn
      >
    </v-row>
  </v-form>
</template>
