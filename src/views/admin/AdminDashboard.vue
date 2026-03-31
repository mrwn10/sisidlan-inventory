<template>
  <div class="dashboard-page">
    <div class="cards-wrapper">
      <div class="cards-container">
        <!-- Scan QR Code Card -->
        <div class="card" @click="navigateTo('scan-qr')">
          <div class="card-icon scan-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h3 class="card-title">Scan QR Code</h3>
          <button class="card-btn">Proceed</button>
        </div>

        <!-- Supplies Card -->
        <div class="card" @click="navigateTo('supplies')">
          <div class="card-icon supplies-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="card-title">Supplies</h3>
          <button class="card-btn">Proceed</button>
        </div>

        <!-- Equipment Card -->
        <div class="card" @click="navigateTo('equipment')">
          <div class="card-icon equipment-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.414 3.414H4.828c-1.781 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="card-title">Equipment</h3>
          <button class="card-btn">Proceed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    navigateTo(section) {
      if (section === 'scan-qr') {
        this.$router.push('/admin/scan-qr')
      } else {
        this.$router.push(`/admin/${section}`)
      }
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.cards-wrapper {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.card {
  background: var(--card-bg);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-primary);
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.05);
}

.card-icon svg {
  width: 40px;
  height: 40px;
}

.scan-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.supplies-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.equipment-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.card-btn {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.card-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

@media (max-width: 768px) {
  .cards-wrapper {
    padding: 1rem;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
  }
  
  .card-icon svg {
    width: 30px;
    height: 30px;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
}
</style>