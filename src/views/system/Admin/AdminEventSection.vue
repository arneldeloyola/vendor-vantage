<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

const events = ref([])
const showAddDialog = ref(false)
const search = ref('')

const newEvent = ref({
  event_name: '',
  start_date: '',
  end_date: '',
  event_location: '',
  booth_price: '',
  max_booths: '',
  description: '',
  event_duration: '',
  status: 'Upcoming',
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
  { title: 'No.', key: 'row_number' },
  { title: 'Event Name', key: 'event_name' },
  { title: 'Date', key: 'date' },
  { title: 'Location', key: 'event_location' },
  { title: 'Booth Price', key: 'booth_price' },
  { title: 'Availability', key: 'availability' },
  { title: 'Status', key: 'status' },
  { title: 'Action', key: 'action' },
]

const formattedEvents = computed(() => {
  return events.value.map((e) => ({
    ...e,
    date: `${e.start_date} - ${e.end_date}`,
    booth_price: e.booth_price ? `₱${parseFloat(e.booth_price).toFixed(2)}` : '₱0.00',
    availability: `${e.max_booths ?? '?'} booths`,
    status: e.status || getStatus(e.start_date, e.end_date),
  }))
})

const addEvent = async () => {
  const { error } = await supabase.from('events').insert([{
    event_name: newEvent.value.event_name,
    start_date: newEvent.value.start_date,
    end_date: newEvent.value.end_date,
    event_location: newEvent.value.event_location,
    booth_price: parseFloat(newEvent.value.booth_price),
    max_booths: parseInt(newEvent.value.max_booths),
    description: newEvent.value.description,
    event_duration: newEvent.value.event_duration,
    status: newEvent.value.status,
  }])

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
    status: 'Upcoming',
  }
}

const updateEventStatus = async (eventId, newStatus) => {
  const { error } = await supabase
    .from('events')
    .update({ status: newStatus })
    .eq('id', eventId)

  if (error) {
    console.error('Error updating status:', error)
  } else {
    fetchEvents()
  }
}
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <v-container fluid class="py-6">
        <!-- Header -->
        <v-card class="mb-3 rounded-lg elevation-2 px-6 py-4">
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="12" sm="8">
              <h1 class="font-weight-bold mb-1">Event Management</h1>
              <p class="text-grey-darken-1 mb-0">Manage your events and booth availability</p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Events Table -->
        <v-card class="rounded-lg elevation-2 mb-6">
          <v-card-title class="px-6 py-4 d-flex justify-space-between align-center">
            <span class="font-weight-bold"><h2>Events List</h2></span>
            <v-text-field
              v-model="search"
              placeholder="Search events..."
              density="compact"
              variant="outlined"
              hide-details
              prepend-inner-icon="mdi-magnify"
              class="ml-sm-auto mr-2"
              style="max-width: 300px"
            />
            <v-btn color="teal-darken-2" class="text-white" @click="showAddDialog = true">
              + Add Event
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-card-text class="px-6 pb-6 pt-4">
            <v-data-table
              :headers="headers"
              :items="formattedEvents"
              item-value="id"
              class="rounded border"
              density="comfortable"
              height="500"
              fixed-header
              :search="search"
            >
              <!-- Row Number -->
              <template #[`item.row_number`]="{ index }">
                {{ index + 1 }}
              </template>

              <template #[`item.booth_price`]="{ item }">
                {{ item.booth_price }}
              </template>

              <template #[`item.availability`]="{ item }">
                <span>{{ item.availability }}</span>
              </template>

              <template #[`item.date`]="{ item }">
                <span>{{ item.date }}</span>
              </template>

              <template #[`item.status`]="{ item }">
                <v-chip
                  size="small"
                  :color="item.status === 'Upcoming'
                    ? 'warning'
                    : item.status === 'Active'
                      ? 'green'
                      : item.status === 'Completed'
                        ? 'blue'
                        : 'orange'"
                  class="text-white"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <!-- Actions Dropdown -->
              <template #[`item.action`]="{ item }">
                <v-menu>
                  <template #activator="{ props }">
                    <v-btn v-bind="props" icon variant="text">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="updateEventStatus(item.id, 'Upcoming')">
                      <v-list-item-title>Mark as Upcoming</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="updateEventStatus(item.id, 'Active')">
                      <v-list-item-title>Mark as Active</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="updateEventStatus(item.id, 'Completed')">
                      <v-list-item-title>Mark as Completed</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>

        <!-- Add Event Dialog -->
        <v-dialog v-model="showAddDialog" max-width="1000px">
          <v-card class="rounded-lg elevation-2">
            <v-card-title class="font-weight-bold my-2 text-center">Add New Event</v-card-title>
            <v-divider />
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.event_name" label="Event Name" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.event_location" label="Location" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.start_date" label="Start Date" type="date" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.end_date" label="End Date" type="date" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.booth_price" label="Booth Price (₱)" type="number" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="newEvent.max_booths" label="Max Booths" type="number" />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model="newEvent.description" label="Event Description" rows="3" />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="newEvent.event_duration" label="Event Duration (e.g., 2 days)" />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="newEvent.status"
                      label="Event Status"
                      :items="['Upcoming', 'Active', 'Completed']"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-divider />
            <v-card-actions class="justify-end">
              <v-btn variant="text" color="grey-darken-1" @click="showAddDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="addEvent">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AdminAppLayout>
</template>
