<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'

const tab = ref('one')
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="3" class="mt-4 mx-2">
          <v-card class="rounded-lg" flat>
            <div class="d-flex justify-space-evenly bg-grey-lighten-1 rounded-lg pa-1">
              <v-btn
                :color="tab === 'one' ? 'white' : 'grey-lighten-1'"
                :variant="tab === 'one' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'one' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'one'"
              >
                <span class="text-subtitle-2">Overview</span>
              </v-btn>
              <v-btn
                :color="tab === 'two' ? 'white' : 'grey-lighten-1'"
                :variant="tab === 'two' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'two' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'two'"
              >
                <span class="text-subtitle-2">Bookings</span>
              </v-btn>
              <v-btn
                :color="tab === 'three' ? 'white' : 'grey-lighten-1'"
                :variant="tab === 'three' ? 'elevated' : 'text'"
                :class="[' rounded-lg', tab === 'three' ? 'text-black' : 'text-grey-darken-3']"
                @click="tab = 'three'"
              >
                <span class="text-subtitle-2">Events</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="9"></v-col>
        <v-col cols="12" md="12" class="mt-n4">
          <div v-if="tab === 'one'" class="pa-4">
            <v-row>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="3"> </v-col>
            </v-row>
          </div>
          <div v-else-if="tab === 'two'" class="pa-4">Tab Two Content</div>
          <div v-else-if="tab === 'three'" class="pa-4">Tab Three Content</div>
        </v-col>
      </v-row>

      <v-sheet class="mt-4" :height="200" :width="200" rounded />
    </template>
  </AppLayout>
</template>
