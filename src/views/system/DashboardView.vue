<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/SideNavigation.vue'

import { ref } from 'vue'

const isDrawerVisible = ref(true)

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
    :is-with-app-bar-nave-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container fluid class="px-5" style="background: rgba(220, 206, 63, 0.81)">
        <br />
        <br />
        <v-row class="d-flex justify-center px-5">
          <v-col cols="4" lg="4" class=""
            ><v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                variant="elevated"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item> </v-carousel
          ></v-col>
          <v-col cols="4" lg="4" class=""
            ><v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item> </v-carousel
          ></v-col>
          <v-col cols="4" lg="4" class=""
            ><v-carousel height="630px" hide-delimiters>
              <v-carousel-item
                class="border-xl rounded"
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
                cover
              ></v-carousel-item> </v-carousel
          ></v-col>
        </v-row>

        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
        <br /><br /><br />
      </v-container>
    </template>
  </AppLayout>
</template>
