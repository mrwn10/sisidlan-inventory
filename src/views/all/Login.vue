<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>SISIDLAN</h1>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
            placeholder="admin@example.com"
            autocomplete="email"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            required
            placeholder="••••••••"
            autocomplete="current-password"
          >
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else>Loading...</span>
        </button>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </form>

      <!-- Demo Credentials Notes -->
      <div class="demo-notes">
        <div class="notes-header">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Demo Credentials</span>
        </div>
        <div class="credentials">
          <div class="credential-item admin" @click="setCredentials('admin@example.com', 'password')">
            <span class="badge">Admin</span>
            <span class="email">admin@example.com</span>
            <span class="password">password</span>
          </div>
          <div class="credential-item user" @click="setCredentials('user@example.com', 'password')">
            <span class="badge">User</span>
            <span class="email">user@example.com</span>
            <span class="password">password</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      
      try {
        // Admin login
        if (this.form.email === 'admin@example.com' && this.form.password === 'password') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('userRole', 'admin')
          this.$router.push('/admin-dashboard')
        } 
        // User login
        else if (this.form.email === 'user@example.com' && this.form.password === 'password') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('userRole', 'user')
          this.$router.push('/user-dashboard')
        } 
        else {
          throw new Error('Invalid credentials')
        }
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    },
    setCredentials(email, password) {
      this.form.email = email
      this.form.password = password
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-card {
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);
  background: var(--input-bg);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(129, 236, 255, 0.1);
}

.form-group input::placeholder {
  color: var(--text-secondary);
  opacity: 0.5;
}

.login-btn {
  background: var(--accent-primary);
  color: var(--bg-primary);
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(129, 236, 255, 0.3);
}

.login-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--error);
  color: var(--error);
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
}

/* Demo Notes Styles */
.demo-notes {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.notes-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.info-icon {
  width: 16px;
  height: 16px;
}

.credentials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.credential-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.credential-item:hover {
  transform: translateX(4px);
  border-color: var(--accent-primary);
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.credential-item.admin .badge {
  background: rgba(129, 236, 255, 0.2);
  color: var(--accent-primary);
}

.credential-item.user .badge {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success);
}

.email, .password {
  font-size: 0.75rem;
  font-family: monospace;
}

.email {
  color: var(--text-primary);
  flex: 1;
}

.password {
  color: var(--text-secondary);
}

.note-text {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 0.5rem;
}
</style>