<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const goToApplicationform = () => {
  activeTab.value = 'ApplicationForm'
}

const events = ref([])

// Function to fetch events from Supabase
const fetchEvents = async () => {
  const { data, error } = await supabase.from('events').select('*')
  .in('status', ['Upcoming'])
  if (error) {
    console.error('Error fetching events:', error)
  } else {
    events.value = data
  }
}



// Fetch events when the component is mounted
onMounted(fetchEvents)
</script>

<template>
  <v-container fluid>
    <v-row justify="center" class="mt-n16">
      <v-col cols="12" md="10" lg="9">
        <v-card
          class="pa-8"
          elevation="6"
          rounded="xl"
          style="background: linear-gradient(to bottom right, #ffffff, #f9f9f9);"
        >
          <div class="text-center mb-8">
            <h1 class="text-h4 font-weight-bold text-teal-darken-3">Upcoming Events</h1>
            <p class="text-subtitle-2 text-grey-darken-1">
              Browse and book booths for upcoming events
            </p>
          </div>

          <v-row>
            <v-col v-for="event in events" :key="event.id" cols="12" sm="6" md="4">
              <v-card height="100%" class="event-card mx-auto my-4" max-width="450">
                <v-card-text>
                  <div class="mb-4">
                    <div class="text-h5 font-weight-bold text-teal-darken-3">{{ event.event_name }}</div>
                    <div class="text-body-2 text-grey-darken-1">{{ event.description }}</div>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-store</v-icon>
                    <span class="text-body-2">Booth slots: {{ event.max_booths }}</span>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-calendar</v-icon>
                    <span class="text-body-2">Start Date: {{ event.start_date }}</span>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-calendar-end</v-icon>
                    <span class="text-body-2">End Date: {{ event.end_date }}</span>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-map-marker</v-icon>
                    <span class="text-body-2">{{ event.event_location }}</span>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-currency-usd</v-icon>
                    <span class="text-body-2">Booth Price: {{ event.booth_price }}</span>
                  </div>

                  <div class="d-flex align-center my-2">
                    <v-icon color="teal" class="mr-2">mdi-timer</v-icon>
                    <span class="text-body-2">Duration: {{ event.event_duration }}</span>
                  </div>
                </v-card-text>

                <v-card-actions class="pa-4 pt-0">
                  <v-btn
                    block
                    color="teal"
                    class="text-white"
                    variant="flat"
                    @click="goToApplicationform"
                  >
                    Apply
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<style scoped>
.event-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  border-radius: 16px;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
