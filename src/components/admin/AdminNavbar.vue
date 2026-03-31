<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="@/assets/images/logo.png" alt="Sisidlan Inventory" class="navbar-logo">
      <span class="navbar-brand">SISIDLAN</span>
    </div>
    
    <div class="navbar-center">
      <div 
        v-for="item in navItems" 
        :key="item.page"
        class="nav-item" 
        :class="{ active: activePage === item.page }" 
        @click="changePage(item.page)"
      >
        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path :stroke-linecap="item.strokeLinecap || 'round'" 
                :stroke-linejoin="item.strokeLinejoin || 'round'" 
                :stroke-width="item.strokeWidth || '2'" 
                :d="item.iconPath" />
        </svg>
        <span>{{ item.label }}</span>
      </div>
    </div>
    
    <div class="navbar-right">
      <!-- Profile Dropdown -->
      <div class="profile-wrapper" @click.stop="toggleProfile" ref="profileRef">
        <div class="profile-info">
          <div class="avatar">
            <img :src="profileImage" alt="Admin Profile" class="profile-avatar" @error="handleImageError">
          </div>
          <span class="profile-name">{{ adminName }}</span>
          <svg class="dropdown-arrow" :class="{ rotated: showProfileDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <!-- Profile Dropdown Menu -->
        <div v-if="showProfileDropdown" class="profile-dropdown">
          <div class="dropdown-item" @click="goToProfile">
            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>My Profile</span>
          </div>
          <div class="dropdown-item" @click="goToSettings">
            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item logout-item" @click="logout">
            <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
      
      <!-- Theme Toggle Button -->
      <ThemeToggle />
    </div>
  </nav>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  name: 'AdminNavbar',
  components: {
    ThemeToggle
  },
  props: {
    activePage: {
      type: String,
      default: 'dashboard'
    },
    adminName: {
      type: String,
      default: 'Admin'
    }
  },
  data() {
    return {
      showProfileDropdown: false,
      profileImage: require('@/assets/images/admin_profile.jpg'),
      navItems: [
        {
          page: 'dashboard',
          label: 'Dashboard',
          iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        },
        {
          page: 'supplies',
          label: 'Supplies',
          iconPath: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        },
        {
          page: 'equipment',
          label: 'Equipment',
          iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.414 3.414H4.828c-1.781 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        },
        {
          page: 'reports',
          label: 'Reports',
          iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        }
      ]
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleProfile() {
      this.showProfileDropdown = !this.showProfileDropdown
    },
    handleClickOutside(event) {
      const profileWrapper = this.$refs.profileRef
      if (profileWrapper && !profileWrapper.contains(event.target)) {
        this.showProfileDropdown = false
      }
    },
    handleImageError(event) {
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2381ecff"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E'
    },
    changePage(page) {
      this.$emit('page-change', page)
    },
    goToProfile() {
      this.showProfileDropdown = false
      this.$emit('go-to-profile')
    },
    goToSettings() {
      this.showProfileDropdown = false
      this.$emit('go-to-settings')
    },
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
/* Copy all navbar-related styles from your original file here */
.navbar {
  background: var(--card-bg);
  padding: 0 2rem;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  z-index: 10;
  flex-shrink: 0;
  gap: 2rem;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.navbar-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.navbar-center {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-secondary);
  font-weight: 500;
  border-radius: 0.5rem;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  transform: translateY(-1px);
}

.nav-item.active {
  background: var(--accent-dark);
  color: white;
}

.nav-item.active .nav-icon {
  stroke: white;
}

@media (prefers-color-scheme: dark) {
  .nav-item:hover {
    background: #2d2d2d;
    color: #ffffff;
  }
  
  .nav-item.active {
    background: #1e40af;
    color: white;
  }
}

.nav-icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.8;
  transition: stroke 0.2s ease;
}

.nav-item span {
  font-size: 0.9rem;
  white-space: nowrap;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-wrapper {
  position: relative;
  cursor: pointer;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background 0.2s ease;
}

.profile-info:hover {
  background: var(--bg-secondary);
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-primary);
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  color: var(--text-secondary);
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.profile-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  width: 220px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
}

.dropdown-icon {
  width: 18px;
  height: 18px;
}

.dropdown-divider {
  height: 1px;
  background: var(--border-color);
  margin: 0.25rem 0;
}

.logout-item {
  color: var(--error);
}

.logout-item:hover {
  background: rgba(239, 68, 68, 0.1);
}

@media (max-width: 1024px) {
  .navbar {
    padding: 0 1rem;
    gap: 1rem;
  }
  
  .navbar-brand {
    font-size: 1rem;
  }
  
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
  
  .nav-icon {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 1rem;
  }
  
  .navbar-brand {
    display: none;
  }
  
  .profile-name {
    display: none;
  }
}
</style>