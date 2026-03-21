import { defineStore } from 'pinia'
import { api } from '@/lib/api'
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth'
import { nextTick } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as AuthResponse['user'] | null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },

  actions: {
    async login(payload: LoginPayload) {
      const { data } = await api.post<AuthResponse>('/auth/login', payload)
      this._persist(data)
    },

    async register(payload: RegisterPayload) {
      const { data } = await api.post<AuthResponse>('/users/register', payload)
      this._persist(data)
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    restoreSession() {
      const token = localStorage.getItem('token')
      if (token) this.token = token
    },

    _persist(data: AuthResponse) {
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', data.token)
    },
  },
})