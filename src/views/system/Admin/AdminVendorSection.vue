<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'
import { getMoneyText, prepareDate } from '@/utils/helpers'

const bookings = ref([])
const loading = ref(false)

const fetchBookings = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('vendor_bookings')
    .select(
      `
      id,
      status,
      payment_status,
      created_at,
      booths (
        number,
        events (
          event_name
        )
      )
    `,
    )
    .in('status', ['approved'], 'payment_status', ['pending'])

  if (error) {
    console.error('Failed to fetch bookings:', error)
    bookings.value = []
  } else {
    bookings.value = data
  }

  loading.value = false
}

// Updated updateStatus function
const updateStatus = async (id) => {
  console.log('Updating booking with ID:', id, 'Type:', typeof id)

  const { error } = await supabase
    .from('vendor_bookings')
    .update({ payment_status: 'completed' })
    .eq('id', id)

  if (error) {
    console.error(`Failed to update booking ${id}:`, error)
  } else {
    fetchBookings()
  }
}

// Format payment amount using the utility function
const formatAmount = (amount) => {
  return getMoneyText(amount)
}

// Format date using the utility function
const formatDate = (dateString) => {
  return prepareDate(dateString)
}

onMounted(fetchBookings)
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <v-container fluid class="py-6">
        <!-- Header Card -->
        <v-card class="mb-3 rounded-lg elevation-2 px-6 py-4">
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="12" sm="8">
              <h1 class="font-weight-bold mb-1">Vendor Management</h1>
              <p class="text-grey-darken-1 mb-0">Manage vendor bookings and payments</p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Vendor Table Card -->
        <v-card class="rounded-lg elevation-2 mb-6">
          <v-card-title class="px-6 py-4 d-flex justify-space-between align-center">
            <span class="font-weight-bold"><h2>Vendors List</h2></span>
          </v-card-title>

          <v-divider />

          <v-card-text class="px-6 pb-6 pt-4">
            <v-data-table
              :items="bookings"
              :loading="loading"
              class="rounded border"
              item-value="id"
              density="comfortable"
              height="500"
              fixed-header
              :headers="[
                { title: 'No.', key: 'row_number' },
                { title: 'Vendor', key: 'vendors.shop_name' },
                { title: 'Booth #', key: 'booths.number' },
                { title: 'Event', key: 'booths.events.event_name' },
                { title: 'Status', key: 'status' },
                { title: 'Payment', key: 'payment_status' },
                { title: 'Date', key: 'created_at' },
                { title: 'Actions', key: 'actions', sortable: false },
              ]"
            >
              <!-- Row Number -->
              <template #[`item.row_number`]="{ index }">
                {{ index + 1 }}
              </template>

              <!-- Payment Status -->
              <template #[`item.payment_status`]="{ item }">
                <v-chip
                  :color="item.payment_status === 'completed' ? 'success' : 'warning'"
                  size="small"
                >
                  {{ item.payment_status }}
                </v-chip>
              </template>

              <!-- Booking Status -->
              <template #[`item.status`]="{ item }">
                <v-chip
                  :color="
                    item.status === 'approved'
                      ? 'green'
                      : item.status === 'rejected'
                        ? 'red'
                        : 'grey'
                  "
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <!-- Date -->
              <template #[`item.created_at`]="{ item }">
                {{ formatDate(item.created_at) }}
              </template>

              <!-- Actions -->
              <template #[`item.actions`]="{ item }">
                <v-btn
                  size="small"
                  color="green"
                  icon="mdi-check"
                  :disabled="item.payment_status === 'completed'"
                  @click="updateStatus(item.id)"
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </AdminAppLayout>
</template>
