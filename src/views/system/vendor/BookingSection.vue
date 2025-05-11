<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const bookings = ref([])
const loading = ref(true)
const search = ref('')

const fetchBookings = async () => {
  loading.value = true

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error("User not found:", userError)
    loading.value = false
    return
  }

  const { data: bookingsData, error: bookingError } = await supabase
    .from('vendor_bookings')
    .select(`
      id,
      status,
      payment_status,
      permit_url,
      booth_id,
      booths ( number, event_id )
    `)
    .eq('user_id', user.id)

  if (bookingError) {
    console.error('Error fetching bookings:', bookingError)
    loading.value = false
    return
  }

  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('id, event_name')

  if (eventsError) {
    console.error('Error fetching events:', eventsError)
    loading.value = false
    return
  }

  bookings.value = bookingsData.map(booking => {
    const booth = booking.booths
    const event = eventsData.find(e => e.id === booth?.event_id)

    return {
      ...booking,
      event_name: event?.event_name || 'N/A'
    }
  })

  loading.value = false
}

const groupedBookings = computed(() => {
  const groups = {}

  bookings.value.forEach(booking => {
    if (!groups[booking.event_name]) {
      groups[booking.event_name] = []
    }
    groups[booking.event_name].push(booking)
  })

  return groups
})

onMounted(() => {
  fetchBookings()
})
</script>


<template>
  <v-container class="d-flex justify-center">
    <v-container fluid>
      <!-- Empty booking alert -->
      <v-card v-if="!loading && bookings.length === 0" class="mt-4 rounded-lg shadow-lg">
        <v-alert type="info" elevation="3">
          You have no bookings yet.
        </v-alert>
      </v-card>

      <!-- Loading skeleton -->
      <v-card v-if="loading" class="mt-4 rounded-lg shadow-lg">
        <v-skeleton-loader :loading="loading" :height="'350px'" type="card"></v-skeleton-loader>
      </v-card>

      <!-- Bookings cards loop -->
      <v-card v-for="(eventBookings, eventName) in groupedBookings" :key="eventName" class="rounded-lg elevation-2 mb-6" style="background-color: #ffffff;">
        <v-card-title class="px-6 py-4 d-flex justify-space-between align-center">
          <span class="font-weight-bold text-teal darken-3"><h2>My Bookings</h2></span>
          <v-text-field
            v-model="search"
            placeholder="Search bookings..."
            density="compact"
            variant="outlined"
            hide-details
            prepend-inner-icon="mdi-magnify"
            class="ml-sm-auto mr-2"
            style="max-width: 300px"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="px-6 pb-6 pt-4">
          <v-data-table
            :headers="[
              { title: 'Booth Number', key: 'booth_number' },
              { title: 'Status', key: 'status' },
              { title: 'Payment Status', key: 'payment_status' },
              { title: 'Event', key: 'event_name' },
              { title: 'Actions', key: 'actions' }
            ]"
            :items="eventBookings"
            class="rounded-lg"
            item-value="id"
            density="comfortable"
            height="270"
            fixed-header
            :search="search"
          >
            <!-- Row Number -->
            <template #[`item.row_number`]="{ index }">
              {{ index + 1 }}
            </template>

            <!-- Booth Number Column -->
            <template #[`item.booth_number`]="{ item }">
              <span class="font-weight-medium">{{ item.booths?.number }}</span>
            </template>

            <!-- Status Column with Color Classes -->
            <template #[`item.status`]="{ item }">
              <span :class="{
                'text-green-6': item.status === 'confirmed',
                'text-red-6': item.status === 'pending'
              }" class="font-weight-bold">{{ item.status }}</span>
            </template>

            <!-- Payment Status Column -->
            <template #[`item.payment_status`]="{ item }">
              <span :class="{
                'text-green-6': item.payment_status === 'Paid',
                'text-yellow-8': item.payment_status === 'Pending'
              }" class="font-weight-bold">{{ item.payment_status }}</span>
            </template>

            <!-- Event Name Column -->
            <template #[`item.event_name`]="{ item }">
              <span class="font-weight-medium">{{ item.event_name }}</span>
            </template>

            <!-- Actions Column -->
            <template #[`item.actions`]="{ item }">
              <v-btn v-if="item.permit_url" :href="item.permit_url" target="_blank" color="teal" class="rounded-lg py-2 px-6 font-weight-bold">
                View Permit
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>


<style scoped>
/* Global styles for v-card */
.v-card {
  background-color: white; /* White background for the card */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  padding: 20px; /* Add padding inside the card */
  border-radius: 12px; /* Rounded corners */
}

/* Hover effect for cards */
.v-card:hover {
  transform: translateY(-10px); /* Lift the card */
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

/* Hover effect specifically for cards displaying bookings */
.hover-card:hover {
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15); /* Slightly larger shadow */
}

/* Teal color for text */
.text-teal {
  color: #008080;
}

/* Button styling */
.v-btn {
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.v-btn:hover {
  background-color: #00796b; /* Darken the button on hover */
}

/* Add space between the cards */
.mt-6 {
  margin-top: 24px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
