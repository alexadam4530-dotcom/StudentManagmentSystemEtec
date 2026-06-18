<template>
  <div>
    <div class="page-top">
      <h2 class="font-nunito">🏫 Classes</h2>
      <button class="btn btn-primary">＋ Add Class</button>
    </div>
    <div class="classes-grid">
      <div class="class-card" v-for="c in classes" :key="c.name">
        <div class="class-header" :style="`background:${c.color}20`">
          <span class="class-icon">{{ c.icon }}</span>
          <div>
            <div class="class-name">{{ c.name }}</div>
            <div class="class-teacher">{{ c.teacher }}</div>
          </div>
        </div>
        <div class="class-body">
          <div class="class-stat">
            <span class="text-muted" style="font-size:12px">Students</span>
            <span class="fw-bold" :style="`color:${c.color}`">{{ c.students }}</span>
          </div>
          <div class="class-stat">
            <span class="text-muted" style="font-size:12px">Subjects</span>
            <span class="fw-bold">{{ c.subjects }}</span>
          </div>
          <div class="class-stat">
            <span class="text-muted" style="font-size:12px">Avg Score</span>
            <span class="fw-bold" :style="`color:${c.color}`">{{ c.avgScore }}%</span>
          </div>
        </div>
        <div class="class-footer">
          <span class="badge badge-success">Active</span>
          <button class="btn btn-sm btn-outline">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const classes = [
  { name:'Grade 9A',  teacher:'Mr. Sokha Chan',  students:28, subjects:6, avgScore:78, icon:'🏫', color:'#6C63FF' },
  { name:'Grade 9B',  teacher:'Ms. Ratana Lim',  students:26, subjects:6, avgScore:75, icon:'🏫', color:'#1DB5A0' },
  { name:'Grade 10A', teacher:'Mr. Vanna Pich',  students:30, subjects:7, avgScore:82, icon:'🏫', color:'#F5C842' },
  { name:'Grade 10B', teacher:'Ms. Chenda Keo',  students:29, subjects:7, avgScore:79, icon:'🏫', color:'#FF6B9D' },
  { name:'Grade 11A', teacher:'Mr. Dara Heng',   students:27, subjects:7, avgScore:84, icon:'🏫', color:'#FF8C69' },
  { name:'Grade 11B', teacher:'Ms. Bopha Srun',  students:25, subjects:7, avgScore:80, icon:'🏫', color:'#8B85FF' },
  { name:'Grade 12A', teacher:'Mr. Sokha Chan',  students:24, subjects:8, avgScore:88, icon:'🎓', color:'#6C63FF' },
  { name:'Grade 12B', teacher:'Ms. Ratana Lim',  students:22, subjects:8, avgScore:85, icon:'🎓', color:'#1DB5A0' },
]
</script>
<style scoped>
.page-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
.page-top h2 { font-size:20px; font-weight:900; }
.classes-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:16px; }
.class-card { background:white; border-radius:var(--radius); border:1px solid var(--border); overflow:hidden; }
.class-header { padding:16px; display:flex; align-items:center; gap:12px; }
.class-icon { font-size:28px; }
.class-name { font-weight:700; font-size:15px; }
.class-teacher { font-size:12px; color:var(--text-muted); margin-top:2px; }
.class-body { padding:14px 16px; display:flex; justify-content:space-between; border-top:1px solid var(--border); }
.class-stat { text-align:center; display:flex; flex-direction:column; gap:2px; }
.class-footer { padding:12px 16px; border-top:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
</style>