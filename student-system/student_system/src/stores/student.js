import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const COLORS = ['av-purple','av-pink','av-teal','av-gold','av-green','av-coral','av-blue','av-red']
let nextId = 100

function makeId() { return ++nextId }
function colorFor(name) { return COLORS[(name.charCodeAt(0) + name.charCodeAt(1||0)) % COLORS.length] }
function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()
}

const SAMPLE = [
  { id:1, name:'Sophea Rith',   studentId:'STU-001', grade:'Grade 10A', gender:'Female', dob:'2008-03-14', phone:'012-345-678', email:'sophea@school.edu', address:'Phnom Penh', score:88, status:'Active',   feeStatus:'Paid',    joinDate:'2023-09-01', subjects:['Math','Science','English'] },
  { id:2, name:'Kosal Vireak',  studentId:'STU-002', grade:'Grade 11B', gender:'Male',   dob:'2007-07-22', phone:'012-456-789', email:'kosal@school.edu',  address:'Siem Reap', score:75, status:'Active',   feeStatus:'Paid',    joinDate:'2023-09-01', subjects:['Math','Khmer','History'] },
  { id:3, name:'Dara Phea',     studentId:'STU-003', grade:'Grade 9C',  gender:'Male',   dob:'2009-01-05', phone:'012-567-890', email:'dara@school.edu',   address:'Battambang', score:60, status:'Active',  feeStatus:'Pending', joinDate:'2024-01-10', subjects:['English','Art','PE'] },
  { id:4, name:'Maly Bopha',    studentId:'STU-004', grade:'Grade 12A', gender:'Female', dob:'2006-11-18', phone:'012-678-901', email:'maly@school.edu',   address:'Phnom Penh', score:95, status:'Active',   feeStatus:'Paid',    joinDate:'2022-09-01', subjects:['Math','Science','English','History'] },
  { id:5, name:'Nara Seyha',    studentId:'STU-005', grade:'Grade 10B', gender:'Male',   dob:'2008-05-30', phone:'012-789-012', email:'nara@school.edu',   address:'Kampot',    score:45, status:'At Risk',  feeStatus:'Overdue', joinDate:'2023-09-01', subjects:['Math','Khmer'] },
  { id:6, name:'Channary Keo',  studentId:'STU-006', grade:'Grade 11A', gender:'Female', dob:'2007-09-12', phone:'012-890-123', email:'channary@school.edu', address:'Phnom Penh', score:82, status:'Active', feeStatus:'Paid',    joinDate:'2022-09-01', subjects:['Science','English','Math'] },
  { id:7, name:'Piseth Lim',    studentId:'STU-007', grade:'Grade 9A',  gender:'Male',   dob:'2009-04-08', phone:'012-901-234', email:'piseth@school.edu', address:'Siem Reap', score:70, status:'Active',   feeStatus:'Pending', joinDate:'2024-01-10', subjects:['Math','History','PE'] },
  { id:8, name:'Sreymom Pich',  studentId:'STU-008', grade:'Grade 12B', gender:'Female', dob:'2006-12-25', phone:'012-012-345', email:'sreymom@school.edu', address:'Phnom Penh', score:91, status:'Active',  feeStatus:'Paid',    joinDate:'2022-09-01', subjects:['Math','Science','English'] },
]

export const useStudentStore = defineStore('student', () => {
  const students = ref(SAMPLE.map(s => ({ ...s, color: colorFor(s.name), initials: initials(s.name) })))

  const total = computed(() => students.value.length)
  const active = computed(() => students.value.filter(s => s.status === 'Active').length)
  const atRisk = computed(() => students.value.filter(s => s.status === 'At Risk').length)
  const avgScore = computed(() => {
    if (!students.value.length) return 0
    return Math.round(students.value.reduce((a, s) => a + s.score, 0) / students.value.length)
  })

  function getById(id) { return students.value.find(s => s.id === +id) }

  function add(data) {
    const id = makeId()
    const name = data.name || 'New Student'
    students.value.unshift({
      ...data, id,
      studentId: `STU-${String(id).padStart(3,'0')}`,
      score: data.score || 0,
      status: data.status || 'Active',
      feeStatus: data.feeStatus || 'Pending',
      joinDate: data.joinDate || new Date().toISOString().split('T')[0],
      subjects: data.subjects || [],
      color: colorFor(name),
      initials: initials(name),
    })
    return id
  }

  function update(id, data) {
    const i = students.value.findIndex(s => s.id === +id)
    if (i === -1) return false
    const name = data.name || students.value[i].name
    students.value[i] = { ...students.value[i], ...data, color: colorFor(name), initials: initials(name) }
    return true
  }

  function remove(id) {
    const i = students.value.findIndex(s => s.id === +id)
    if (i !== -1) students.value.splice(i, 1)
  }

  function search(query, grade, status) {
    const q = query.toLowerCase()
    return students.value.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
      const matchG = !grade || s.grade === grade
      const matchS = !status || s.status === status
      return matchQ && matchG && matchS
    })
  }

  return { students, total, active, atRisk, avgScore, getById, add, update, remove, search }
})