<template>
  <div class="container-fluid py-3" style="font-family: 'Kantumruy Pro', sans-serif;">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-secondary mb-0">👥 គ្រប់គ្រងគណនីអ្នកប្រើប្រាស់ (User Management)</h3>
      <button class="btn btn-primary btn-sm">➕ បង្កើតគណនីថ្មី</button>
    </div>

    <div class="card shadow-sm border-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>ឈ្មោះអ្នកប្រើប្រាស់ (Username)</th>
              <th>អ៊ីមែល (Email)</th>
              <th>តួនាទី (Role)</th>
              <th>សិទ្ធិចូលប្រើប្រាស់ (Permissions)</th>
              <th>ស្ថានភាព</th>
              <th class="text-center">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong class="text-primary">admin</strong></td>
              <td>admin@school.edu.kh</td>
              <td><span class="badge bg-danger">Administrator</span></td>
              <td>
                <span class="badge bg-light text-dark border me-1">Dashboard</span>
                <span class="badge bg-light text-dark border me-1">Student</span>
                <span class="badge bg-light text-dark border me-1">Teacher</span>
                <span class="badge bg-light text-dark border me-1">Score</span>
                <span class="badge bg-light text-dark border me-1">Settings</span>
              </td>
              <td><span class="badge bg-success">Active</span></td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-warning me-1">✏️</button>
                <button class="btn btn-sm btn-outline-danger">🗑️</button>
              </td>
            </tr>
            <tr>
              <td><strong class="text-primary">pov_sophat</strong></td>
              <td>sophat.teacher@school.edu.kh</td>
              <td><span class="badge bg-warning text-dark">Teacher</span></td>
              <td>
                <span class="badge bg-light text-dark border me-1">Attendance</span>
                <span class="badge bg-light text-dark border me-1">Score</span>
              </td>
              <td><span class="badge bg-success">Active</span></td>
              <td class="text-center">
                <button class="btn btn-sm btn-outline-warning me-1">✏️</button>
                <button class="btn btn-sm btn-outline-danger">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// កូដសម្រាប់គ្រប់គ្រងសិទ្ធិគណនី
</script>