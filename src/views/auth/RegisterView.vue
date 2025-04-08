<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-10">
          <v-card class="mx-auto pt-2" elevation="24">
            <v-card-title class="text-center">
              <v-image src="/public/images/vendorlogo.jpg"></v-image>
              <h1 class="font-weight-black">Vendor Vantage</h1>
              <p>"Your Spot, Your Business, Your Advantage!"</p>
              <v-divider class="my-3"></v-divider>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-2">
              <RegisterForm></RegisterForm>
              <v-divider class="my-3"></v-divider>
              <br />

              <h5 class="text-center">
                Already have account?<RouterLink to="/" class="text-primary font-weight-black">
                  Click here to Login!</RouterLink
                >
              </h5>
            </v-card-text>
          </v-card></v-col
        >
      </v-row>
    </template>
  </AppLayout>
</template>
