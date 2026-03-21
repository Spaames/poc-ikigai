import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'

// Mock axios
vi.mock('@/lib/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

import { api } from '@/lib/api'

const mockResponse = {
  data: {
    token: 'jwt-abc-123',
    user: { id: '1', username: 'Alice' },
  },
}

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('est non authentifié par défaut', () => {
    const auth = useAuthStore()
    expect(auth.isAuthenticated).toBe(false)
    expect(auth.token).toBeNull()
  })

  it('login stocke le token', async () => {
    vi.mocked(api.post).mockResolvedValue(mockResponse)
    const auth = useAuthStore()
    await auth.login({ username: 'Alice', password: '12345678' })
    expect(auth.token).toBe('jwt-abc-123')
    expect(localStorage.getItem('token')).toBe('jwt-abc-123')
  })

  it('logout vide le store et localStorage', async () => {
    vi.mocked(api.post).mockResolvedValue(mockResponse)
    const auth = useAuthStore()
    await auth.login({ username: 'Alice', password: '12345678' })
    auth.logout()
    expect(auth.token).toBeNull()
    expect(auth.user).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('restoreSession récupère le token depuis localStorage', () => {
    localStorage.setItem('token', 'stored-token')
    const auth = useAuthStore()
    auth.restoreSession()
    expect(auth.token).toBe('stored-token')
    expect(auth.isAuthenticated).toBe(true)
  })
})