<template>
  <div>
    <div class="page-top">
      <h2 class="font-nunito">💳 Payment Management</h2>
      <button class="btn btn-primary">＋ Record Payment</button>
    </div>

    <div class="stats-row">
      <div class="pay-stat" v-for="s in summary" :key="s.label" :style="`--c:${s.color}`">
        <div class="pay-icon-wrap">{{ s.icon }}</div>
        <div class="pay-val">{{ s.val }}</div>
        <div class="pay-label">{{ s.label }}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="icon">📋</span> Payment Records</div>
        <div class="d-flex gap-2">
          <select v-model="filter" class="form-control" style="width:140px;font-size:12px">
            <option value="">All Status</option>
            <option>Paid</option><option>Pending</option><option>Overdue</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead><tr>
            <th>Student</th><th>Amount</th><th>Type</th><th>Due Date</th><th>Paid Date</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id">
              <td>
                <div class="d-flex align-center gap-2">
                  <div class="avatar avatar-sm" :class="p.color">{{ p.initials }}</div>
                  <div>
                    <div class="fw-semibold">{{ p.name }}</div>
                    <div class="text-muted" style="font-size:11px">{{ p.grade }}</div>
                  </div>
                </div>
              </td>
              <td class="fw-bold" style="color:#1DB5A0">${{ p.amount }}</td>
              <td class="text-muted" style="font-size:12px">{{ p.type }}</td>
              <td class="text-muted" style="font-size:12px">{{ p.dueDate }}</td>
              <td class="text-muted" style="font-size:12px">{{ p.paidDate || '—' }}</td>
              <td><span class="badge" :class="feeBadge(p.status)">{{ p.status }}</span></td>
              <td>
                <button v-if="p.status!=='Paid'" class="btn btn-sm btn-success" @click="markPaid(p)">✅ Mark Paid</button>
                <span v-else class="text-muted" style="font-size:12px">✓ Done</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStudentStore } from '../../stores/student'

const store = useStudentStore()
const filter = ref('')
const types = ['Tuition Fee','Exam Fee','Activity Fee','Book Fee','Sport Fee']

const payments = ref(store.students.map((s,i) => ({
  id: s.id, name: s.name, grade: s.grade, color: s.color, initials: s.initials,
  amount: 120, type: types[i % types.length],
  dueDate: '2026-06-30',
  paidDate: s.feeStatus === 'Paid' ? '2026-06-0'+(i%9+1) : null,
  status: s.feeStatus,
})))

const filtered = computed(() => filter.value ? payments.value.filter(p=>p.status===filter.value) : payments.value)

const summary = computed(() => {
  const paid = payments.value.filter(p=>p.status==='Paid').length
  const pending = payments.value.filter(p=>p.status==='Pending').length
  const overdue = payments.value.filter(p=>p.status==='Overdue').length
  const total = paid * 120
  return [
    { icon:'💰', val:`$${total}`, label:'Total Collected', color:'#1DB5A0' },
    { icon:'✅', val: paid,     label:'Paid',             color:'#22c55e' },
    { icon:'⏳', val: pending,  label:'Pending',          color:'#f59e0b' },
    { icon:'⚠️', val: overdue,  label:'Overdue',          color:'#ef4444' },
  ]
})

function feeBadge(s) {
  return { 'Paid':'badge-success','Pending':'badge-warning','Overdue':'badge-danger' }[s]||'badge-gray'
}
function markPaid(p) {
  p.status = 'Paid'
  p.paidDate = new Date().toISOString().split('T')[0]
  store.update(p.id, { feeStatus: 'Paid' })
}
</script>

<style scoped>
.page-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.page-top h2 { font-size:20px; font-weight:900; }
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:16px; }
.pay-stat { background:white; border-radius:var(--radius); border:1px solid var(--border); padding:18px; text-align:center; position:relative; overflow:hidden; }
.pay-stat::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:var(--c); }
.pay-icon-wrap { font-size:28px; margin-bottom:8px; }
.pay-val { font-family:'Nunito',sans-serif; font-size:26px; font-weight:900; color:var(--c); }
.pay-label { font-size:11px; color:var(--text-muted); font-weight:600; text-transform:uppercase; letter-spacing:0.5px; margin-top:4px; }
</style>