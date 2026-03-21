<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <button class="text-sm text-red-600 hover:underline" @click="logout">
          Se déconnecter
        </button>
      </div>
      <p class="text-gray-600">
        Bienvenue <strong>{{ auth.user?.username }}</strong> !
      </p>
    </div>
  </div>
</template>