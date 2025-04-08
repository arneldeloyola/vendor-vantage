<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto pt-14">
          <v-card
            class="mx-auto"
            prepend-icon="mdi-storefront"
            subtitle="Your Spot, Your Business, Your Advantage!"
            elevation="24"
          >
            <template v-slot:title>
              <span class="font-weight-black">Vendor Vantage</span>
            </template>

            <v-card-text class="bg-surface-light pt-4">
              <v-form fast-fail @submit.prevent>
                <v-text-field label="Fullname" variant="outlined"></v-text-field>
                <v-text-field label="Lastname" variant="outlined"></v-text-field>
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>

                <v-text-field
                  label="Password Confirmation"
                  type="password"
                  variant="outlined"
                ></v-text-field>
                <hr />
                <v-btn
                  class="mt-2"
                  type="submit"
                  block
                  color="primary"
                  elevation="5"
                  prepend-icon="mdi-account-plus"
                  >Register</v-btn
                >
              </v-form>

              <v-divider></v-divider>
              <br />

              <h5 class="text-center">
                Already have account?<RouterLink to="/" class="text-primary">
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
