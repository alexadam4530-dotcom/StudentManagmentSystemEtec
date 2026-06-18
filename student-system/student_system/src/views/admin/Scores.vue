<template>
  <div>
    <div class="page-top">
      <h2 class="font-nunito">📊 Scores & Grades</h2>
      <button class="btn btn-primary">＋ Enter Scores</button>
    </div>

    <div class="filter-bar">
      <select v-model="gradeFilter" class="form-control" style="width:150px">
        <option value="">All Grades</option>
        <option v-for="g in grades" :key="g">{{ g }}</option>
      </select>
      <select v-model="subjectFilter" class="form-control" style="width:160px">
        <option value="">All Subjects</option>
        <option v-for="s in subjects" :key="s">{{ s }}</option>
      </select>
    </div>

    <div class="card">
      <div class="card-head"><div class="card-title"><span class="icon">📝</span> Score Sheet</div></div>
      <div class="table-responsive">
        <table>
          <thead><tr>
            <th>Student</th>
            <th v-for="sub in visibleSubjects" :key="sub">{{ sub }}</th>
            <th>Average</th>
            <th>Rank</th>
          </tr></thead>
          <tbody>
            <tr v-for="s in scoreData" :key="s.id">
              <td>
                <div class="d-flex align-center gap-2">
                  <div class="avatar avatar-sm" :class="s.color">{{ s.initials }}</div>
                  <div>
                    <div class="fw-semibold">{{ s.name }}</div>
                    <div class="text-muted" style="font-size:11px">{{ s.grade }}</div>
                  </div>
                </div>
              </td>
              <td v-for="sub in visibleSubjects" :key="sub">
                <span class="score-pill" :style="`background:${scoreColor(s.scores[sub]||0)}20;color:${scoreColor(s.scores[sub]||0)}`">
                  {{ s.scores[sub] || '—' }}
                </span>
              </td>
              <td>
                <div class="score-bar">
                  <div class="bar-bg"><div class="bar-fill" :style="`width:${s.avg}%;background:${scoreColor(s.avg)}`"></div></div>
                  <span class="fw-bold" style="font-size:12px">{{ s.avg }}</span>
                </div>
              </td>
              <td>
                <span class="badge" :class="rankBadge(s.rank)">#{{ s.rank }}</span>
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
const gradeFilter = ref('')
const subjectFilter = ref('')
const grades = ['Grade 9A','Grade 10A','Grade 10B','Grade 11A','Grade 11B','Grade 12A']
const subjects = ['Mathematics','Sciences','English','Khmer Literature','History']

const visibleSubjects = computed(() => subjectFilter.value ? [subjectFilter.value] : subjects)

function rndScore(base) { return Math.min(100, Math.max(0, base + Math.floor(Math.random()*20)-8)) }

const scoreData = computed(() => {
  let list = store.students.filter(s => !gradeFilter.value || s.grade === gradeFilter.value)
    .map(s => {
      const scores = {}
      subjects.forEach(sub => { scores[sub] = rndScore(s.score) })
      const avg = Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/subjects.length)
      return { ...s, scores, avg }
    })
    .sort((a,b) => b.avg - a.avg)
    .map((s,i) => ({ ...s, rank: i+1 }))
  return list
})

function scoreColor(s) {
  if (s >= 80) return '#22c55e'
  if (s >= 60) return '#f59e0b'
  return '#ef4444'
}
function rankBadge(r) {
  if (r === 1) return 'badge-info'
  if (r <= 3) return 'badge-success'
  if (r <= 10) return 'badge-purple'
  return 'badge-gray'
}
</script>

<style scoped>
.page-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.page-top h2 { font-size:20px; font-weight:900; }
.filter-bar { display:flex; gap:10px; margin-bottom:16px; }
.score-pill { display:inline-block; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:700; }
</style>