<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="full-page-container">
        <div class="background-image-container">
          <img
            src="/images/v-background.jpg"
            alt="Vendor Vantage Background"
            class="background-image"
          />
        </div>

        <div class="register-card-container">
          <v-card class="register-card" elevation="24" style="background: rgba(220, 231, 117, 0.5)">
            <v-card-title class="text-center">
              <img
                src="/images/v-ventageLogo.png"
                class="rounded-circle border-lg shadow"
                alt="Vendor Logo"
                width="300"
                height="230"
              />
              <h5 class="font-weight-black mt-4">"Your Spot, Your Business, Your Advantage!"</h5>

              <v-divider class="my-3"></v-divider>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-2 rounded">
              <RegisterForm></RegisterForm>

              <v-divider class="my-3"></v-divider>
              <br />
              <h5 class="text-center">
                Already have account?<RouterLink to="/" class="text-success font-weight-black">
                  Click here to Login!</RouterLink
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

.register-card-container {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 500px;
  max-width: 90%;
}

.register-card {
  padding: 24px;
  border-radius: 12px !important;
}

/* For mobile responsiveness */
@media (max-width: 768px) {
  .register-card-container {
    right: 50%;
    transform: translate(50%, -50%);
    width: 90%;
  }

  .background-image {
    object-position: 100% center;
  }
}
</style>
