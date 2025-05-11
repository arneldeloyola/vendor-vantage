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

const boothOptions = ref([]) 
const eventOptions = ref([]) 
const selectedEventId = ref(null)

const businessType = ref('')
const number = ref(null)
const event_name = ref(null)
const productDescription = ref('')
const businessPermit = ref(null)

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

const getBooths = async (eventId) => {
  const { data, error } = await supabase
    .from('booths')
    .select('id, number') 
    .eq('event_id', eventId)
    .eq('is_available', true) 

  if (error) {
    console.error(error)
  } else {
    boothOptions.value = data.map(booth => booth.number)
  }
}

const onEventChange = async (eventId) => {
  number.value = null 
  await getBooths(eventId)
}

const submitForm = async () => {

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error("User fetch error:", userError)
    alert("Failed to retrieve user.")
    return
  }

  if (!number.value) {
    alert("Please select a booth.")
    return
  }

  const { data: boothData, error: boothError } = await supabase
    .from('booths')
    .select('id, number, event_id')
    .eq('number', number.value)
    .eq('event_id', selectedEventId.value)  
    .single()  

  if (boothError || !boothData) {
    console.error("Booth not found:", boothError)
    alert("Selected booth does not exist or is unavailable.")
    return
  }

  let permitUrl = ''
  if (businessPermit.value) {
    const file = businessPermit.value
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `permits/${user.id}/${fileName}` 

    const { error: uploadError } = await supabase.storage
      .from('permits')
      .upload(filePath, file)

    if (uploadError) {
      console.error("Permit upload failed:", uploadError)
      alert("Business permit upload failed.")
      return
    }

    const { data: publicUrlData } = supabase.storage
      .from('permits')
      .getPublicUrl(filePath)

    permitUrl = publicUrlData.publicUrl
  }

  const formData = {
    booth_id: boothData.id,
    user_id: user.id,
    status: 'pending',
    payment_status: 'pending', 
    permit_url: permitUrl 
  }

  const { error } = await supabase
    .from('vendor_bookings')
    .insert([formData])

  if (error) {
    console.error("Booking insert failed:", error)
    alert("Booking failed.")
  } else {
    alert("Booking submitted successfully!")
   
  }
}



onMounted(() => {
  getUser()
  getEvents() // Fetch events when the component is mounted
})
</script>
<template>
  <div class="mx-4 mt-n11">
    
      <v-card elevation="5" class="hover-card">
        <v-card-title class="px-6 py-4 d-flex justify-space-between align-center">
          <span class="font-weight-bold text-teal darken-3"><h2>My Bookings</h2></span>
        </v-card-title>
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
            <v-btn color="teal" variant="elevated" @click="submitForm" class="hover-btn">Submit</v-btn>
          </v-row>
        </v-form>
      </v-card>
  </div>
</template>

<style scoped>
.v-card {
  background-color: white; /* White background for the card */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  padding: 16px; /* Reduced padding inside the card */
  border-radius: 12px; /* Rounded corners */
  max-width: 800px; /* Set max width for the card */
  margin: 0 auto; /* Center the card horizontally */
}

/* Hover effect for cards */
.v-card:hover {
  transform: translateY(-8px); /* Lift the card */
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

/* Hover effect for submit button */
.hover-btn:hover {
  background-color: #00796b; /* Darker shade on hover */
  transform: translateY(-2px);
}

/* Hover effect specifically for cards displaying bookings */
.hover-card:hover {
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15); /* Slightly larger shadow */
}

/* Teal color for text */
.text-teal {
  color: #008080;
}

/* Input field padding */
.v-text-field,
.v-select,
.v-textarea {
  padding: 10px; /* Add padding to the fields */
}

/* Button styling */
.v-btn {
  border-radius: 20px;
  padding: 10px 24px;
  font-size: 0.875rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

/* Add space between the cards */
.mt-6 {
  margin-top: 24px;
}

.mt-4 {
  margin-top: 16px;
}
</style>
