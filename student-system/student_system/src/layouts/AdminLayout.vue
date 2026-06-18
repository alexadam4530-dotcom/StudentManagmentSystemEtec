<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="logo-area">
        <div class="logo-sticker">🎩</div>
        <transition name="fade">
          <div class="logo-text" v-if="!sidebarCollapsed">
            <strong>StudNet</strong>
            <span>Management System</span>
          </div>
        </transition>
      </div>

      <nav class="nav-menu">
        <div class="nav-section-label" v-if="!sidebarCollapsed">Main Menu</div>
        <router-link v-for="item in mainMenu" :key="item.to"
          :to="item.to" class="nav-item" active-class="active">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
          <span class="nav-badge" v-if="item.badge && !sidebarCollapsed">{{ item.badge }}</span>
        </router-link>

        <div class="nav-section-label" v-if="!sidebarCollapsed">Finance</div>
        <router-link v-for="item in financeMenu" :key="item.to"
          :to="item.to" class="nav-item" active-class="active">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
        </router-link>

        <div class="nav-section-label" v-if="!sidebarCollapsed">System</div>
        <router-link v-for="item in systemMenu" :key="item.to"
          :to="item.to" class="nav-item" active-class="active">
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-if="!sidebarCollapsed">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer" v-if="!sidebarCollapsed">
        <div class="user-card">
          <div class="avatar avatar-sm av-gold">A</div>
          <div class="user-info">
            <strong>{{ auth.user?.name || 'Admin User' }}</strong>
            <span>🎩 Super Admin</span>
          </div>
          <button class="logout-btn" @click="handleLogout" title="Logout">⇠</button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="main-wrap">
      <!-- Topbar -->
      <header class="topbar">
        <button class="sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed">
          <span>☰</span>
        </button>
        <div class="topbar-left">
          <h1 class="page-title font-nunito">{{ pageTitle }}</h1>
          <div class="breadcrumb">
            <span>StudNet</span>
            <span class="sep">›</span>
            <span>{{ pageTitle }}</span>
          </div>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search..." v-model="searchQuery" @keyup.enter="handleSearch" />
          </div>
          <div class="notif-btn" @click="showNotif = !showNotif">
            🔔
            <div class="notif-dot"></div>
          </div>
          <div class="top-avatar av-gold avatar avatar-sm">A</div>
        </div>
      </header>

      <!-- Page content -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const sidebarCollapsed = ref(false)
const searchQuery = ref('')
const showNotif = ref(false)

const mainMenu = [
  { to: '/dashboard',  icon: '🏠', label: 'Dashboard' },
  { to: '/students',   icon: '🎓', label: 'Students', badge: '248' },
  { to: '/teachers',   icon: '👨‍🏫', label: 'Teachers' },
  { to: '/classes',    icon: '🏫', label: 'Classes' },
  { to: '/attendance', icon: '📅', label: 'Attendance' },
  { to: '/scores',     icon: '📊', label: 'Scores' },
  { to: '/subjects',   icon: '📚', label: 'Subjects' },
]
const financeMenu = [
  { to: '/payments', icon: '💳', label: 'Payments' },
  { to: '/reports',  icon: '📈', label: 'Reports' },
]
const systemMenu = [
  { to: '/users',    icon: '👥', label: 'Users' },
  { to: '/settings', icon: '⚙️', label: 'Settings' },
]

const titles = {
  '/dashboard': 'Dashboard', '/students': 'Students', '/teachers': 'Teachers',
  '/classes': 'Classes', '/attendance': 'Attendance', '/scores': 'Scores',
  '/payments': 'Payments', '/reports': 'Reports', '/subjects': 'Subjects',
  '/users': 'Users', '/settings': 'Settings',
}
const pageTitle = computed(() => {
  for (const [path, title] of Object.entries(titles)) {
    if (route.path.startsWith(path)) return title
  }
  return 'Dashboard'
})

