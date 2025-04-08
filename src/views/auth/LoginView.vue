<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="full-page-container">
        <div class="background-image-container">
          <img
            src="/public/images/vendorlogo.jpg"
            alt="Vendor Vantage Background"
            class="background-image"
          />
        </div>

        <div class="login-card-container">
          <v-card class="login-card" elevation="24">
            <v-card-title class="text-center">
              <img
                src="/public/images/vendorlogo.jpg"
                class="rounded-circle"
                alt="Vendor Logo"
                width="300"
                height="230"
              />
              <h2 class="font-weight-black mt-4">Login Form</h2>

              <v-divider class="my-3"></v-divider>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-2">
              <LoginForm></LoginForm>

              <v-divider class="my-3"></v-divider>
              <br />
              <h5 class="text-center">
                Don't have account?<RouterLink
                  to="/register"
                  class="text-primary font-weight-black"
                >
                  Click here to Register!</RouterLink
                >
              </h5>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.full-page-container {
  position: static;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.login-card-container {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 500px;
  max-width: 90%;
}

.login-card {
  padding: 24px;
  border-radius: 12px !important;
}

@media (max-width: 768px) {
  .login-card-container {
    right: 50%;
    transform: translate(50%, -50%);
    width: 90%;
  }

  .background-image {
    object-position: 100% center;
  }
}
</style>
