<script setup>
import { onMounted } from 'vue'
import { useVendor } from '@/composables/system/useVendor'
import AdminAppLayout from '@/components/layout/AdminAppLayout.vue'

// Use the vendor composable
const { search, headers, filteredVendors, fetchVendors, viewDetails, verifyVendor, loading } =
  useVendor()

// Fetch vendors when component is mounted
onMounted(fetchVendors)
</script>

<template>
  <AdminAppLayout>
    <template #content>
      <v-container fluid>
        <v-card class="mx-4 my-4 pa-4" elevation="2" rounded>
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6 font-weight-bold">All Vendors</span>
            <v-text-field
              v-model="search"
              placeholder="Search vendors..."
              density="compact"
              variant="outlined"
              hide-details
              append-inner-icon="mdi-magnify"
              class="ma-2"
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredVendors"
            :loading="loading"
            class="rounded border"
            item-value="id"
          >
            <!-- Status column formatting -->
            <template #[`item.profile_status`]="{ item }">
              <v-chip
                v-if="item?.profile_status"
                :color="item.profile_status === 'Verified' ? 'success' : 'warning'"
                size="small"
              >
                {{ item.profile_status }}
              </v-chip>
            </template>
            <!-- Actions column -->
            <template #[`item.actions`]="{ item }">
              <v-menu>
                <template #activator="{ props }">
                  <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text" size="small" />
                </template>
                <v-list>
                  <v-list-item @click="viewDetails(item.raw)">
                    <v-list-item-title>View</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="verifyVendor(item.raw)"
                    :disabled="item.raw.profile_status === 'verified'"
                  >
                    <v-list-item-title>Verify</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </template>
  </AdminAppLayout>
</template>
