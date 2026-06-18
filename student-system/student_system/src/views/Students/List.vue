<template>
  <div>
    <!-- Toolbar -->
    <div class="list-toolbar">
      <div class="toolbar-left">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input v-model="query" type="text" placeholder="Search by name, ID or email..."
            class="form-control" style="padding-left:36px" @input="currentPage=1" />
        </div>
        <select v-model="gradeFilter" class="form-control" style="width:160px" @change="currentPage=1">
          <option value="">All Grades</option>
          <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
        </select>
        <select v-model="statusFilter" class="form-control" style="width:140px" @change="currentPage=1">
          <option value="">All Status</option>
          <option>Active</option>
          <option>At Risk</option>
          <option>Failing</option>
          <option>Top Student</option>
        </select>
      </div>
      <div class="toolbar-right">
        <span class="result-count text-muted">{{ filtered.length }} students</span>
        <router-link to="/students/create" class="btn btn-primary">＋ Add Student</router-link>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div class="table-responsive">
        <table>
          <thead><tr>
            <th><input type="checkbox" v-model="selectAll" /></th>
            <th>Student</th>
            <th>Grade</th>
            <th>Score</th>
            <th>Status</th>
            <th>Fee Status</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr></thead>
          <tbody>
            <tr v-if="paginated.length === 0">
              <td colspan="8">
                <div class="empty-state">
                  <div class="icon">🎓</div>
                  <p>No students found. Try adjusting filters.</p>
                </div>
              </td>
            </tr>
            <tr v-for="s in paginated" :key="s.id" :class="{ selected: selected.includes(s.id) }">
              <td><input type="checkbox" :value="s.id" v-model="selected" /></td>
              <td>
                <div class="d-flex align-center gap-2">
                  <div class="avatar avatar-sm" :class="s.color">{{ s.initials }}</div>
                  <div>
                    <div class="fw-semibold">{{ s.name }}</div>
                    <div style="font-size:11px" class="text-muted">{{ s.studentId }} · {{ s.email }}</div>
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
              <td><span class="badge" :class="feeBadge(s.feeStatus)">{{ s.feeStatus }}</span></td>
              <td class="text-muted" style="font-size:12px">{{ s.joinDate }}</td>
              <td>
                <div class="d-flex gap-1">
                  <router-link :to="`/students/${s.id}/edit`" class="btn btn-icon" title="Edit">✏️</router-link>
                  <button class="btn btn-icon" @click="confirmDelete(s)" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="table-footer">
        <span class="text-muted" style="font-size:13px">
          Showing {{ (currentPage-1)*perPage+1 }}–{{ Math.min(currentPage*perPage, filtered.length) }} of {{ filtered.length }}
        </span>
        <div class="pagination">
          <button class="page-btn" :disabled="currentPage===1" @click="currentPage--">‹</button>
          <button v-for="p in totalPages" :key="p" class="page-btn" :class="{ active: p===currentPage }" @click="currentPage=p">{{ p }}</button>
          <button class="page-btn" :disabled="currentPage===totalPages" @click="currentPage++">›</button>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div class="modal-backdrop" v-if="deleteTarget" @click.self="deleteTarget=null">
      <div class="modal">
        <div class="modal-head">
          <h3>🗑️ Delete Student</h3>
          <button class="btn btn-icon" @click="deleteTarget=null">✕</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to remove <strong>{{ deleteTarget.name }}</strong> ({{ deleteTarget.studentId }})?</p>
          <p class="text-muted mt-2" style="font-size:13px">This action cannot be undone.</p>
        </div>
        <div class="modal-foot">
          <button class="btn btn-outline" @click="deleteTarget=null">Cancel</button>
          <button class="btn btn-danger" @click="doDelete">🗑️ Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStudentStore } from '../../stores/student'

const store = useStudentStore()
const route = useRoute()

const query = ref(route.query.q || '')
const gradeFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const perPage = 8
const selected = ref([])
const deleteTarget = ref(null)

watch(() => route.query.q, v => { if (v) { query.value = v; currentPage.value = 1 } })

const grades = ['Grade 9A','Grade 9B','Grade 9C','Grade 10A','Grade 10B','Grade 11A','Grade 11B','Grade 12A','Grade 12B']

const filtered = computed(() => store.search(query.value, gradeFilter.value, statusFilter.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paginated = computed(() => filtered.value.slice((currentPage.value-1)*perPage, currentPage.value*perPage))

const selectAll = computed({
  get: () => paginated.value.length > 0 && paginated.value.every(s => selected.value.includes(s.id)),
  set: v => { selected.value = v ? paginated.value.map(s => s.id) : [] }
})

function scoreColor(s) {
  if (s >= 80) return '#22c55e'
  if (s >= 60) return '#f59e0b'
  return '#ef4444'
}
function statusBadge(s) {
  return { 'Active':'badge-success','At Risk':'badge-warning','Failing':'badge-danger','Top Student':'badge-info' }[s]||'badge-gray'
}
function feeBadge(s) {
  return { 'Paid':'badge-success','Pending':'badge-warning','Overdue':'badge-danger' }[s]||'badge-gray'
}

function confirmDelete(s) { deleteTarget.value = s }
function doDelete() {
  if (deleteTarget.value) {
    store.remove(deleteTarget.value.id)
    deleteTarget.value = null
  }
}
</script>

<style scoped>
.list-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.toolbar-left { display: flex; gap: 10px; flex: 1; flex-wrap: wrap; }
.toolbar-right { display: flex; align-items: center; gap: 12px; }
.result-count { font-size: 13px; white-space: nowrap; }
.search-wrap { position: relative; flex: 1; min-width: 220px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; }

.table-footer { padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); }

tr.selected { background: var(--primary-bg) !important; }
</style>