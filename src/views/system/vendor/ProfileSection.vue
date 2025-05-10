<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/utils/supabase'
 // or fetch it from an API or parent component

const userData = ref({
  lastname: '',
  firstname: '',
  email: '',
  business: '',
  business_description: '',
  contactNo: ''
})

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

const saveChanges = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError) {
    console.error('Error fetching user:', userError)
    alert('Failed to fetch user information. Please try again.')
    return
  }

  if (user) {
    const { error } = await supabase.auth.updateUser({
      data: {
        lastname: userData.value.lastname,
        firstname: userData.value.firstname,
        business: userData.value.business,
        business_description: userData.value.business_description,
        contactNo: userData.value.contactNo
      }
    })

    if (error) {
      console.error('Error updating user data:', error)
      alert('Failed to save changes. Please try again.')
    } else {
      alert('Changes saved successfully!')
    }
  } else {
    alert('User not logged in')
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

onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-2 pt-3" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">Vendor Profile</h1>
        <span class="text-caption text-grey-darken-1">Manage your vendor information</span>
      </div>

      <v-card class="mb-6" elevation="6">
        <v-card-text>
          <h2 class="text-h6 font-weight-bold mb-1">Business Information</h2>
          <p class="text-subtitle-2 text-medium-emphasis mb-4">
            Update your vendor business details
          </p>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Business Name"
                v-model="userData.business"
                variant="filled"
                prepend-inner-icon="mdi-store"
                density="comfortable"
              >
            </v-text-field>
              
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Applicant Name"
                v-model="applicantName"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                density="comfortable"
                disabled
              ></v-text-field>


            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Email"
                v-model="userData.email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                density="comfortable"
                type="email"
                disabled
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="userData.contactNo"
                label="Phone"
                variant="outlined"
                prepend-inner-icon="mdi-phone"
                density="comfortable"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="userData.business_description"
                label="Business Description"
                prepend-inner-icon="mdi-information"
                variant="outlined"
                rows="3"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Save Changes Button -->
        <v-card-actions class="justify-end pa-4">
          <v-btn color="teal" variant="outlined" @click="saveChanges"> Save Changes </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </div>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
