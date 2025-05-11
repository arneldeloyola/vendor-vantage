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
    .in('status', ['pending'])
    .in('payment_status', ['pending']);

  if (error) {
    console.error('Failed to fetch bookings:', error)
    bookings.value = []
  } else {
    bookings.value = data
  }

  loading.value = false
}

const updateStatus = async (id, newStatus) => {
  const { error } = await supabase
    .from('vendor_bookings')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error(`Failed to update booking ${id}:`, error)
  } else {
    fetchBookings()
  }
}

const formatAmount = (amount) => getMoneyText(amount)
const formatDate = (dateString) => prepareDate(dateString)

onMounted(fetchBookings)
</script>

<template>
  <AdminAppLayout style="background-color: #e0f2f1;">
    <template #content>
      <v-container class="d-flex justify-center">
      <v-container fluid >
        <!-- Header Card -->
        <v-card class="mb-3 rounded-lg elevation-2 px-6 py-4" style="background-color: #ffffff;">
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="12" sm="8">
              <h1 class="font-weight-bold mb-1 text-teal darken-3">Vendor Bookings</h1>
              <p class="text-grey-darken-1 mb-0">
                Review and manage pending vendor reservations for booths.
              </p>
            </v-col>
          </v-row>
        </v-card>

        <!-- Table Card -->
        <v-card class="rounded-lg elevation-2 mb-6" style="background-color: #ffffff;">
          <v-card-title class="px-6 py-4 d-flex justify-space-between align-center">
            <span class="font-weight-bold text-teal darken-3"><h2>Pending Bookings</h2></span>
          </v-card-title>

          <v-divider />

          <v-card-text class="px-6 pb-6 pt-4">
            <v-data-table
              :items="bookings"
              :loading="loading"
              item-value="id"
              class="rounded border"
              density="comfortable"
              height="270"
              fixed-header
              :headers="[
                { title: 'No.', key: 'row_number' },
                { title: 'Booth #', key: 'booths.number' },
                { title: 'Event', key: 'booths.events.event_name' },
                { title: 'Payment', key: 'payment_status' },
                { title: 'Status', key: 'status' },
                { title: 'Date', key: 'created_at' },
                { title: 'Actions', key: 'actions', sortable: false },
              ]"
            >
              <!-- Row Number -->
              <template #[`item.row_number`]="{ index }">
                {{ index + 1 }}
              </template>

              <!-- Payment Status Chip -->
              <template #[`item.payment_status`]="{ item }">
                <v-chip
                  size="small"
                  :color="item.payment_status === 'completed' ? 'green' : 'warning'"
                  class="text-white"
                >
                  {{ item.payment_status }}
                </v-chip>
              </template>

              <!-- Booking Status Chip -->
              <template #[`item.status`]="{ item }">
                <v-chip
                  size="small"
                  :color="item.status === 'approved'
                    ? 'green'
                    : item.status === 'rejected'
                      ? 'red'
                      : 'grey'"
                  class="text-white"
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
                  icon="mdi-check"
                  variant="text"
                  size="small"
                  color="green"
                  @click="updateStatus(item.id, 'approved')"
                  :disabled="item.status === 'approved'"
                />
                <v-btn
                  icon="mdi-close"
                  variant="text"
                  size="small"
                  color="red"
                  @click="updateStatus(item.id, 'rejected')"
                  :disabled="item.status === 'rejected'"
                />
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
      </v-container>
    </template>
  </AdminAppLayout>
</template>

