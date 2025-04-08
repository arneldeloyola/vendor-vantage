<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="4s" md="6" class="mx-auto pt-16">
          <v-card class="mx-auto pt-2" elevation="24">
            <v-card-title class="text-center">
              <img
                src="/public/images/vendorlogo.jpg"
                class="rounded-circle"
                alt="..."
                width="300"
                height="230"
              /><img />
              <h1 class="font-weight-black">Vendor Vantage</h1>

              <p>"Your Spot, Your Business, Your Advantage!"</p>
              <v-divider class="my-3"></v-divider>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-2">
              <LoginForm></LoginForm>

              <v-divider class="my-3"></v-divider>
              <br />
              <h5 class="text-center">
                Don't have account?<RouterLink
                  to="/register"
                  class="text-primary font-weight-black"
                >
                  Click here to Register!</RouterLink
                >
              </h5>
            </v-card-text>
          </v-card></v-col
        >
      </v-row>
    </template>
  </AppLayout>
</template>
