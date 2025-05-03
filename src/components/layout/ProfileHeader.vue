<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

//  Utilize predefined vue functions
const router = useRouter()

//load variables
const userdata = ref({
  initials: '',
  email: '',
  fullname: '',
})

const formAction = ref({
  ...formActionDefault,
})

// logout functionality
const onLogout = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true
}

const { error } = await supabase.auth.signOut()
if (error) {
  console.error('Error during logout:', error)
}

formAction.value.formProcess = false
router.replace('/')

//Getting user information functionality
const getUser = async () => {
  const {
    data: {
      user: { user_metadata: metadata },
    },
  } = await supabase.auth.getUser()

  userdata.value.email = metadata.email
  userdata.value.fullname = metadata.fullname + '' + metadata.lastname
  userdata.value.initials = getAvatarText(userdata.value.fullname)
}

//Load functions during compoenent rendering
onMounted(() => {
  getUser()
})
</script>

<template>
  <v-menu min-width="200px" rounded>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="deep-orange-lighten-1" size="large">
          <span class="text-h5">{{ userdata.initials }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card class="mt-1">
      <v-card-text>
        <v-list :subtitle="userdata.email" :title="userData.fullname">
          <template #prepend>
            <v-avatar color="deep-orange-lighten-1" size="large">
              <span class="text-h5">{{ userdata.initials }}</span>
            </v-avatar>
          </template>
        </v-list>
        <v-divider class="my-3"></v-divider>
        <v-btn prepend-icon="mdi-wrench" variant="plain"> Account Settings</v-btn>

        <v-divider class="my-3"></v-divider>

        <v-btn
          prepend-icon="mdi-logout"
          variant="plain"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
