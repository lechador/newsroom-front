// ActivateAccount.vue
<template>
  <div>
    <h2>Activate Your Account</h2>
    <p v-if="loading">Activating...</p>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">Your account has been successfully activated!</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      success: false,
      error: null,
    }
  },
  created() {
    const { uid, token } = this.$route.params

    this.activateAccount(uid, token)
  },
  methods: {
    async activateAccount(uid, token) {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/activate/${uid}/${token}`)
        this.success = true
      } catch (error) {
        this.error = 'Failed to activate account. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
