<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const blogs = ref([])
const errorMessage = ref('')
const isLoading = ref(true)

const fetchBlogs = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/blog/blogs/')
    console.log(response)
    blogs.value = response.data.items
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to fetch blogs.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Blog Posts</h1>
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="blog in blogs" :key="blog.id" class="border rounded-lg p-4 shadow-md bg-white">
        <img
          v-if="blog.picture"
          :src="`http://localhost:8000${blog.picture}`"
          alt="Blog Picture"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <h2 class="text-xl font-semibold mt-2">{{ blog.title }}</h2>
        <p class="text-gray-600 mt-2">{{ blog.description }}</p>
        <p class="text-sm text-gray-500 mt-4">Author: {{ blog.author.username }}</p>
        <p class="text-sm text-gray-500">Category: {{ blog.category?.title }}</p>
        <p class="text-sm text-gray-500">
          Tags:
          <span
            v-for="tag in blog.tags"
            :key="tag.id"
            class="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
          >
            {{ tag.title }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
}
</style>
