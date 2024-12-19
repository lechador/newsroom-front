import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://localhost:8000/api/blog/login/', {
          username,
          password,
        })

        // Save tokens to state and localStorage
        this.accessToken = response.data.access_token
        this.refreshToken = response.data.refresh_token
        this.isAuthenticated = true

        localStorage.setItem('accessToken', this.accessToken)
        localStorage.setItem('refreshToken', this.refreshToken)

        // Redirect user after login
        router.push('/')
      } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message)
        throw error
      }
    },

    async register(username, email, password) {
      try {
        await axios.post('http://localhost:8000/api/blog/register/', {
          username,
          email,
          password,
        })

        // Optionally, log the user in automatically after registration
        await this.login(username, password)
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message)
        throw error
      }
    },

    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.isAuthenticated = false

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      router.push('/login')
    },

    async refreshAccessToken() {
      try {
        const response = await axios.post('http://localhost:8000/api/blog/refresh/', {
          refresh_token: this.refreshToken,
        })

        this.accessToken = response.data.access_token
        localStorage.setItem('accessToken', this.accessToken)
      } catch (error) {
        console.error('Token refresh failed:', error.response?.data?.message || error.message)
        this.logout()
      }
    },
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
})
