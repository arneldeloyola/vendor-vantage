<script setup>
import { ref } from 'vue'

// Form data
const vendorData = ref({
  businessName: 'Artisan Crafts',
  contactName: 'Jane Smith',
  email: 'jane@artisancrafts.com',
  phone: '555-123-4567',
  website: 'https://artisancrafts.com',
  description: 'Handcrafted jewelry and accessories made with sustainable materials.',
  instagram: 'artisan_crafts',
  facebook: 'ArtisanCraftsOfficial',
  twitter: '@username',
})

// Form submission handler
const saveChanges = () => {
  console.log('Saving vendor profile:', vendorData.value)
  // Add your API call or data processing here
}
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
                v-model="vendorData.businessName"
                label="Business Name"
                variant="outlined"
                prepend-inner-icon="mdi-store"
                density="comfortable"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="vendorData.contactName"
                label="Contact Name"
                variant="outlined"
                prepend-inner-icon="mdi-account"
                density="comfortable"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="vendorData.email"
                label="Email"
                variant="outlined"
                prepend-inner-icon="mdi-email"
                density="comfortable"
                type="email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="vendorData.phone"
                label="Phone"
                variant="outlined"
                prepend-inner-icon="mdi-phone"
                density="comfortable"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="vendorData.description"
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
          <v-btn color="teal" @click="saveChanges" variant="outlined"> Save Changes </v-btn>
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
