<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'
import { getMoneyText, prepareDate } from '@/utils/helpers'

const bookings = ref([])
const loading = ref(false)

const fetchBookings = async () => {
  loading.value = true
  const { data, error } = await supabase.from('vendor_bookings').select(`
      id,
      status,
      payment_status,
      payment_amount,
      created_at,
      booths (
        number,
        events (
          event_name
        )
      ),
      vendors (
        shop_name
      )
    `)
    .in('status', ['pending'],
      'payment_status', ['pending']
    )
  if (error) {
    console.error('Failed to fetch bookings:', error)
    bookings.value = []
  } else {
    bookings.value = data
  }

  loading.value = false
}

// Updated updateStatus function
const updateStatus = async (id, newStatus) => {
  const updateData = { status: newStatus }

  const { error } = await supabase.from('vendor_bookings').update(updateData).eq('id', id)

  if (error) {
    console.error(`Failed to update booking ${id}:`, error)
  } else {
    fetchBookings() // Refetch bookings to reflect the changes
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
      <v-card class="ma-4 pa-4" elevation="2" rounded>
        <v-card-title class="text-h6 font-weight-bold">Vendor Bookings</v-card-title>

        <v-data-table
          :items="bookings"
          :loading="loading"
          class="rounded border"
          item-value="id"
          :headers="[
            { title: 'Vendor', key: 'vendors.shop_name' },
            { title: 'Booth #', key: 'booths.number' },
            { title: 'Event', key: 'booths.events.event_name' },
            { title: 'Payment', key: 'payment_status' },
            { title: 'Amount', key: 'payment_amount' },
            { title: 'Status', key: 'status' },
            { title: 'Date', key: 'created_at' },
            { title: 'Actions', key: 'actions', sortable: false },
          ]"
        >
          <!-- Custom Cell: Payment Status -->
          <template #[`item.payment_status`]="{ item }">
            <v-chip
              :color="item.payment_status === 'completed' ? 'success' : 'warning'"
              size="small"
            >
              {{ item.payment_status }}
            </v-chip>
          </template>

          <!-- Custom Cell: Amount with proper formatting -->
          <template #[`item.payment_amount`]="{ item }">
            {{ formatAmount(item.payment_amount) }}
          </template>

          <!-- Custom Cell: Booking Status -->
          <template #[`item.status`]="{ item }">
            <v-chip
              :color="item.payment_status === 'completed' ? 'success' : 'warning'"
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- Custom Cell: Date -->
          <template #[`item.created_at`]="{ item }">
            {{ formatDate(item.created_at) }}
          </template>

          <!-- Actions -->
          <template #[`item.actions`]="{ item }">
            <v-btn
              size="small"
              color="green"
              icon="mdi-check"
              @click="updateStatus(item.id, 'approved')"
              :disabled="item.status === 'approved'"
              variant="text"
            />
            <v-btn
              size="small"
              color="red"
              icon="mdi-close"
              @click="updateStatus(item.id, 'rejected')"
              :disabled="item.status === 'rejected'"
              variant="text"
            />
          </template>
        </v-data-table>
      </v-card>
    </template>
  </AdminAppLayout>
</template>
