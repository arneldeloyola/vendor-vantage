<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

const events = ref([])
const showAddDialog = ref(false)

const newEvent = ref({
  event_name: '',
  start_date: '',
  end_date: '',
  event_location: '',
  booth_price: '',
  max_booths: '',
  description: '',
  event_duration: '',
})

const fetchEvents = async () => {
  const { data, error } = await supabase.from('events').select('*')
  if (error) console.error('Error fetching events:', error)
  else events.value = data
}

onMounted(() => {
  fetchEvents()
})

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

const formattedEvents = computed(() => {
  return events.value.map((e) => ({
    ...e,
    date: `${e.start_date} - ${e.end_date}`,
    booth_price: `₱${e.booth_price}`,
    availability: `${e.max_booths ?? '?'} booths`,
    status: getStatus(e.start_date, e.end_date),
  }))
})

const addEvent = async () => {
  const { error } = await supabase.from('events').insert([
    {
      event_name: newEvent.value.event_name,
      start_date: newEvent.value.start_date,
      end_date: newEvent.value.end_date,
      event_location: newEvent.value.event_location,
      booth_price: parseFloat(newEvent.value.booth_price),
      max_booths: parseInt(newEvent.value.max_booths),
      description: newEvent.value.description,
      event_duration: newEvent.value.event_duration,
    },
  ])

  if (error) {
    console.error('Error adding event:', error)
  } else {
    showAddDialog.value = false
    fetchEvents()
    resetForm()
  }
}

const resetForm = () => {
  newEvent.value = {
    event_name: '',
    start_date: '',
    end_date: '',
    event_location: '',
    booth_price: '',
    max_booths: '',
    description: '',
    event_duration: '',
  }
}
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <div>
        <!-- Header -->
        <div class="d-flex align-center justify-space-between ma-10">
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">Events</h1>
            <p class="mb-0 text-grey-lighten-1">Manage your events and booth availability</p>
          </div>
          <v-btn variant="elevated" color="teal-darken-2" @click="showAddDialog = true">
            + Add Event
          </v-btn>
        </div>

        <!-- Table -->
        <v-sheet rounded class="my-10 mx-10">
          <v-data-table-virtual
            :headers="headers"
            :items="formattedEvents"
            class="mt-4 border-black"
            item-value="id"
            height="400"
            fixed-header
          />
        </v-sheet>

        <!-- Add Event Dialog -->
        <v-dialog v-model="showAddDialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h6 font-weight-bold">Add New Event</v-card-title>
            <v-card-text>
              <v-text-field v-model="newEvent.event_name" label="Event Name" />
              <v-text-field v-model="newEvent.start_date" label="Start Date" type="date" />
              <v-text-field v-model="newEvent.end_date" label="End Date" type="date" />
              <v-text-field v-model="newEvent.event_location" label="Location" />
              <v-text-field v-model="newEvent.booth_price" label="Booth Price (₱)" type="number" />
              <v-text-field v-model="newEvent.max_booths" label="Max Booths" type="number" />
              <v-textarea v-model="newEvent.description" label="Event Description" rows="3" />
              <v-text-field
                v-model="newEvent.event_duration"
                label="Event Duration (e.g., 2 days)"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="showAddDialog = false">Cancel</v-btn>
              <v-btn color="teal-darken-2" @click="addEvent">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </AdminAppLayout>
</template>
