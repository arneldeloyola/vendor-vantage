<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto mt-16 pt-16">
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
                <v-text-field label="Email" variant="outlined"></v-text-field>

                <v-text-field label="Password" type="password" variant="outlined"></v-text-field>
                <hr />
                <v-btn
                  class="mt-2"
                  type="submit"
                  block
                  color="primary"
                  elevation="5"
                  prepend-icon="mdi-login"
                  >Login</v-btn
                >

                <v-divider></v-divider>
                <br />
                <h5 class="text-center">
                  Don't have account?<RouterLink to="/register" class="text-primary">
                    Click here to Register!</RouterLink
                  >
                </h5>
              </v-form>
            </v-card-text>
          </v-card></v-col
        >
      </v-row>
    </template>
  </AppLayout>
</template>
