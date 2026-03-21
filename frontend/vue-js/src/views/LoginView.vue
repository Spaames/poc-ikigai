<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LoginPayload } from '@/types/auth'
import { nextTick } from 'vue'

const auth = useAuthStore()
const router = useRouter()
const form = reactive<LoginPayload>({ username: '', password: '' })
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(form)
    router.push('/dashboard')
    window.location.href = '/dashboard' // force push route for now - TO FIX
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Identifiants incorrects'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm bg-white rounded-xl shadow p-8 space-y-6">
      <h1 class="text-2xl font-semibold text-center">Connexion</h1>

      <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded p-3">
        {{ error }}
      </p>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
            v-model="form.username"
            type="text"
            required
            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {{ loading ? 'Connexion…' : 'Se connecter' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500">
        Pas encore de compte ?
        <RouterLink to="/register" class="text-indigo-600 hover:underline">S'inscrire</RouterLink>
      </p>
    </div>
  </div>
</template>