<template>
  <div class="container-fluid py-3" style="font-family: 'Kantumruy Pro', sans-serif;">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold text-secondary mb-0">📚 គ្រប់គ្រងមុខវិជ្ជាសិក្សា (Subjects)</h3>
      <button class="btn btn-primary btn-sm">➕ បន្ថែមមុខវិជ្ជា</button>
    </div>

    <div class="card shadow-sm border-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>កូដមុខវិជ្ជា</th>
              <th>ឈ្មោះមុខវិជ្ជា</th>
              <th>ចំនួនក្រេឌីត (Credit)</th>
              <th>ឆមាស (Semester)</th>
              <th>គ្រូទទួលបន្ទុក</th>
              <th>ការពិពណ៌នា</th>
              <th>ស្ថានភាព</th>
              <th class="text-center">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong class="text-danger">SUB-102</strong></td>
              <td>Advanced Web Development with Vue 3</td>
              <td class="text-center">3</td>
              <td>ឆមាសទី ១</td>
              <td>សៅ បូរី</td>
              <td>សិក្សាអំពី Composition API, Pinia, និង Router</td>
              <td><span class="badge bg-success">Active</span></td>
              <td class="text-center">
                <div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-warning">✏️</button>
                  <button class="btn btn-outline-danger">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>