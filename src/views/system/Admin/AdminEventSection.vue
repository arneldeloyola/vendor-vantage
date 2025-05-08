<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

const events = ref([])

onMounted(() => {
  fetchEvents()
})

const fetchEvents = async () => {
  const { data, error } = await supabase.from('events').select('*')
  if (error) console.error('Error fetching events:', error)
  else events.value = data
}

const getStatus = (startDate, endDate) => {
  const today = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (today < start) return 'Upcoming'
  else if (today >= start && today <= end) return 'Active'
  else return 'Completed'
}

const headers = [
  { title: 'Event Name', key: 'event_name' },
  { title: 'Date', key: 'date' },
  { title: 'Location', key: 'event_location' },
  { title: 'Booth Price', key: 'booth_price' },
  { title: 'Availability', key: 'availability' },
  { title: 'Status', key: 'status' },
]

// Transform events into displayable rows
const formattedEvents = computed(() => {
  return events.value.map((e) => ({
    ...e,
    date: `${e.start_date} - ${e.end_date}`,
    booth_price: `₱${e.booth_price}`,
    availability: 'Calculate available booths', // Replace with actual logic
    status: getStatus(e.start_date, e.end_date),
  }))
})
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <div>
        <div class="d-flex align-center justify-space-between ma-10">
          <div>
            <h1 class="text-h4 font-weigt-bold mb-1">Events</h1>
            <p class="mb-0 text-grey-lighten-1">Manage your events and booth availability</p>
          </div>
          <v-btn variant="elevated" color="teal-darken-2">+Add Event</v-btn>
        </div>
        <v-sheet rounded width="auto" height="auto" class="my-10 mx-10">
          <v-row>
            <v-col cols="12" md="12"> </v-col>
          </v-row>
          <v-data-table-virtual
            :headers="headers"
            :items="formattedEvents"
            class="mt-4 border-black"
            item-value="id"
            height="400"
            fixed-header
          />
        </v-sheet>
      </div>
    </template>
  </AdminAppLayout>
</template>
