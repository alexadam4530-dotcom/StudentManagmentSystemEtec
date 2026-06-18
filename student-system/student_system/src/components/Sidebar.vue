<template>
  <div class="d-flex flex-column p-4 text-white" style="width: 280px; min-height: 100vh; background: var(--gz-sidebar);">
    <div class="d-flex align-items-center gap-3 mb-5 px-2">
      <div class="bg-primary rounded-3 d-flex align-items-center justify-content-center" style="width: 42px; height: 42px; background: var(--gz-primary) !important;">
        <span class="fs-4 fw-bold">🎓</span>
      </div>
      <div>
        <h5 class="fw-bold mb-0 tracking-tight">STUDENT MASTER</h5>
        <span class="text-muted small fs-7">v2.0 GenZ Edition</span>
      </div>
    </div>
    
    <ul class="nav nav-pills flex-column gap-2 mb-auto">
      <li v-for="menu in menus" :key="menu.path">
        <router-link :to="menu.path" class="nav-link text-white-50 d-flex align-items-center gap-3 px-3 py-2-5 rounded-3" active-class="gz-active-menu">
          <span class="fs-5">{{ menu.icon }}</span>
          <span class="fw-medium text-white">{{ menu.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const menus = [
  { name: 'ផ្ទាំងគ្រប់គ្រង', path: '/admin/dashboard', icon: '📊' },
  { name: 'សិស្សានុសិស្ស', path: '/admin/students', icon: '✨' },
  { name: 'គ្រូបង្រៀន', path: '/admin/teachers', icon: '⚡' },
  { name: 'មុខវិជ្ជាសិក្សា', path: '/admin/subjects', icon: '🔮' },
  { name: 'ថ្នាក់រៀន', path: '/admin/classes', icon: '🧩' },
  { name: 'ការកំណត់', path: '/admin/settings', icon: '⚙️' }
]
</script>

<style scoped>
.py-2-5 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.nav-link { transition: all 0.2s ease; border-radius: 12px !important; }
.nav-link:hover { background: rgba(255, 255, 255, 0.05); color: white !important; }
.gz-active-menu {
  background: var(--gz-primary) !important;
  color: white !important;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3) !important;
}
</style>