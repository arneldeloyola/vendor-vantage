<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { computed } from 'vue'

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

  console.log('Fetched Bookings:', bookingsData)

  if (bookingError) {
    console.error('Error fetching bookings:', bookingError)
    loading.value = false
    return
  }

  const { data: eventsData, error: eventsError } = await supabase
    .from('events')
    .select('id, event_name')

  console.log('Fetched Events:', eventsData)

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

    <div class="px-5 mb-6">
      <h1 class="text-h3 font-weight-bold">Bookings</h1>
      <span class="text-caption text-grey-darken-1">Your booked booths</span>
    </div>
      <v-card-subtitle v-if="!loading && bookings.length === 0">
        <v-alert type="info" class="mt-4" elevation="2">
          You have no bookings yet.
        </v-alert>
      </v-card-subtitle>

      <v-card-subtitle v-if="loading" class="mt-4">
        <v-skeleton-loader :loading="loading" :height="'300px'" type="card"></v-skeleton-loader>
      </v-card-subtitle>

      <v-card-subtitle v-for="(eventBookings, eventName) in groupedBookings" :key="eventName">
        <v-divider class="my-4" />
        
        <div class="text-h5 font-weight-bold bg-blue-3 text-white py-2 px-4 rounded-lg">
          {{ eventName }}
        </div>

        <v-row class="mt-4">
          <v-col v-for="booking in eventBookings" :key="booking.id" cols="12" sm="6" md="4">
            <v-card class="ma-2" elevation="3" outlined>
              <v-card-title class="bg-teal text-white rounded-t-lg py-2">
                <div class="text-h6">Booth Number: {{ booking.booths?.number }}</div>
              </v-card-title>
              <v-card-subtitle class="pt-2">
                <div><strong>Status:</strong> 
                  <span :class="{
                    'text-green-6': booking.status === 'confirmed', 
                    'text-red-6': booking.status === 'pending'
                  }">{{ booking.status }}</span>
                </div>
                <div><strong>Payment:</strong>
                  <span :class="{
                    'text-green-6': booking.payment_status === 'Paid', 
                    'text-yellow-8': booking.payment_status === 'Pending'
                  }">{{ booking.payment_status }}</span>
                </div>
              </v-card-subtitle>
              <v-card-actions class="d-flex justify-end">
                <v-btn v-if="booking.permit_url" :href="booking.permit_url" target="_blank" color="teal">
                  View Permit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-subtitle>
  
</template>
