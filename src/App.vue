<script setup>
import AuthModal from './components/AuthModal.vue'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isAuthModalOpen = ref(false)

const openAuthModal = () => {
  isAuthModalOpen.value = true
}

const closeAuthModal = () => {
  isAuthModalOpen.value = false
}
</script>

<template>
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto flex justify-between items-center p-4">
      <nav class="flex space-x-4">
        <RouterLink to="/" class="hover:text-gray-200 transition">Home</RouterLink>
        <RouterLink to="/about" class="hover:text-gray-200 transition">About</RouterLink>
      </nav>
      <button
        class="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        @click="openAuthModal"
      >
        Login/Register
      </button>
    </div>
  </header>

  <RouterView />

  <AuthModal v-if="isAuthModalOpen" :isOpen="isAuthModalOpen" @close="closeAuthModal" />
</template>
