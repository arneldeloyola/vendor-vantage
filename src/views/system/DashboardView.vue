<script setup>
import SideNavigation from '@/components/layout/SideNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'

// Control the visibility of the drawer
const isDrawerVisible = ref(true)
// Carousel items
const items = [
  {
    src: '/public/images/vendo1.jpg',
  },
  {
    src: '/public/images/vendo2.jpg',
  },
  {
    src: '/public/images/vendo3.jpg',
  },
  {
    src: '/public/images/vendo4.jpg',
  },
]
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <!-- Side Navigation -->
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <!-- Main Content -->
    <template #content>
      <v-container fluid class="px-5" style="background: rgba(220, 206, 63, 0.81)">
        <br />
        <br />
        <v-row class="d-flex justify-center px-5">
          <!-- First Column Carousel -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-col>

          <!-- Second Column Carousel -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-col>

          <!-- Third Column Carousel -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>

        <!-- Additional Spacing -->

        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
      </v-container>
    </template>
  </AppLayout>
</template>
