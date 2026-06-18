<template>
  <div class="container-fluid py-3" style="font-family: 'Kantumruy Pro', sans-serif;">
    <h3 class="fw-bold text-secondary mb-4">⚙️ ការកំណត់ប្រព័ន្ធ (System Settings)</h3>

    <div class="card shadow-sm border-0 mb-4">
      <div class="card-header bg-white fw-bold text-primary">🏫 ព័ត៌មានសាលារៀន (School Information)</div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label small fw-bold">ឈ្មោះគ្រឹះស្ថាន/សាលារៀន</label>
            <input type="text" class="form-control" value="សាលារៀនជំនាន់ថ្មី អ៊ីតិក">
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">ឆ្នាំសិក្សាសកម្ម</label>
            <select class="form-select">
              <option>2025-2026</option>
              <option>2026-2027</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small fw-bold">ឡូហ្គោសាលា (Logo)</label>
            <input type="file" class="form-control">
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold text-danger">💾 ការពារ និងរក្សាទុកទិន្នន័យ (Database Backup)</div>
          <div class="card-body">
            <p class="text-muted small">សូមធ្វើការ Backup ទិន្នន័យជាប្រចាំដើម្បីជៀសវាងការបាត់បង់ព័ត៌មានសិស្សានុសិស្ស។</p>
            <button class="btn btn-danger btn-sm fw-bold">📦 ចាប់ផ្តើម Backup Database (SQL)</button>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold text-secondary">👥 តួនាទី និងសិទ្ធិប្រព័ន្ធ (User Roles)</div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span>Administrator</span>
              <span class="badge bg-danger">សិទ្ធិពេញលេញ</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span>Teacher (លោកគ្រូ-អ្នកគ្រូ)</span>
              <span class="badge bg-warning text-dark">មើល/បញ្ចូលពិន្ទុ & វត្តមាន</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>