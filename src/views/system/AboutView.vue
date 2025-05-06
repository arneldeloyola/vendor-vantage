<script setup></script>

<template>
  <v-container class="py-16">
    <!-- Contact Header -->
    <v-row justify="center" class="mb-10 text-center">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">Contact Us</h1>
        <p class="text-subtitle-1 text-grey">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </v-col>
    </v-row>

    <!-- Form & Contact Info -->
    <v-row class="mb-16" dense>
      <!-- Contact Form -->
      <v-col cols="12" lg="6">
        <h2 class="text-h5 font-weight-bold mb-4">Get in Touch</h2>
        <v-form>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Email" type="email" required></v-text-field>
            </v-col>
          </v-row>
          <v-text-field label="Subject" class="mb-4" required></v-text-field>
          <v-textarea label="Message" rows="6" auto-grow required></v-textarea>
          <v-btn color="primary" class="mt-4" block>
            Send Message
            <v-icon end>mdi-send</v-icon>
          </v-btn>
        </v-form>
      </v-col>

      <!-- Contact Information -->
      <v-col cols="12" lg="6">
        <h2 class="text-h5 font-weight-bold mb-4">Contact Information</h2>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-card class="mb-4">
              <v-card-title>
                <v-icon class="mr-2" color="primary">mdi-map-marker</v-icon>
                Our Location
              </v-card-title>
              <v-card-text>
                <p>123 Campus Drive</p>
                <p>University District</p>
                <p>Collegetown, CA 90210</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mb-4">
              <v-card-title>
                <v-icon class="mr-2" color="primary">mdi-email-outline</v-icon>
                Email Us
              </v-card-title>
              <v-card-text>
                <p>info@campusvendor.com</p>
                <p>support@campusvendor.com</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mb-4">
              <v-card-title>
                <v-icon class="mr-2" color="primary">mdi-phone</v-icon>
                Call Us
              </v-card-title>
              <v-card-text>
                <p>Main: (555) 123-4567</p>
                <p>Support: (555) 987-6543</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mb-4">
              <v-card-title>
                <v-icon class="mr-2" color="primary">mdi-clock-outline</v-icon>
                Business Hours
              </v-card-title>
              <v-card-text>
                <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- FAQ Section -->
    <v-row justify="center" class="text-center mb-12">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold">Frequently Asked Questions</h2>
        <p class="text-subtitle-1 text-grey">Quick answers to common questions</p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="font-weight-bold">How do I book a vendor booth?</v-card-title>
          <v-card-text
            >Register, browse events, choose a booth, and complete the booking process.</v-card-text
          >
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="font-weight-bold">What payment methods do you accept?</v-card-title>
          <v-card-text>Visa, Mastercard, AmEx, Discover, and other major credit cards.</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="font-weight-bold">How do I become a campus partner?</v-card-title>
          <v-card-text
            >Contact us at partners@campusvendor.com to list your campus events.</v-card-text
          >
        </v-card>
      </v-col>
    </v-row>

    <!-- Map Placeholder -->
    <v-row class="mt-16">
      <v-col>
        <v-sheet height="300" class="d-flex align-center justify-center bg-grey-lighten-3 rounded">
          <v-icon size="80" color="grey">mdi-map-marker</v-icon>
          <span class="sr-only">Map location</span>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
