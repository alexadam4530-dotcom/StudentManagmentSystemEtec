import apiClient from './api';

export default {
  // ទាញយកបញ្ជីសិស្សទាំងអស់
  getAllStudents() {
    return apiClient.get('/students');
  },
  
  // បញ្ចូលសិស្សថ្មី
  createStudent(studentData) {
    return apiClient.post('/students', studentData);
  },
  
  // កែប្រែទិន្នន័យសិស្ស
  updateStudent(id, studentData) {
    return apiClient.put(`/students/${id}`, studentData);
  },
  
  // លុបទិន្នន័យសិស្ស
  deleteStudent(id) {
    return apiClient.delete(`/students/${id}`);
  }
};