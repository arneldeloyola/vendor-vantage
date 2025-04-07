<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
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

                    <v-text-field
                      label="Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      label="Password Confirmation"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
        </v-container>
      </v-main>

      <v-footer border app>Vendor Management System | 2025</v-footer>
    </v-app>
  </v-responsive>
</template>
