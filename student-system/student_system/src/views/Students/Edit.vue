<template>
  <div class="form-page">
    <div class="page-head">
      <router-link to="/students" class="back-btn">← Back</router-link>
      <h2 class="font-nunito">✏️ Edit Student</h2>
      <span class="badge badge-info ms-auto">{{ form.studentId }}</span>
    </div>

    <div v-if="!student" class="empty-state">
      <div class="icon">🔍</div><p>Student not found.</p>
    </div>

    <form v-else @submit.prevent="handleSubmit">
      <div class="form-grid">
        <div class="card">
          <div class="card-head"><div class="card-title"><span class="icon">👤</span> Personal Information</div></div>
          <div class="card-body">
            <div class="two-col">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input v-model="form.name" type="text" class="form-control" required />
              </div>
              <div class="form-group">
                <label class="form-label">Gender</label>
                <select v-model="form.gender" class="form-control">
                  <option>Male</option><option>Female</option>
                </select>
              </div>
            </div>
            <div class="two-col">
              <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input v-model="form.dob" type="date" class="form-control" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input v-model="form.phone" type="tel" class="form-control" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">Address</label>
              <input v-model="form.address" type="text" class="form-control" />
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-head"><div class="card-title"><span class="icon">📚</span> Academic Information</div></div>
          <div class="card-body">
            <div class="two-col">
              <div class="form-group">
                <label class="form-label">Grade / Class</label>
                <select v-model="form.grade" class="form-control">
                  <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Status</label>
                <select v-model="form.status" class="form-control">
                  <option>Active</option><option>At Risk</option><option>Failing</option><option>Top Student</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div class="two-col">
              <div class="form-group">
                <label class="form-label">Score (0–100)</label>
                <input v-model.number="form.score" type="number" min="0" max="100" class="form-control" />
              </div>
              <div class="form-group">
                <label class="form-label">Fee Status</label>
                <select v-model="form.feeStatus" class="form-control">
                  <option>Pending</option><option>Paid</option><option>Overdue</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Subjects Enrolled</label>
              <div class="subject-checkboxes">
                <label v-for="sub in allSubjects" :key="sub" class="check-item">
                  <input type="checkbox" :value="sub" v-model="form.subjects" />
                  <span>{{ sub }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <router-link to="/students" class="btn btn-outline">Cancel</router-link>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner" style="width:16px;height:16px;border-width:2px"></span>
          <span v-else>💾 Save Changes</span>
        </button>
      </div>
    </form>

    <div class="toast-container">
      <div class="toast success" v-if="toast">✅ {{ toast }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '../../stores/student'

const store = useStudentStore()
const route = useRoute()
const router = useRouter()
const loading = ref(false)
const toast = ref('')

const grades = ['Grade 9A','Grade 9B','Grade 9C','Grade 10A','Grade 10B','Grade 11A','Grade 11B','Grade 12A','Grade 12B']
const allSubjects = ['Mathematics','Sciences','English','Khmer Literature','History','Geography','Art','Physical Education','IT','Music']

const student = ref(null)
const form = reactive({ name:'',gender:'',dob:'',phone:'',email:'',address:'',grade:'',status:'Active',score:0,feeStatus:'Pending',subjects:[],studentId:'' })

onMounted(() => {
  const s = store.getById(route.params.id)
  if (s) {
    student.value = s
    Object.assign(form, { ...s, subjects: [...(s.subjects||[])] })
  }
})

async function handleSubmit() {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  store.update(route.params.id, { ...form })
  toast.value = `${form.name} updated successfully!`
  setTimeout(() => { toast.value = ''; router.push('/students') }, 1800)
  loading.value = false
}
</script>

<style scoped>
.form-page { display: flex; flex-direction: column; gap: 20px; }
.page-head { display: flex; align-items: center; gap: 12px; }
.page-head h2 { font-size: 20px; font-weight: 900; }
.back-btn { color: var(--primary); font-size: 13px; font-weight: 600; text-decoration: none; }
.back-btn:hover { text-decoration: underline; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; }
.subject-checkboxes { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.check-item { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; padding: 6px 10px; border: 1px solid var(--border); border-radius: var(--radius-xs); }
.check-item:has(input:checked) { background: var(--primary-bg); border-color: var(--primary); color: var(--primary); font-weight: 500; }
@media (max-width: 900px) {
  .form-grid { grid-template-columns: 1fr; }
  .two-col { grid-template-columns: 1fr; }
}
</style>