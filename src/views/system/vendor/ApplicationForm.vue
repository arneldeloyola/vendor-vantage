<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'

const businessOptions = ['Food with Drinks', 'Coffee and Beverages', 'Handcrafts']

const userData = ref({
  lastname: '',
  firstname: '',
  email: '',
  business: '',
  business_description: '',
  contactNo: ''
})

const boothOptions = ref([]) // Store booth numbers for the selected event
const eventOptions = ref([]) // Store available events
const selectedEventId = ref(null) // Stores the selected event ID

const businessType = ref('')
const number = ref(null)
const event_name = ref(null)
const productDescription = ref('')
const businessPermit = ref(null)

// Fetch user data
const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    userData.value.lastname = user.user_metadata?.lastname
    userData.value.firstname = user.user_metadata?.firstname
    userData.value.email = user.email
    userData.value.business = user.user_metadata?.business
    userData.value.business_description = user.user_metadata?.business_description
    userData.value.contactNo = user.user_metadata?.contactNo
  }
}

const applicantName = computed({
  get: () => `${userData.value.firstname || ''} ${userData.value.lastname || ''}`.trim(),
  set: (val) => {
    const [first, ...rest] = val.split(' ')
    userData.value.firstname = first || ''
    userData.value.lastname = rest.join(' ') || ''
  }
})


// Fetch available events
const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('id, event_name')
  
  if (error) {
    console.error(error)
  } else {
    eventOptions.value = data
  }
}

// Fetch available booths based on selected event
const getBooths = async (eventId) => {
  const { data, error } = await supabase
    .from('booths')
    .select('number')
    .eq('event_id', eventId)
    .eq('is_available', true) // Ensure the booth is available
  
  if (error) {
    console.error(error)
  } else {
    boothOptions.value = data.map(booth => booth.number)
  }
}

// Handle event change and fetch booths
const onEventChange = async (eventId) => {
  number.value = null // Clear previous booth selection
  await getBooths(eventId)
}


const submitForm = async () => {
  const selectedEvent = eventOptions.value.find(event => event.id === selectedEventId.value)
  const formData = {
    applicant_name: `${userData.value.firstname} ${userData.value.lastname}`,
    business_name: userData.value.business,
    contact_no: userData.value.contactNo,
    business_type: businessType.value,
    number: number.value,
    event_name: event_name.value,
    product_description: productDescription.value,
    business_permit: businessPermit.value
  }

  const { error } = await supabase
    .from('applications') // Assuming you have an 'applications' table for storing submissions
    .insert([formData])

  if (error) {
    console.error(error)
  } else {
    // Handle success (e.g., show a success message, redirect, etc.)
  }
}

const cancelForm = () => {
  // Handle form cancellation (reset the form or navigate away)
}

onMounted(() => {
  getUser()
  getEvents() // Fetch events when the component is mounted
})
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" class="pb-10 px-4 pt-6" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">Application Form</h1>
        <span class="text-caption text-grey-darken-1">Register your shop to get a slot</span>
      </div>

      <v-card elevation="5">
        <v-form class="px-4 py-4">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field v-model="applicantName" label="Name of Applicant" variant="outlined" disabled>
                <template #prepend-inner><v-icon color="teal">mdi-account</v-icon></template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="userData.business" label="Name of Store" variant="outlined" disabled>
                <template #prepend-inner><v-icon color="teal">mdi-store</v-icon></template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="userData.contactNo" label="Contact Number" variant="outlined" type="tel" pattern="[0-9]*" disabled>
                <template #prepend-inner><v-icon color="teal">mdi-phone</v-icon></template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="businessType"
                :items="businessOptions"
                label="Line of Business"
                variant="outlined"
                required
              >
                <template #prepend-inner><v-icon color="teal">mdi-briefcase</v-icon></template>
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="selectedEventId"
                :items="eventOptions"
                item-title="event_name"
                item-value="id"
                label="Event"
                variant="outlined"
                required
                @update:modelValue="onEventChange"
              >
                <template #prepend-inner><v-icon color="teal">mdi-calendar</v-icon></template>
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select
                v-model="number"
                :items="boothOptions"
                label="Booth Number"
                variant="outlined"
                required
              >
                <template #prepend-inner><v-icon color="teal">mdi-tag-outline</v-icon></template>
              </v-select>
            </v-col>

            <v-col cols="3">
              <v-file-input
                v-model="businessPermit"
                label="Upload Business Permit (Image Only)"
                accept="image/png, image/jpeg, image/jpg"
                variant="outlined"
                show-size
                required
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="productDescription"
                label="Brief Description of Products"
                variant="outlined"
                rows="3"
                auto-grow
                required
              >
                <template #prepend-inner><v-icon color="teal">mdi-note-text</v-icon></template>
              </v-textarea>
            </v-col>
          </v-row>

          <v-row justify="end" class="mt-4 justify-space-between mx-2">
            <v-btn color="teal" variant="elevated" @click="submitForm">Submit</v-btn>
            <v-btn color="red" variant="outlined" class="mr-2" @click="cancelForm">Cancel</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-sheet>
  </div>
</template>

