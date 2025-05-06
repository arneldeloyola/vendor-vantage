<script setup>
import TopNavbar from '@/components/layout/TopNavbar.vue'
</script>

<template>
  <v-app>
    <v-main>
      <TopNavbar></TopNavbar>
      <!-- Hero Section -->
      <v-container fluid class="py-16 px-4 px-md-16 bg-grey-lighten-4 text-center">
        <h1 class="text-h3 font-weight-bold mt-16">Contact Us</h1>
        <p class="text-subtitle-1 text-grey mb-16">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </v-container>

      <!-- Contact Form & Info -->
      <v-container fluid class="py-16 px-4 px-md-16">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-4">Get in Touch</h2>
            <v-form>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Email" required></v-text-field>
                </v-col>
              </v-row>
              <v-text-field label="Subject" class="mt-2" required></v-text-field>
              <v-textarea label="Message" rows="5" class="mt-2" required></v-textarea>
              <v-btn color="black" class="mt-4" block>
                Send Message
                <v-icon right>mdi-send</v-icon>
              </v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-4">Contact Information</h2>
            <v-card class="mb-4">
              <v-card-title>
                <v-icon class="mr-2">mdi-map-marker</v-icon> Our Location
              </v-card-title>
              <v-card-text class="text-grey">
                <div>Butuan City, Agusan Del Norte</div>
                <div>Caraga State University</div>
                <div>Didto Dapit admin</div>
              </v-card-text>
            </v-card>
            <v-card class="mb-4">
              <v-card-title> <v-icon class="mr-2">mdi-email</v-icon> Email Us </v-card-title>
              <v-card-text class="text-grey">
                <div>lsg@campusvendor.com</div>
                <div>csubatak@campusvendor.com</div>
              </v-card-text>
            </v-card>
            <v-card class="mb-4">
              <v-card-title> <v-icon class="mr-2">mdi-phone</v-icon> Call Us </v-card-title>
              <v-card-text class="text-grey">
                <div>Main: 091231231231</div>
                <div>Support: 091234567893</div>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title> <v-icon class="mr-2">mdi-clock</v-icon> Business Hours </v-card-title>
              <v-card-text class="text-grey">
                <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                <div>Saturday: 10:00 AM - 2:00 PM</div>
                <div>Sunday: Closed</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- FAQ Section -->
      <v-container fluid class="py-16 px-4 px-md-16 bg-grey-lighten-4">
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold">Frequently Asked Questions</h2>
          <p class="text-subtitle-1 text-grey">Quick answers to common questions</p>
        </div>

        <v-col col="12" md="8">
          <v-expansion-panels>
            <v-expansion-panel
              title="How do I book a vendor booth?"
              text="Register for an account, browse available events, select your preferred booth, and
                complete the booking process. It's that simple!"
            ></v-expansion-panel>
            <v-expansion-panel
              title="What payment methods do you accept?"
              text="We accept GCash and over-the-counter payments."
            ></v-expansion-panel>
            <v-expansion-panel
              title="How do I become a campus partner?"
              text="If you're interested in listing your campus events on our platform, please contact
                our Campus Relations team at partners@vendorvantage.com."
            ></v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col col="12" md="4"></v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.aspect-ratio-box {
  position: relative;
  padding-top: 56.25%;
}
.aspect-ratio-box > * {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
