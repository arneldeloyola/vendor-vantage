<script setup>
import { ref } from 'vue'

const applicantName = ref('')
const storeName = ref('')
const contactNumber = ref('')
const businessType = ref('')
const boothNumber = ref('')
const productDescription = ref('')
const businessPermit = ref(null)

const businessOptions = ['Food with Drinks', 'Coffee and Beverages', 'Handcrafts']

const submitForm = () => {
  console.log('Submitting Application:', {
    applicantName: applicantName.value,
    storeName: storeName.value,
    contactNumber: contactNumber.value,
    businessType: businessType.value,
    boothNumber: boothNumber.value,
    productDescription: productDescription.value,
    businessPermit: businessPermit.value,
  })
  alert('Application submitted successfully!')
}

const cancelForm = () => {
  applicantName.value = ''
  storeName.value = ''
  contactNumber.value = ''
  businessType.value = ''
  boothNumber.value = ''
  productDescription.value = ''
  businessPermit.value = null
}
</script>

<template>
  <div class="mx-4 mt-n11">
    <v-sheet :elevation="6" height="auto" width="auto" class="pb-10 px-4 pt-6" rounded>
      <div class="px-5 mb-6">
        <h1 class="text-h3 font-weight-bold">Application Form</h1>
        <span class="text-caption text-grey-darken-1">Register your shop to get a slot</span>
      </div>
      <div>
        <v-card elevation="5">
          <v-form class="px-4 py-4">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="applicantName"
                  label="Name of Applicant"
                  variant="outlined"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-account</v-icon>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="storeName" label="Name of Store" variant="outlined" required>
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-store</v-icon>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="contactNumber"
                  label="Contact Number"
                  variant="outlined"
                  type="tel"
                  pattern="[0-9]*"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-phone</v-icon>
                  </template>
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
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-briefcase</v-icon>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="boothNumber"
                  label="Booth Number Selected"
                  variant="outlined"
                  required
                >
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-tag-outline</v-icon>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="6">
                <v-file-input
                  v-model="businessPermit"
                  label="Upload Business Permit (Image Only)"
                  accept="image/png, image/jpeg, image/jpg"
                  variant="outlined"
                  show-size
                  required
                >
                </v-file-input>
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
                  <template #prepend-inner>
                    <v-icon color="teal">mdi-note-text</v-icon>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>

            <v-row justify="end" class="mt-4 justify-space-between mx-2">
              <v-btn color="teal" variant="elevated" @click="submitForm">Submit</v-btn>
              <v-btn color="red" variant="outlined" class="mr-2" @click="cancelForm">Cancel</v-btn>
            </v-row>
          </v-form>
          <br />
        </v-card>
      </div>
    </v-sheet>
  </div>
</template>
