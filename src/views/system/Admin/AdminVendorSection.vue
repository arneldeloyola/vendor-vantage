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
    .in('status', ['approved'],
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
const updateStatus = async (id) => {
  console.log('Updating booking with ID:', id, 'Type:', typeof id)
  
  const { error } = await supabase.from('vendor_bookings')
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
      <v-card class="ma-4 pa-4" elevation="2" rounded>
        <v-card-title class="text-h6 font-weight-bold">All Vendors </v-card-title>

        <v-data-table
          :items="bookings"
          :loading="loading"
          class="rounded border"
          item-value="id"
          :headers="[
            { title: 'Vendor', key: 'vendors.shop_name' },
            { title: 'Booth #', key: 'booths.number' },
            { title: 'Event', key: 'booths.events.event_name' },
             { title: 'Status', key: 'status' },
            { title: 'Payment', key: 'payment_status' },
            { title: 'Amount', key: 'payment_amount' },
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

          <!-- Custom Cell: Booking Status -->
          <template #[`item.status`]="{ item }">
            <v-chip
              :color="
                item.status === 'approved' ? 'green' : item.status === 'rejected' ? 'red' : 'grey'
              "
              size="small"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- Custom Cell: Amount with proper formatting -->
          <template #[`item.payment_amount`]="{ item }">
            {{ formatAmount(item.payment_amount) }}
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
              :disabled="item.payment_status === 'completed'"
             @click="updateStatus(item.id)"
            />
          </template>
        </v-data-table>
      </v-card>
    </template>
  </AdminAppLayout>
</template>
