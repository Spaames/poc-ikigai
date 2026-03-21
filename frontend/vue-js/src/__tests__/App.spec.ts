import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { RouterView } from 'vue-router'
import App from '../App.vue'

// Mock vue-router pour éviter les erreurs hors contexte router
vi.mock('vue-router', () => ({
  RouterView: { template: '<div />' },
}))

describe('App', () => {
  it('monte sans erreur', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: { RouterView: true },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contient un RouterView', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
        stubs: { RouterView: true },
      },
    })
    expect(wrapper.findComponent({ name: "RouterView"}).exists()).toBe(true)
  })
})