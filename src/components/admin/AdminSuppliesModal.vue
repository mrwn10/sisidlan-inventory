<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        
        <form @submit.prevent="handleSave" class="modal-body">
          <div class="form-group">
            <label for="name">Item Name *</label>
            <select 
              id="name" 
              v-model="formData.name" 
              required
            >
              <option value="">Select item name</option>
              <option value="Ballpen">Ballpen</option>
              <option value="Ink">Ink</option>
              <option value="Bond Paper">Bond Paper</option>
              <option value="Photo Paper">Photo Paper</option>
              <option value="Stapler">Stapler</option>
              <option value="Pencil">Pencil</option>
              <option value="Eraser">Eraser</option>
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
              <option value="">{{ formData.name ? 'Select brand' : 'Select item name first' }}</option>
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
            <label for="stocks">Stocks *</label>
            <input 
              type="number" 
              id="stocks" 
              v-model.number="formData.stocks" 
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
              <option value="Admin Office">Admin Office</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
              <option value="4th Floor">4th Floor</option>
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
  name: 'AdminSuppliesModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    initialFormData: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        brand: '',
        stocks: 0,
        location: ''
      })
    }
  },
  emits: ['save', 'close'],
  data() {
    return {
      formData: {
        name: '',
        brand: '',
        stocks: 0,
        location: ''
      },
      brandMap: {
        'Ballpen': ['Pilot', 'Pentel', 'Mongol', 'Faber-Castell'],
        'Ink': ['Pelikan', 'Waterman', 'Parker', 'Sheaffer'],
        'Bond Paper': ['Copy Pro', 'Bond White', 'Paper Craft', 'Quality Paper'],
        'Photo Paper': ['Canon', 'Epson', 'HP', 'Kodak'],
        'Stapler': ['Max', 'Bostitch', 'Rexel', 'Arrow'],
        'Pencil': ['Faber-Castell', 'Staedtler', 'Mongol', 'Tombow'],
        'Eraser': ['Faber-Castell', 'Staedtler', 'Pilot', 'Trane']
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.formData = { ...this.initialFormData }
      }
    }
  },
  methods: {
    getAvailableBrands() {
      if (!this.formData.name) {
        return []
      }
      return this.brandMap[this.formData.name] || []
    },
    handleSave() {
      if (!this.formData.name || !this.formData.brand || !this.formData.location || this.formData.stocks === '') {
        alert('Please fill in all required fields')
        return
      }
      
      this.$emit('save', this.formData)
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: var(--card-bg);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  width: 90%;
  max-width: 450px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  z-index: 10000;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.modal-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  line-height: 1;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
}

.close-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

input,
select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-family: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(129, 236, 255, 0.1);
}

input::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}

select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

select option {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.cancel-btn,
.save-btn {
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.cancel-btn:hover {
  background: var(--bg-tertiary);
}

.light-theme .save-btn {
  background: #0f72ba;
  color: white;
}

.light-theme .save-btn:hover {
  background: #0d5aa7;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark-theme .save-btn {
  background: #003d7a;
  color: white;
}

.dark-theme .save-btn:hover {
  background: #004fa8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(129, 236, 255, 0.2);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
  }
}
</style>