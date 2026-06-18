<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 shadow-sm">
    <div class="container-fluid justify-content-between">
      <span class="navbar-brand mb-0 h1 fs-5 text-secondary">ប្រព័ន្ធគ្រប់គ្រងសិស្សានុសិស្ស</span>
      
      <div class="d-flex align-items-center gap-3">
        <span class="fw-bold text-primary">👋 សួស្តី, {{ authStore.user?.username || 'Admin' }}</span>
        <button @click="handleLogout" class="btn btn-sm btn-outline-danger fw-bold">
          🛑 ចាកចេញ
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  if (confirm('តើអ្នកពិតជាចង់ចាកចេញពីប្រព័ន្ធមែនទេ?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>