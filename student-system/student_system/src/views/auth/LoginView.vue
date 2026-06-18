<template>
  <div class="login-page">
    <div class="login-left">
      <div class="brand">
        <div class="brand-icon">🎩</div>
        <h1 class="font-nunito">StudNet</h1>
        <p>Student Management System</p>
      </div>
      <div class="features">
        <div class="feature-item" v-for="f in features" :key="f.text">
          <span class="feat-icon">{{ f.icon }}</span>
          <span>{{ f.text }}</span>
        </div>
      </div>
      <div class="decoration">
        <span>🎓</span><span>📚</span><span>✏️</span><span>🏆</span>
      </div>
    </div>

    <div class="login-right">
      <div class="login-card">
        <div class="login-header">
          <div class="login-sticker">🎩</div>
          <h2 class="font-nunito">Welcome Back!</h2>
          <p>Sign in to your admin account</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label class="form-label">📧 Email Address</label>
            <input v-model="form.email" type="email" class="form-control"
              placeholder="admin@school.edu" required />
          </div>
          <div class="form-group">
            <label class="form-label">🔒 Password</label>
            <div class="pass-wrap">
              <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                class="form-control" placeholder="Enter your password" required />
              <button type="button" class="pass-toggle" @click="showPass = !showPass">
                {{ showPass ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <div class="form-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.remember" />
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <div class="error-msg" v-if="error">⚠️ {{ error }}</div>

          <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
            <span v-if="loading" class="spinner" style="width:16px;height:16px;border-width:2px"></span>
            <span v-else>🎩 Sign In</span>
          </button>
        </form>

        <div class="demo-hint">
          <p>Demo credentials: <strong>admin@school.edu</strong> / <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({ email: 'admin@school.edu', password: 'admin123', remember: false })
const showPass = ref(false)
const loading = ref(false)
const error = ref('')

const features = [
  { icon: '🎓', text: 'Manage 200+ Students easily' },
  { icon: '👨‍🏫', text: 'Teacher & Class management' },
  { icon: '📊', text: 'Real-time scores & reports' },
  { icon: '💳', text: 'Fee & payment tracking' },
  { icon: '📅', text: 'Attendance monitoring' },
]

async function handleLogin() {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 900))
  if (form.email === 'admin@school.edu' && form.password === 'admin123') {
    auth.login({ name: 'Admin User', email: form.email, role: 'admin' }, 'demo-token-2026')
    router.push('/dashboard')
  } else {
    error.value = 'Invalid email or password. Please try again.'
  }
  loading.value = false
}
</script>

<style scoped>
.login-page { display: flex; min-height: 100vh; }

.login-left {
  flex: 1; background: var(--primary); display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: 48px;
  position: relative; overflow: hidden;
}
.login-left::before {
  content: ''; position: absolute; top: -60px; right: -60px;
  width: 200px; height: 200px; background: rgba(255,255,255,0.07); border-radius: 50%;
}
.login-left::after {
  content: ''; position: absolute; bottom: -40px; left: -40px;
  width: 150px; height: 150px; background: rgba(255,255,255,0.05); border-radius: 50%;
}

.brand { text-align: center; margin-bottom: 48px; position: relative; z-index: 1; }
.brand-icon { font-size: 64px; margin-bottom: 12px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); }
.brand h1 { font-size: 36px; font-weight: 900; color: white; line-height: 1.2; }
.brand p  { color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 6px; }

.features { display: flex; flex-direction: column; gap: 14px; position: relative; z-index: 1; }
.feature-item {
  display: flex; align-items: center; gap: 12px;
  color: rgba(255,255,255,0.85); font-size: 14px;
  background: rgba(255,255,255,0.1); border-radius: 10px;
  padding: 10px 16px;
}
.feat-icon { font-size: 20px; }

.decoration {
  position: absolute; bottom: 24px; display: flex; gap: 16px;
  font-size: 28px; opacity: 0.3; z-index: 1;
}

.login-right {
  width: 480px; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: var(--bg);
}

.login-card {
  background: white; border-radius: var(--radius); padding: 36px;
  border: 1px solid var(--border); width: 100%;
  box-shadow: 0 8px 40px rgba(108,99,255,0.1);
}

.login-header { text-align: center; margin-bottom: 32px; }
.login-sticker { font-size: 48px; margin-bottom: 10px; }
.login-header h2 { font-size: 24px; font-weight: 900; color: var(--text); }
.login-header p  { color: var(--text-muted); font-size: 13px; margin-top: 4px; }

.pass-wrap { position: relative; }
.pass-wrap .form-control { padding-right: 44px; }
.pass-toggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer; font-size: 16px; padding: 0;
}

.form-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.checkbox-label { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }
.forgot-link { font-size: 12px; color: var(--primary); text-decoration: none; font-weight: 600; }
.forgot-link:hover { text-decoration: underline; }

.error-msg { background: #fee2e2; color: #b91c1c; border-radius: var(--radius-xs); padding: 10px 14px; font-size: 13px; margin-bottom: 14px; }

.login-btn { width: 100%; justify-content: center; padding: 12px; font-size: 14px; }

.demo-hint { margin-top: 20px; text-align: center; background: var(--primary-bg); border-radius: var(--radius-xs); padding: 10px; }
.demo-hint p { font-size: 12px; color: var(--primary); }

@media (max-width: 768px) {
  .login-left { display: none; }
  .login-right { width: 100%; }
}
</style>