<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Equipment' : 'Add New Equipment' }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <form @submit.prevent="handleSave" class="modal-body">
          <div class="form-group">
            <label for="name">Equipment Name *</label>
            <select 
              id="name" 
              v-model="formData.name" 
              required
            >
              <option value="">Select equipment</option>
              <option value="Projector">Projector</option>
              <option value="Laptop">Laptop</option>
              <option value="Printer">Printer</option>
              <option value="Scanner">Scanner</option>
              <option value="Router">Router</option>
              <option value="Switch">Switch</option>
            </select>
          </div>

          <div class="form-group">
            <label for="brand">Brand *</label>
            <select 
              id="brand" 
              v-model="formData.brand" 
              required
              :disabled="!formData.name"
            >
              <option value="">{{ formData.name ? 'Select brand' : 'Select equipment first' }}</option>
              <option 
                v-for="brand in getAvailableBrands()" 
                :key="brand"
                :value="brand"
              >
                {{ brand }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="quantity">Quantity *</label>
            <input 
              type="number" 
              id="quantity" 
              v-model.number="formData.quantity" 
              required
              min="0"
              placeholder="0"
            >
          </div>
          
          <div class="form-group">
            <label for="location">Location *</label>
            <select 
              id="location" 
              v-model="formData.location" 
              required
            >
              <option value="">Select location</option>
              <option value="Server Room">Server Room</option>
              <option value="Admin Office">Admin Office</option>
              <option value="IT Lab">IT Lab</option>
              <option value="Storage Room">Storage Room</option>
            </select>
          </div>
        </form>
        
        <div class="modal-footer">
          <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          <button type="submit" class="save-btn" @click="handleSave">{{ isEditing ? 'Update' : 'Save' }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AdminEquipmentModal',
  props: {
    isOpen: { type: Boolean, required: true },
    isEditing: { type: Boolean, required: true },
    initialFormData: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        brand: '',
        quantity: 0,
        location: ''
      })
    }
  },
  emits: ['save', 'close'],
  data() {
    return {
      formData: { name: '', brand: '', quantity: 0, location: '' },
      brandMap: {
        'Projector': ['Epson', 'Canon', 'BenQ', 'ViewSonic'],
        'Laptop': ['Dell', 'HP', 'Lenovo', 'Asus'],
        'Printer': ['Canon', 'Epson', 'HP', 'Brother'],
        'Scanner': ['Fujitsu', 'Canon', 'Epson', 'HP'],
        'Router': ['TP-Link', 'Cisco', 'D-Link', 'Netgear'],
        'Switch': ['Cisco', 'Netgear', 'TP-Link', 'D-Link']
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) this.formData = { ...this.initialFormData }
    }
  },
  methods: {
    getAvailableBrands() {
      return this.formData.name ? this.brandMap[this.formData.name] || [] : []
    },
    handleSave() {
      if (!this.formData.name || !this.formData.brand || !this.formData.location || this.formData.quantity === '') {
        alert('Please fill in all required fields')
        return
      }
      this.$emit('save', this.formData)
    },
    closeModal() { this.$emit('close') }
  }
}
</script>

<style scoped>
/* Reuse the same styles as AdminSuppliesModal */
@import './AdminSuppliesModalStyles.css';
</style>