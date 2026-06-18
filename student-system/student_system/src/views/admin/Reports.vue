<template>
  <div class="container-fluid py-3" style="font-family: 'Kantumruy Pro', sans-serif;">
    <h3 class="fw-bold text-secondary mb-4">🖨️ ប្រព័ន្ធរបាយការណ៍ & ឯកសារ (Reports & Certificates)</h3>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold">📊 ទាញចេញរបាយការណ៍ទូទៅ</div>
          <div class="card-body d-grid gap-2">
            <button class="btn btn-outline-primary text-start">📥 ទាញយកបញ្ជីឈ្មោះសិស្សសរុប (Excel)</button>
            <button class="btn btn-outline-success text-start">📥 ទាញយករបាយការណ៍វត្តមានប្រចាំខែ (PDF)</button>
            <button class="btn btn-outline-warning text-dark text-start">📥 ទាញយកតារាងចំណាត់ថ្នាក់សិស្សពូកែ (Excel)</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold">🪪 បោះពុម្ពកាតសិស្ស & វិញ្ញាបនបត្រ</div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col-12 mb-2">
                <input type="text" class="form-control" placeholder="វាយបញ្ចូលអត្តលេខសិស្ស...">
              </div>
              <div class="col-6">
                <button class="btn btn-danger w-100 btn-sm">🖨️ បោះពុម្ពកាតសិស្ស (Student Card)</button>
              </div>
              <div class="col-6">
                <button class="btn btn-dark w-100 btn-sm">📜 បោះពុម្ពលិខិតបញ្ជាក់ការសិក្សា</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>