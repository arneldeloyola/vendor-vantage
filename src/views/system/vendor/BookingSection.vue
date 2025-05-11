<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const bookings = ref([])
const loading = ref(true)

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
   <v-container class="d-flex justify-center" >
      <v-container fluid>
  <v-card v-if="!loading && bookings.length === 0" class="mt-4">
    <v-alert type="info" elevation="3">
      You have no bookings yet.
    </v-alert>
  </v-card>

  <v-card v-if="loading" class="mt-4">
    <v-skeleton-loader :loading="loading" :height="'350px'" type="card"></v-skeleton-loader>
  </v-card>

  <v-card  v-for="(eventBookings, eventName) in groupedBookings" :key="eventName" class="mt-6">
    <v-card-title class="text-h3 font-weight-bold text-teal"> Bookings</v-card-title>
    <v-card-title class="text-h6 font-weight-bold text-teal"> Your booked booths</v-card-title>
    <v-divider />

    <v-card-text>
      <v-data-table
        :headers="[
          { title: 'Booth Number', key: 'booth_number' },
          { title: 'Status', key: 'status' },
          { title: 'Payment', key: 'payment_status' },
          { title: 'Event', key: 'event_name' },
          { title: 'Actions', key: 'actions' }
        ]"
        :items="eventBookings"
        class="rounded"
        item-value="id"
      >
        <template #[`item.booth_number`]="{ item }">
          {{ item.booths?.number }}
        </template>

        <template #[`item.status`]="{ item }">
          <span :class="{
            'text-green-6': item.status === 'confirmed',
            'text-red-6': item.status === 'pending'
          }">{{ item.status }}</span>
        </template>

        <template #[`item.payment_status`]="{ item }">
          <span :class="{
            'text-green-6': item.payment_status === 'Paid',
            'text-yellow-8': item.payment_status === 'Pending'
          }">{{ item.payment_status }}</span>
        </template>

        <template #[`item.event_name`]="{ item }">
          {{ item.event_name }}
        </template>

        <template #[`item.actions`]="{ item }">
          <v-btn v-if="item.permit_url" :href="item.permit_url" target="_blank" color="teal" class="rounded-lg py-2 px-6">
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
.v-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1);
}

.text-h5 {
  font-size: 1.5rem;
}

.text-teal {
  color: #008080;
}

.v-btn {
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.v-btn:hover {
  background-color: #00796b;
}
</style>
