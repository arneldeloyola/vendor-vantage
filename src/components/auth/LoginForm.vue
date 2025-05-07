<script setup>
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useLogin } from '@/composables/auth/login'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const { formData, formAction, refVForm, onFormSubmit: baseSubmit } = useLogin()

const isPasswordVisible = ref(false)
const selectedRole = ref('vendor') // default
const router = useRouter()

const onFormSubmit = async () => {
  await baseSubmit()

  if (formAction.formSuccess) {
    const { data, error } = await supabase
      .from('users')
      .select('is_admin')
      .eq('email', formData.email)
      .single()

    if (error || !data) {
      formAction.formErrorMessage = 'Unable to verify user role.'
      return
    }

    const isAdmin = data.is_admin

    if (
      (selectedRole.value === 'admin' && !isAdmin) ||
      (selectedRole.value === 'vendor' && isAdmin)
    ) {
      formAction.formErrorMessage = 'Incorrect role selected.'
      return
    }

    // Redirect based on role
    router.push({ name: isAdmin ? 'AdminDashboard' : 'VendorDashboard' })
  }
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />
  <v-col cols="12" class="text-center">
    <v-btn-toggle v-model="selectedRole" mandatory class="mt-n10" color="black">
      <v-btn value="vendor">Vendor</v-btn>
      <v-btn value="admin">Admin</v-btn>
    </v-btn-toggle>
  </v-col>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row dense>
      <v-col cols="12">
        <v-text-field
          v-model="formData.email"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          :rules="[requiredValidator, emailValidator]"
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="formData.password"
          prepend-inner-icon="mdi-lock-outline"
          label="Password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :rules="[requiredValidator]"
        />
      </v-col>
    </v-row>

    <v-btn
      class="mt-2"
      type="submit"
      color="black"
      prepend-icon="mdi-login"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      block
    >
      Login
    </v-btn>
  </v-form>
</template>
