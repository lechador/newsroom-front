<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <div class="flex justify-between mb-4">
        <h2 class="text-xl font-bold">{{ isLogin ? 'Login' : 'Register' }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <div v-if="isLogin">
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              v-model="loginData.username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="loginData.password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <p v-if="message" class="text-red-500 text-sm mb-4">{{ message }}</p>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>

      <div v-else>
        <!-- Register Form -->
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              v-model="registerData.username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              v-model="registerData.email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              v-model="registerData.password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="registerData.confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <p v-if="message" class="text-red-500 text-sm mb-4">{{ message }}</p>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>

      <div class="mt-4 text-center">
        <button @click="toggleForm('login')" v-if="!isLogin" class="text-blue-500 hover:underline">
          Already have an account? Login
        </button>
        <button @click="toggleForm('register')" v-else class="text-blue-500 hover:underline">
          Don't have an account? Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, watch } from 'vue'

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isLogin = ref(true)
    const message = ref('')
    const loginData = ref({
      username: '',
      password: '',
    })
    const registerData = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    const toggleForm = (form) => {
      isLogin.value = form === 'login'
      message.value = ''
    }

    const resetForm = () => {
      loginData.value = { username: '', password: '' }
      registerData.value = { username: '', email: '', password: '', confirmPassword: '' }
      message.value = ''
    }

    watch(
      () => props.isOpen,
      (newVal) => {
        if (!newVal) resetForm()
      },
    )

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/blog/login/', loginData.value)
        message.value = 'Login successful!'
        emit('close')
      } catch (error) {
        message.value = error.response?.data?.message || 'Login failed. Please try again.'
      }
    }

    const handleRegister = async () => {
      if (registerData.value.password !== registerData.value.confirmPassword) {
        message.value = 'Passwords do not match.'
        return
      }
      try {
        const response = await axios.post('http://localhost:8000/api/blog/register/', {
          username: registerData.value.username,
          email: registerData.value.email,
          password: registerData.value.password,
        })
        message.value = 'Registration successful!'
        emit('close')
      } catch (error) {
        message.value = error.response?.data?.message || 'Registration failed. Please try again.'
      }
    }

    return {
      isLogin,
      message,
      loginData,
      registerData,
      toggleForm,
      handleLogin,
      handleRegister,
    }
  },
}
</script>