function handleLogout() {
  auth.logout()
  router.push('/login')
}
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/students', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.layout { display: flex; min-height: 100vh; background: var(--bg); }

.sidebar {
  width: 240px; background: var(--primary); display: flex;
  flex-direction: column; position: fixed; top: 0; left: 0;
  bottom: 0; z-index: 100; transition: width 0.3s ease; overflow: hidden;
}
.sidebar.collapsed { width: 64px; }

.logo-area {
  padding: 22px 18px 18px; display: flex; align-items: center;
  gap: 10px; flex-shrink: 0; border-bottom: 1px solid rgba(255,255,255,0.1);
}
.logo-sticker {
  width: 40px; height: 40px; background: white; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.logo-text strong { display: block; color: white; font-family: 'Nunito',sans-serif; font-size: 14px; font-weight: 900; line-height: 1.2; white-space: nowrap; }
.logo-text span { color: rgba(255,255,255,0.65); font-size: 10px; white-space: nowrap; }

.nav-menu { flex: 1; padding: 12px 0; overflow-y: auto; overflow-x: hidden; }
.nav-section-label {
  font-size: 10px; color: rgba(255,255,255,0.45);
  font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
  padding: 14px 18px 5px; white-space: nowrap;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 18px; color: rgba(255,255,255,0.75);
  font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.2s; text-decoration: none; white-space: nowrap;
  border-right: 3px solid transparent; position: relative;
}
.nav-item:hover { background: rgba(255,255,255,0.1); color: white; }
.nav-item.active {
  background: white; color: var(--primary); font-weight: 600;
  border-radius: 0 50px 50px 0; margin-right: 14px;
  border-right: none;
}
.nav-icon { font-size: 17px; width: 22px; text-align: center; flex-shrink: 0; }
.nav-label { flex: 1; }
.nav-badge {
  background: var(--gold); color: #333;
  font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px;
}

.sidebar-footer { padding: 14px; flex-shrink: 0; }
.user-card {
  background: rgba(255,255,255,0.13); border-radius: 12px;
  padding: 10px 12px; display: flex; align-items: center; gap: 8px;
}
.user-info { flex: 1; overflow: hidden; }
.user-info strong { display: block; color: white; font-size: 12px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-info span { color: rgba(255,255,255,0.6); font-size: 11px; }
.logout-btn {
  background: none; border: none; color: rgba(255,255,255,0.6);
  font-size: 16px; cursor: pointer; padding: 2px 4px; flex-shrink: 0;
}
.logout-btn:hover { color: white; }

.main-wrap { margin-left: 240px; flex: 1; display: flex; flex-direction: column; transition: margin-left 0.3s ease; min-height: 100vh; }
.sidebar.collapsed ~ .main-wrap { margin-left: 64px; }

.topbar {
  background: white; height: 62px; padding: 0 24px;
  display: flex; align-items: center; gap: 16px;
  border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50;
}
.sidebar-toggle {
  background: none; border: 1px solid var(--border-hover); border-radius: 8px;
  width: 34px; height: 34px; cursor: pointer; font-size: 16px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sidebar-toggle:hover { background: var(--primary-bg); border-color: var(--primary); }
.topbar-left { flex: 1; }
.page-title { font-size: 18px; font-weight: 900; line-height: 1.2; }
.breadcrumb { font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-top: 1px; }
.sep { opacity: 0.5; }

.topbar-right { display: flex; align-items: center; gap: 10px; }
.search-box {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg); border: 1px solid var(--border-hover);
  border-radius: 50px; padding: 7px 14px;
}
.search-box input { border: none; background: transparent; outline: none; font-size: 13px; width: 160px; font-family: inherit; }
.notif-btn { position: relative; cursor: pointer; font-size: 20px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.notif-dot { position: absolute; top: 5px; right: 5px; width: 8px; height: 8px; background: var(--pink); border-radius: 50%; border: 2px solid white; }
.top-avatar { cursor: pointer; }

.page-content { flex: 1; padding: 24px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>