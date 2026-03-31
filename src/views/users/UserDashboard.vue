<template>
  <div class="user-dashboard">
    <div class="dashboard-header">
      <h1>User Dashboard</h1>
      <p>Welcome to your inventory dashboard</p>
    </div>
    
    <div class="dashboard-stats">
      <div class="stat-card">
        <h3>Total Items</h3>
        <p class="stat-number">{{ stats.totalItems }}</p>
      </div>
      <div class="stat-card">
        <h3>Pending Requests</h3>
        <p class="stat-number">{{ stats.pendingRequests }}</p>
      </div>
      <div class="stat-card">
        <h3>Recent Activity</h3>
        <p class="stat-number">{{ stats.recentActivity }}</p>
      </div>
    </div>
    
    <div class="dashboard-actions">
      <button class="action-btn" @click="viewItems">
        View Inventory
      </button>
      <button class="action-btn" @click="requestItem">
        Request Item
      </button>
      <button class="action-btn" @click="viewRequests">
        My Requests
      </button>
    </div>
    
    <button @click="logout" class="logout-btn">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'UserDashboardView',
  data() {
    return {
      stats: {
        totalItems: 0,
        pendingRequests: 0,
        recentActivity: 0
      }
    }
  },
  created() {
    this.loadStats()
  },
  methods: {
    loadStats() {
      // TODO: Fetch real stats from API
      this.stats = {
        totalItems: 24,
        pendingRequests: 3,
        recentActivity: 12
      }
    },
    viewItems() {
      // TODO: Navigate to items view
      console.log('View inventory items')
    },
    requestItem() {
      // TODO: Navigate to request form
      console.log('Request new item')
    },
    viewRequests() {
      // TODO: Navigate to requests list
      console.log('View my requests')
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.user-dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.dashboard-header p {
  color: var(--text-secondary);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card h3 {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-primary);
}

.dashboard-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.action-btn {
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(129, 236, 255, 0.3);
}

.logout-btn {
  display: block;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  background: var(--error);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
</style>