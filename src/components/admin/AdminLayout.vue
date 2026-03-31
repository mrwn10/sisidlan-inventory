<template>
  <div class="admin-layout">
    <!-- Navbar Component -->
    <AdminNavbar 
      :active-page="activePage"
      :admin-name="adminName"
      @page-change="handlePageChange"
      @go-to-profile="goToProfile"
      @go-to-settings="goToSettings"
      @logout="confirmLogout"
    />

    <!-- Dynamic Page Content -->
    <div class="main-content">
      <router-view />
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="modal-overlay" @click.self="closeLogoutModal">
      <div class="modal-container">
        <div class="modal-header">
          <svg class="modal-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <h3 class="modal-title">Confirm Logout</h3>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to logout?</p>
          <p class="modal-subtext">You will need to login again to access your account.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeLogoutModal">Cancel</button>
          <button class="btn-confirm" @click="performLogout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue'

export default {
  name: 'AdminLayout',
  components: {
    AdminNavbar
  },
  data() {
    return {
      adminName: 'Admin',
      activePage: 'dashboard',
      showLogoutModal: false
    }
  },
  watch: {
    '$route.name': {
      handler(newName) {
        if (newName) {
          // Extract the page name without "Admin" prefix
          const pageName = newName.replace('Admin', '').toLowerCase()
          this.activePage = pageName || 'dashboard'
        }
      },
      immediate: true
    }
  },
  mounted() {
    // Check authentication
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('userRole')
    const userName = localStorage.getItem('userName')
    
    if (!token || userRole !== 'admin') {
      this.$router.push('/login')
      return
    }
    
    if (userName) {
      this.adminName = userName
    }
  },
  methods: {
    handlePageChange(page) {
      // Convert page name to route name with "Admin" prefix
      const routeName = 'Admin' + page.charAt(0).toUpperCase() + page.slice(1)
      
      // Check if we're already on this route to avoid navigation errors
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName })
      }
    },
    goToProfile() {
      if (this.$route.name !== 'AdminProfile') {
        this.$router.push({ name: 'AdminProfile' })
      }
    },
    goToSettings() {
      if (this.$route.name !== 'AdminSettings') {
        this.$router.push({ name: 'AdminSettings' })
      }
    },
    confirmLogout() {
      // Show the confirmation modal
      this.showLogoutModal = true
    },
    closeLogoutModal() {
      this.showLogoutModal = false
    },
    performLogout() {
      // Clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
      
      // Close modal
      this.showLogoutModal = false
      
      // Redirect to login
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
}

.main-content {
  flex: 1;
  overflow: hidden;
  background: var(--bg-primary);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease;
}

.modal-container {
  background: var(--card-bg);
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease;
}

.modal-header {
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-icon {
  width: 28px;
  height: 28px;
  color: var(--error);
  stroke-width: 1.8;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.modal-subtext {
  color: var(--text-secondary);
  font-size: 0.875rem !important;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm {
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 0.875rem;
}

.btn-cancel {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-cancel:hover {
  background: var(--bg-tertiary);
  transform: translateY(-1px);
}

.btn-confirm {
  background: var(--error);
  color: white;
}

.btn-confirm:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    width: 95%;
    margin: 1rem;
  }
  
  .modal-header {
    padding: 1.25rem 1.25rem 0.5rem 1.25rem;
  }
  
  .modal-body {
    padding: 1.25rem;
  }
  
  .modal-footer {
    padding: 0.75rem 1.25rem 1.25rem 1.25rem;
  }
  
  .btn-cancel,
  .btn-confirm {
    padding: 0.5rem 1rem;
  }
}
</style>