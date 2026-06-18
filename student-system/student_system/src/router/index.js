import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/LoginView.vue'),
    meta: { guest: true }
  },
  {
    path: '/',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '',          redirect: '/dashboard' },
      { path: 'dashboard', name: 'Dashboard',  component: () => import('../views/admin/Dashboard.vue') },
      { path: 'students',  name: 'Students',   component: () => import('../views/Students/List.vue') },
      { path: 'students/create', name: 'CreateStudent', component: () => import('../views/Students/Create.vue') },
      { path: 'students/:id/edit', name: 'EditStudent', component: () => import('../views/Students/Edit.vue') },
      { path: 'teachers',  name: 'Teachers',   component: () => import('../views/admin/Teachers.vue') },
      { path: 'classes',   name: 'Classes',    component: () => import('../views/admin/Classes.vue') },
      { path: 'attendance',name: 'Attendance', component: () => import('../views/admin/Attendance.vue') },
      { path: 'scores',    name: 'Scores',     component: () => import('../views/admin/Scores.vue') },
      { path: 'payments',  name: 'Payments',   component: () => import('../views/admin/PaymentManagement.vue') },
      { path: 'reports',   name: 'Reports',    component: () => import('../views/admin/Reports.vue') },
      { path: 'subjects',  name: 'Subjects',   component: () => import('../views/admin/Subjects.vue') },
      { path: 'users',     name: 'Users',      component: () => import('../views/admin/Users.vue') },
      { path: 'settings',  name: 'Settings',   component: () => import('../views/admin/Settings.vue') },
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'Login' }
  if (to.meta.guest && auth.isAuthenticated) return { path: '/dashboard' }
})

export default router