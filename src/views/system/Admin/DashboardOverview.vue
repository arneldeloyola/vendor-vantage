<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { inject } from 'vue'

const activeTab = inject('activeTab')

const viewAllEvents = () => {
  activeTab.value = 'events'
}

const goToBookings = () => {
  activeTab.value = 'bookings'
}

const events = ref([])
const bookings = ref([])
const loading = ref(false)

const fetchEvents = async () => {
  const { data, error } = await supabase.from('events').select('*')
    .in('status', ['Upcoming'])
  if (error) {
    console.error('Error fetching events:', error)
  } else {
    events.value = data
  }
}

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



onMounted(() => {
  fetchEvents()
  fetchBookings()
})

</script>

<template>
  <v-row class="dashboard-cards" justify="center" align="center">
    <!-- Upcoming Events Card -->
    <v-col cols="12" md="4">
      <v-card class="dashboard-card" elevation="8">
        <div class="card-header">
          <v-avatar size="40" class="icon-wrapper">
            <v-icon color="white">mdi-calendar</v-icon>
          </v-avatar>
          <h2 class="text-subtitle-1 font-weight-bold ml-3">Upcoming Events</h2>
        </div>

        <div class="card-content">
          <div class="stat-number text-teal font-weight-bold">{{ events.length }}</div>
          <div class="text-caption text-grey-darken-1">Event(s) available to join</div>
        </div>

        <v-btn
          variant="elevated"
          color="teal"
          class="mt-4"
          block
          @click="viewAllEvents"
        >
          View All Events
        </v-btn>
      </v-card>
    </v-col>

    <!-- Active Bookings Card -->
    <v-col cols="12" md="4">
      <v-card class="dashboard-card" elevation="8">
        <div class="card-header">
          <v-avatar size="40" class="icon-wrapper">
            <v-icon color="white">mdi-bookmark-check</v-icon>
          </v-avatar>
          <h2 class="text-subtitle-1 font-weight-bold ml-3">Active Bookings</h2>
        </div>

        <div class="card-content">
          <div class="stat-number text-teal font-weight-bold">{{ bookings.length }}</div>
          <div class="text-caption text-grey-darken-1">Booking(s) you have made</div>
        </div>

        <v-btn
          variant="elevated"
          color="teal"
          class="mt-4"
          block
          @click="goToBookings"
        >
          Manage Bookings
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>


<style scoped>
.dashboard-cards {
  margin-top: 2rem;
}

.dashboard-card {
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.icon-wrapper {
  background: linear-gradient(135deg, #009688, #004d40);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  margin: 12px 0 20px;
}

.stat-number {
  font-size: 2.5rem;
  line-height: 1.2;
}

</style>
