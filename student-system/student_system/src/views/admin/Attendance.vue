<template>
  <div>
    <div class="page-top">
      <h2 class="font-nunito">📅 Attendance</h2>
      <div class="d-flex gap-2">
        <input type="date" class="form-control" v-model="selectedDate" style="width:160px" />
        <button class="btn btn-primary">💾 Save Attendance</button>
      </div>
    </div>

    <div class="stats-row">
      <div class="att-stat" v-for="s in summary" :key="s.label" :style="`--c:${s.color}`">
        <div class="att-val">{{ s.val }}</div>
        <div class="att-label">{{ s.icon }} {{ s.label }}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <div class="card-title"><span class="icon">📋</span> Mark Attendance — {{ selectedDate }}</div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-success" @click="markAll('Present')">✅ All Present</button>
          <button class="btn btn-sm btn-danger" @click="markAll('Absent')">❌ All Absent</button>
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead><tr><th>#</th><th>Student</th><th>Grade</th><th>Present</th><th>Absent</th><th>Late</th><th>Note</th></tr></thead>
          <tbody>
            <tr v-for="(s,i) in attendance" :key="s.id">
              <td class="text-muted" style="font-size:12px">{{ i+1 }}</td>
              <td>
                <div class="d-flex align-center gap-2">
                  <div class="avatar avatar-sm" :class="s.color">{{ s.initials }}</div>
                  <span class="fw-semibold">{{ s.name }}</span>
                </div>
              </td>
              <td class="text-muted" style="font-size:12px">{{ s.grade }}</td>
              <td><label class="radio-pill present"><input type="radio" :name="`att-${s.id}`" value="Present" v-model="s.status" />✅</label></td>
              <td><label class="radio-pill absent"><input type="radio" :name="`att-${s.id}`" value="Absent"  v-model="s.status" />❌</label></td>
              <td><label class="radio-pill late">  <input type="radio" :name="`att-${s.id}`" value="Late"    v-model="s.status" />⏰</label></td>
              <td><input type="text" class="form-control" v-model="s.note" placeholder="Optional note" style="font-size:12px;padding:5px 10px" /></td>
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
const selectedDate = ref(new Date().toISOString().split('T')[0])

const attendance = ref(store.students.slice(0,10).map(s => ({ ...s, status: 'Present', note: '' })))

const summary = computed(() => {
  const p = attendance.value.filter(s=>s.status==='Present').length
  const a = attendance.value.filter(s=>s.status==='Absent').length
  const l = attendance.value.filter(s=>s.status==='Late').length
  const total = attendance.value.length
  return [
    { label:'Present', val: p, icon:'✅', color:'#22c55e' },
    { label:'Absent',  val: a, icon:'❌', color:'#ef4444' },
    { label:'Late',    val: l, icon:'⏰', color:'#f59e0b' },
    { label:'Rate',    val: `${total ? Math.round(p/total*100) : 0}%`, icon:'📊', color:'#6C63FF' },
  ]
})

function markAll(status) { attendance.value.forEach(s => s.status = status) }
</script>

<style scoped>
.page-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.page-top h2 { font-size:20px; font-weight:900; }
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:16px; }
.att-stat { background:white; border-radius:var(--radius); border:1px solid var(--border); padding:18px; text-align:center; }
.att-val { font-family:'Nunito',sans-serif; font-size:28px; font-weight:900; color:var(--c); }
.att-label { font-size:12px; color:var(--text-muted); font-weight:600; margin-top:4px; }
.radio-pill { display:flex; align-items:center; justify-content:center; width:36px; height:32px; border-radius:8px; border:1px solid var(--border); cursor:pointer; font-size:16px; transition:all 0.15s; }
.radio-pill input { display:none; }
.radio-pill:has(input:checked) { background:var(--primary-bg); border-color:var(--primary); transform:scale(1.1); }
</style>