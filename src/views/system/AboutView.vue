<script setup>
import TopNavbar from '@/components/layout/TopNavbar.vue'

const faqs = [
  {
    question: 'How do I register as a vendor?',
    answer:
      'Click "Register" in the top right, fill out your business info, and start booking events immediately.',
  },
  {
    question: 'What types of events are available?',
    answer:
      'Festivals, career fairs, welcome weeks, cultural celebrations, and more—across multiple campuses.',
  },
  {
    question: 'How much does it cost to book a booth?',
    answer: 'Booth prices vary per event. Detailed pricing is available on each event listing.',
  },
  {
    question: 'Can I cancel my booking?',
    answer:
      'Yes. Full refund if cancelled 7 days before the event. Later cancellations may incur fees.',
  },
  {
    question: 'What do I need to bring to the event?',
    answer:
      "You'll usually bring your own table covers, signage, and products. Some events provide tables/chairs.",
  },
]
</script>

<template>
  <v-app>
    <v-main>
      <TopNavbar />

      <!-- Hero Section -->
      <v-container fluid class="py-16 px-4 px-md-16 bg-grey-lighten-4 text-center">
        <h1 class="text-h3 font-weight-bold mt-16">About Vendor Vantage</h1>
        <p class="text-subtitle-1 text-grey mb-16">Connecting campus events with local vendors</p>
      </v-container>

      <!-- Mission Section -->
      <v-container fluid class="py-16 px-4 px-md-16">
        <v-row>
          <v-col cols="12" md="6">
            <h2 class="text-h5 font-weight-bold mb-4">Our Mission</h2>
            <p>
              Vendor Vantage was founded with a simple mission: to make it easier for local
              businesses and vendors to participate in campus events.
            </p>
            <p>
              Our platform streamlines the process of finding, booking, and managing vendor booths
              at campus events, creating a win-win situation for event organizers, vendors, and
              attendees alike.
            </p>
          </v-col>

          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-sheet
              elevation="2"
              class="d-flex align-center justify-center"
              height="200"
              width="300"
              rounded
            >
              <v-icon size="64">mdi-store</v-icon>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- Why Choose Us -->
      <v-container fluid class="py-16 px-4 px-md-16 bg-grey-lighten-4">
        <div class="text-center mb-12">
          <h2 class="text-h4 font-weight-bold">Why Choose Vendor Vantage?</h2>
          <p class="text-subtitle-1 text-grey">
            We offer a comprehensive solution for vendors looking to connect with campus communities
          </p>
        </div>

        <v-row dense>
          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                <v-icon class="mb-2" size="36">mdi-check-circle</v-icon>Simplified Booking
              </h3>

              <p>Browse available events and book your booth in minutes, all in one place.</p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                <v-icon class="mb-2" size="36">mdi-account-group</v-icon>Campus Connections
              </h3>
              <p>Connect with thousands of students and faculty across multiple campuses.</p>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="pa-4">
              <h3 class="text-subtitle-1 font-weight-bold mb-2">
                <v-icon class="mb-2" size="36">mdi-view-dashboard</v-icon>Vendor Dashboard
              </h3>
              <p>
                Manage all your bookings, payments, and event details in one convenient dashboard.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- FAQ Section -->
      <v-container fluid class="py-16 px-4 px-md-16">
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold">Frequently Asked Questions</h2>
          <p class="text-subtitle-1 text-grey">Quick answers to common questions</p>
        </div>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-expansion-panels>
              <v-expansion-panel
                v-for="(faq, i) in faqs"
                :key="i"
                :title="faq.question"
                :text="faq.answer"
              />
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>

      <!-- Call to Action -->
      <v-container fluid class="py-16 px-4 px-md-16 bg-grey-lighten-4 text-center">
        <h2 class="text-h4 font-weight-bold mb-2">Ready to Get Started?</h2>
        <p class="text-subtitle-1 text-grey mb-4">
          Join CampusVendor today and start connecting with campus events.
        </p>
        <v-btn color="primary" class="ma-2" size="large" to="/register">
          Register Now <v-icon end>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn variant="outlined" class="ma-2" size="large" to="/events">Browse Events</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
