<template>
  <div class="admin-equipment">
    <AdminNotification 
      :notification="notification" 
      @close="notification.show = false" 
    />

    <div class="header">
      <h1>Equipment Management</h1>
      <button class="add-btn" @click="openModal">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Equipment
      </button>
    </div>

    <AdminSuppliesTable 
      :items="items" 
      @edit="editItem"
      @delete="deleteItem"
    />

    <AdminSuppliesModal 
      :is-open="showModal"
      :is-editing="isEditing"
      :initial-form-data="formData"
      @save="saveItem"
      @close="closeModal"
    />
  </div>
</template>

<script>
import AdminNotification from '@/components/admin/AdminNotification.vue'
import AdminSuppliesTable from '@/components/admin/AdminSuppliesTable.vue'
import AdminSuppliesModal from '@/components/admin/AdminSuppliesModal.vue'

export default {
  name: 'AdminEquipment',
  components: {
    AdminNotification,
    AdminSuppliesTable,
    AdminSuppliesModal
  },
  data() {
    return {
      items: [],
      showModal: false,
      isEditing: false,
      editingId: null,
      notification: {
        show: false,
        type: 'success',
        message: ''
      },
      formData: {
        equipmentName: '',
        brand: '',
        quantity: 0,
        location: ''
      }
    }
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      const savedItems = localStorage.getItem('equipment-items')
      if (savedItems) {
        this.items = JSON.parse(savedItems)
      } else {
        this.items = [
          { id: 1, equipmentName: 'Printer', brand: 'HP', quantity: 2, location: 'Admin Office' },
          { id: 2, equipmentName: 'Projector', brand: 'Epson', quantity: 1, location: 'Conference Room' },
          { id: 3, equipmentName: 'Monitor', brand: 'Dell', quantity: 5, location: 'IT Office' },
          { id: 4, equipmentName: 'HDMI Cable', brand: 'Generic', quantity: 10, location: 'IT Office' },
          { id: 5, equipmentName: 'Extension Cord', brand: 'Belkin', quantity: 7, location: 'Storage Room' }
        ]
        this.saveToLocalStorage()
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('equipment-items', JSON.stringify(this.items))
    },
    openModal() {
      this.isEditing = false
      this.editingId = null
      this.formData = { equipmentName: '', brand: '', quantity: 0, location: '' }
      this.showModal = true
    },
    editItem(item) {
      this.isEditing = true
      this.editingId = item.id
      this.formData = { ...item }
      this.showModal = true
    },
    saveItem(formData) {
      try {
        if (this.isEditing) {
          const index = this.items.findIndex(i => i.id === this.editingId)
          if (index !== -1) {
            this.items[index] = { ...this.items[index], ...formData, id: this.editingId }
            this.showNotification('Equipment updated successfully!', 'success')
          }
        } else {
          const newId = this.items.length > 0 ? Math.max(...this.items.map(i => i.id)) + 1 : 1
          this.items.push({ id: newId, ...formData })
          this.showNotification('Equipment added successfully!', 'success')
        }
        this.saveToLocalStorage()
        this.closeModal()
      } catch (error) {
        this.showNotification('An error occurred. Please try again.', 'error')
      }
    },
    deleteItem(id) {
      if (confirm('Are you sure you want to delete this equipment?')) {
        try {
          this.items = this.items.filter(i => i.id !== id)
          this.saveToLocalStorage()
          this.showNotification('Equipment deleted successfully!', 'success')
        } catch (error) {
          this.showNotification('Failed to delete equipment. Please try again.', 'error')
        }
      }
    },
    closeModal() {
      this.showModal = false
      this.isEditing = false
      this.editingId = null
    },
    showNotification(message, type = 'success') {
      this.notification = { show: true, type, message }
      setTimeout(() => { this.notification.show = false }, 3000)
    }
  }
}
</script>

<style scoped>
/* Keep the same styles as AdminSupplies.vue */
.admin-equipment { padding: 2rem; max-width: 1200px; margin: 0 auto; background: var(--bg-primary); min-height: 100%; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
.header h1 { margin: 0; color: var(--text-primary); font-size: 1.875rem; font-weight: 600; }
.add-btn { display: flex; align-items: center; gap: 0.5rem; border: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; cursor: pointer; font-size: 0.875rem; font-weight: 600; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.light-theme .add-btn { background: #0f72ba; color: white; }
.light-theme .add-btn:hover { background: #0d5aa7; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
.dark-theme .add-btn { background: #003d7a; color: white; }
.dark-theme .add-btn:hover { background: #004fa8; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(129,236,255,0.2); }
.add-btn:active { transform: translateY(0); }
.btn-icon { width: 18px; height: 18px; stroke-width: 2; }
@media (max-width: 768px) { .admin-equipment { padding: 1rem; } .header { flex-direction: column; align-items: stretch; } .header h1 { text-align: center; font-size: 1.5rem; } .add-btn { justify-content: center; } }
</style>