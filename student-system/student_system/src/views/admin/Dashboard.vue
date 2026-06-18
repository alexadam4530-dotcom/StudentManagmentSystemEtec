<template>
  <div class="dashboard">
    <!-- Greeting -->
    <div class="greeting-bar">
      <div>
        <h2 class="font-nunito">Good {{ timeGreeting }}, Admin! 🎩✨</h2>
        <p class="text-muted">{{ today }} — Let's manage brilliantly today</p>
      </div>
      <div class="greeting-actions">
        <router-link to="/students/create" class="btn btn-primary">
          ＋ Add Student
        </router-link>
        <router-link to="/reports" class="btn btn-outline">
          📊 View Reports
        </router-link>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card" v-for="s in stats" :key="s.label" :style="`--accent:${s.color}`">
        <div class="stat-sticker">{{ s.icon }}</div>
        <div class="stat-label">{{ s.label }}</div>
        <div class="stat-value" :style="`color:${s.color}`">{{ s.value }}</div>
        <div class="stat-change" :class="s.trend">
          {{ s.trend === 'up' ? '↑' : '↓' }} {{ s.change }}
        </div>
        <div class="stat-accent"></div>
      </div>
    </div>

    <!-- Row 2 -->
    <div class="content-grid">
      <!-- Recent Students -->
      <div class="card">
        <div class="card-head">
          <div class="card-title"><span class="icon">🧑‍🎓</span> Recent Students</div>
          <router-link to="/students" class="card-action">View all →</router-link>
        </div>
        <div class="table-responsive">
          <table>
            <thead><tr>
              <th>Student</th><th>Class</th><th>Score</th><th>Status</th><th></th>
            </tr></thead>
            <tbody>
              <tr v-for="s in recentStudents" :key="s.id">
                <td>
                  <div class="d-flex align-center gap-2">
                    <div class="avatar avatar-sm" :class="s.color">{{ s.initials }}</div>
                    <div>
                      <div class="fw-semibold">{{ s.name }}</div>
                      <div style="font-size:11px" class="text-muted">{{ s.studentId }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ s.grade }}</td>
                <td>
                  <div class="score-bar">
                    <div class="bar-bg"><div class="bar-fill" :style="`width:${s.score}%;background:${scoreColor(s.score)}`"></div></div>
                    <span class="fw-semibold" style="font-size:12px;min-width:24px">{{ s.score }}</span>
                  </div>
                </td>
                <td><span class="badge" :class="statusBadge(s.status)">{{ s.status }}</span></td>
                <td>
                  <router-link :to="`/students/${s.id}/edit`" class="btn btn-icon btn-sm">✏️</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events -->
      <div class="card">
        <div class="card-head">
          <div class="card-title"><span class="icon">📌</span> Upcoming Events</div>
          <span class="card-action" style="cursor:default">{{ currentMonth }}</span>
        </div>
        <div class="event-list">
          <div class="event-item" v-for="e in events" :key="e.title">
            <div class="event-dot" :style="`background:${e.bg}`">{{ e.icon }}</div>
            <div>
              <div class="fw-semibold" style="font-size:13px">{{ e.title }}</div>
              <div class="text-muted" style="font-size:11px;margin-top:2px">📅 {{ e.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Row 3 -->
    <div class="bottom-grid">
      <!-- Subjects -->
      <div class="card">
        <div class="card-head"><div class="card-title"><span class="icon">📚</span> Top Subjects</div></div>
        <div style="padding:16px">
          <div v-for="sub in subjects" :key="sub.name" class="subject-row">
            <div class="d-flex align-center gap-2 mb-1">
              <div class="subject-dot" :style="`background:${sub.color}`"></div>
              <span style="font-size:13px;font-weight:500">{{ sub.name }}</span>
              <span class="ms-auto fw-bold" style="font-size:13px">{{ sub.pct }}%</span>
            </div>
            <div class="bar-bg mb-2" style="height:8px">
              <div class="bar-fill" :style="`width:${sub.pct}%;background:${sub.color}`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Teachers -->
      <div class="card">
        <div class="card-head">
          <div class="card-title"><span class="icon">👩‍🏫</span> Top Teachers</div>
          <router-link to="/teachers" class="card-action">See all</router-link>
        </div>
        <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
          <div class="teacher-row" v-for="t in teachers" :key="t.name">
            <div class="avatar avatar-sm" :class="t.color">{{ t.icon }}</div>
            <div style="flex:1">
              <div class="fw-semibold" style="font-size:13px">{{ t.name }}</div>
              <div class="text-muted" style="font-size:11px">{{ t.subject }}</div>
            </div>
            <span class="badge badge-success">⭐ {{ t.rating }}</span>
          </div>
        </div>
      </div>

      <!-- Payments -->
      <div class="card">
        <div class="card-head">
          <div class="card-title"><span class="icon">💳</span> Recent Payments</div>
          <router-link to="/payments" class="card-action">See all</router-link>
        </div>
        <div style="padding:0 16px 8px">
          <div class="pay-row" v-for="p in payments" :key="p.name">
            <div class="pay-icon" :style="`background:${p.bg}`">{{ p.icon }}</div>
            <div style="flex:1">
              <div class="fw-semibold" style="font-size:13px">{{ p.name }}</div>
              <div class="text-muted" style="font-size:11px">{{ p.date }}</div>
            </div>
            <div class="fw-bold" :class="p.amount > 0 ? 'text-success' : 'text-danger'" style="font-size:13px">
              {{ p.amount > 0 ? '+' : '' }}${{ Math.abs(p.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStudentStore } from '../../stores/student'

const store = useStudentStore()

const now = new Date()
const hour = now.getHours()
const timeGreeting = computed(() => hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening')
const today = computed(() => now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }))
const currentMonth = computed(() => now.toLocaleDateString('en-US', { month:'long', year:'numeric' }))

const stats = computed(() => [
  { label:'Total Students', value: store.total,    icon:'🎓', color:'#6C63FF', trend:'up',   change:'+12 this month' },
  { label:'Teachers',       value: 18,             icon:'👨‍🏫', color:'#1DB5A0', trend:'up',   change:'+2 hired' },
  { label:'Attendance',     value: '91%',          icon:'📅', color:'#F5C842', trend:'down', change:'-3% vs yesterday' },
  { label:'Fees Collected', value: '$24K',         icon:'💰', color:'#FF6B9D', trend:'up',   change:'+8% this term' },
])

const recentStudents = computed(() => store.students.slice(0, 5))

function scoreColor(s) {
  if (s >= 80) return '#22c55e'
  if (s >= 60) return '#f59e0b'
  return '#ef4444'
}
function statusBadge(s) {
  return { 'Active': 'badge-success', 'At Risk': 'badge-warning', 'Failing': 'badge-danger', 'Top Student': 'badge-info' }[s] || 'badge-gray'
}

const events = [
  { title:'Mid-Term Exams',     date:'June 15, 2026', icon:'📝', bg:'#EEF0FF' },
  { title:'Art & Science Fair', date:'June 20, 2026', icon:'🎨', bg:'#fce7f3' },
  { title:'Graduation Ceremony',date:'July 5, 2026',  icon:'🎩', bg:'#fef3c7' },
  { title:'Sports Day',         date:'July 8, 2026',  icon:'⚽', bg:'#ccfbf1' },
  { title:'Awards Night',       date:'July 10, 2026', icon:'🏆', bg:'#dcfce7' },
]

const subjects = [
  { name:'Mathematics',    pct:87, color:'#6C63FF' },
  { name:'Sciences',       pct:82, color:'#1DB5A0' },
  { name:'Khmer Literature',pct:79, color:'#F5C842' },
  { name:'English',        pct:76, color:'#FF6B9D' },
  { name:'History',        pct:71, color:'#FF8C69' },
]

const teachers = [
  { name:'Mr. Sokha Chan',   subject:'Mathematics', icon:'👨‍🏫', color:'av-purple', rating:'4.9' },
  { name:'Ms. Ratana Lim',   subject:'Sciences',    icon:'👩‍🏫', color:'av-pink',   rating:'4.8' },
  { name:'Mr. Vanna Pich',   subject:'English',     icon:'🧑‍🏫', color:'av-gold',   rating:'4.7' },
  { name:'Ms. Chenda Keo',   subject:'Khmer Lit',   icon:'👩‍🏫', color:'av-green',  rating:'4.6' },
]

const payments = [
  { name:'Sophea Rith',  date:'June 10', icon:'💳', bg:'#EEF0FF', amount:120 },
  { name:'Kosal Vireak', date:'June 9',  icon:'💳', bg:'#fce7f3', amount:120 },
  { name:'Nara Seyha',   date:'Overdue', icon:'⚠️', bg:'#fee2e2', amount:-120 },
  { name:'Maly Bopha',   date:'June 8',  icon:'💳', bg:'#dcfce7', amount:120 },
]
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 20px; }

.greeting-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.greeting-bar h2 { font-size: 22px; font-weight: 900; }
.greeting-actions { display: flex; gap: 10px; }

.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
.stat-card {
  background: white; border-radius: var(--radius); padding: 18px;
  border: 1px solid var(--border); position: relative; overflow: hidden;
}
.stat-sticker { font-size: 30px; position: absolute; top: 14px; right: 14px; opacity: 0.9; }
.stat-label { font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
.stat-value { font-family: 'Nunito',sans-serif; font-size: 30px; font-weight: 900; line-height: 1; }
.stat-change { font-size: 11px; margin-top: 6px; }
.stat-change.up   { color: #22c55e; }
.stat-change.down { color: #ef4444; }
.stat-accent { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--accent); }

.content-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; }
.card-action { font-size: 12px; color: var(--primary); font-weight: 600; text-decoration: none; }
.card-action:hover { text-decoration: underline; }

.event-list { padding: 8px 20px 16px; display: flex; flex-direction: column; gap: 0; }
.event-item { display: flex; align-items: flex-start; gap: 12px; padding: 11px 0; border-bottom: 1px solid #fafafa; }
.event-item:last-child { border-bottom: none; }
.event-dot { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }

.bottom-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.subject-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.teacher-row { display: flex; align-items: center; gap: 10px; }
.pay-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #fafafa; }
.pay-row:last-child { border-bottom: none; }
.pay-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }

@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(2,1fr); }
  .content-grid { grid-template-columns: 1fr; }
  .bottom-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .bottom-grid { grid-template-columns: 1fr; }
}
</style>