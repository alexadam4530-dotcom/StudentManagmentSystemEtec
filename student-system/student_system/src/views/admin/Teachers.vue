<template>
  <div>
    <div class="page-top">
      <h2 class="font-nunito">👨‍🏫 Teachers</h2>
      <button class="btn btn-primary">＋ Add Teacher</button>
    </div>
    <div class="stats-row">
      <div class="mini-stat" v-for="s in stats" :key="s.label" :style="`--c:${s.color}`">
        <span class="mini-icon">{{ s.icon }}</span>
        <div><div class="mini-val">{{ s.val }}</div><div class="mini-label">{{ s.label }}</div></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><div class="card-title"><span class="icon">👩‍🏫</span> All Teachers</div></div>
      <div class="table-responsive">
        <table>
          <thead><tr>
            <th>Teacher</th><th>Subject</th><th>Classes</th><th>Students</th><th>Rating</th><th>Status</th>
          </tr></thead>
          <tbody>
            <tr v-for="t in teachers" :key="t.name">
              <td>
                <div class="d-flex align-center gap-2">
                  <div class="avatar avatar-sm" :class="t.color">{{ t.icon }}</div>
                  <div>
                    <div class="fw-semibold">{{ t.name }}</div>
                    <div class="text-muted" style="font-size:11px">{{ t.email }}</div>
                  </div>
                </div>
              </td>
              <td>{{ t.subject }}</td>
              <td>{{ t.classes }}</td>
              <td>{{ t.students }}</td>
              <td><span style="color:#f59e0b;font-weight:700">⭐ {{ t.rating }}</span></td>
              <td><span class="badge badge-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
const stats = [
  { icon:'👨‍🏫', val:18,   label:'Total Teachers', color:'#6C63FF' },
  { icon:'📚', val:6,    label:'Subjects',        color:'#1DB5A0' },
  { icon:'🏫', val:12,   label:'Classes',         color:'#F5C842' },
  { icon:'⭐', val:'4.7',label:'Avg Rating',      color:'#FF6B9D' },
]
const teachers = [
  { name:'Mr. Sokha Chan',   email:'sokha@school.edu',  subject:'Mathematics',    classes:3, students:72, rating:'4.9', color:'av-purple', icon:'👨‍🏫' },
  { name:'Ms. Ratana Lim',   email:'ratana@school.edu', subject:'Sciences',       classes:2, students:48, rating:'4.8', color:'av-pink',   icon:'👩‍🏫' },
  { name:'Mr. Vanna Pich',   email:'vanna@school.edu',  subject:'English',        classes:3, students:65, rating:'4.7', color:'av-gold',   icon:'🧑‍🏫' },
  { name:'Ms. Chenda Keo',   email:'chenda@school.edu', subject:'Khmer Lit',      classes:2, students:44, rating:'4.6', color:'av-green',  icon:'👩‍🏫' },
  { name:'Mr. Dara Heng',    email:'dara@school.edu',   subject:'History',        classes:2, students:40, rating:'4.5', color:'av-teal',   icon:'👨‍🏫' },
  { name:'Ms. Bopha Srun',   email:'bopha@school.edu',  subject:'Art',            classes:2, students:36, rating:'4.4', color:'av-coral',  icon:'👩‍🏫' },
]
</script>
<style scoped>
.page-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.page-top h2 { font-size:20px; font-weight:900; }
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:16px; }
.mini-stat { background:white; border-radius:var(--radius); border:1px solid var(--border); padding:16px; display:flex; align-items:center; gap:12px; }
.mini-icon { font-size:28px; }
.mini-val { font-family:'Nunito',sans-serif; font-size:22px; font-weight:900; color:var(--c); }
.mini-label { font-size:11px; color:var(--text-muted); font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
</style>