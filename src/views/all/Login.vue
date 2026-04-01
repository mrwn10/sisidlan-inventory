<template>
  <div class="login-container">
    <!-- Animated background orbs -->
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <div class="login-card">
      <!-- Subtle grid overlay -->
      <div class="card-grid"></div>

      <div class="login-header">
        <div class="logo-mark">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="currentColor" opacity="0.9"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="currentColor" opacity="0.5"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="currentColor" opacity="0.5"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="currentColor" opacity="0.9"/>
          </svg>
        </div>
        <h1>SISIDLAN</h1>
        <p class="subtitle">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group" :class="{ focused: focusedField === 'email', filled: form.email }">
          <label for="email">
            <svg class="field-icon" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 6.5L10 11L17.5 6.5M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="you@example.com"
            autocomplete="email"
            @focus="focusedField = 'email'"
            @blur="focusedField = null"
          >
          <div class="field-line"></div>
        </div>

        <div class="form-group" :class="{ focused: focusedField === 'password', filled: form.password }">
          <label for="password">
            <svg class="field-icon" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="10" cy="13.5" r="1.25" fill="currentColor"/>
            </svg>
            Password
          </label>
          <div class="input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="form.password"
              required
              placeholder="••••••••"
              autocomplete="current-password"
              @focus="focusedField = 'password'"
              @blur="focusedField = null"
            >
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <svg v-if="!showPassword" viewBox="0 0 20 20" fill="none">
                <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <svg v-else viewBox="0 0 20 20" fill="none">
                <path d="M3 3l14 14M8.5 8.5A2.5 2.5 0 0112 12M5.3 5.3C3.7 6.5 2.5 8 2 10c1.3 3.4 4.5 6 8 6 1.5 0 2.9-.4 4.1-1.1M9 4.1C9.3 4 9.7 4 10 4c3.5 0 6.7 2.6 8 6-.4 1-.9 1.9-1.6 2.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="field-line"></div>
        </div>

        <button type="submit" class="login-btn" :disabled="loading" :class="{ loading }">
          <span class="btn-text" v-if="!loading">
            Sign In
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="btn-loader" v-else>
            <span></span><span></span><span></span>
          </span>
        </button>

        <transition name="fade">
          <div v-if="error" class="error-message">
            <svg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
              <path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ error }}
          </div>
        </transition>
      </form>

      <!-- Demo Credentials -->
      <div class="demo-notes">
        <div class="notes-divider">
          <span>Demo Credentials</span>
        </div>
        <div class="credentials">
          <div class="credential-item admin" @click="setCredentials('admin@example.com', 'password')">
            <span class="badge admin-badge">Admin</span>
            <div class="cred-info">
              <span class="cred-email">admin@example.com</span>
              <span class="cred-pass">password</span>
            </div>
            <svg class="cred-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="credential-item user" @click="setCredentials('user@example.com', 'password')">
            <span class="badge user-badge">User</span>
            <div class="cred-info">
              <span class="cred-email">user@example.com</span>
              <span class="cred-pass">password</span>
            </div>
            <svg class="cred-arrow" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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
      form: { email: '', password: '' },
      loading: false,
      error: null,
      focusedField: null,
      showPassword: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      await new Promise(r => setTimeout(r, 800))
      try {
        if (this.form.email === 'admin@example.com' && this.form.password === 'password') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('userRole', 'admin')
          this.$router.push('/admin-dashboard')
        } else if (this.form.email === 'user@example.com' && this.form.password === 'password') {
          localStorage.setItem('token', 'demo-token')
          localStorage.setItem('userRole', 'user')
          this.$router.push('/user-dashboard')
        } else {
          throw new Error('Invalid email or password.')
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
/* ── Base ── */
* { box-sizing: border-box; margin: 0; padding: 0; }

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: #0a0a14;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── Background orbs ── */
.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: float 8s ease-in-out infinite;
}
.orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%);
  top: -120px; left: -120px;
  animation-delay: 0s;
}
.orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%);
  bottom: -100px; right: -80px;
  animation-delay: -3s;
}
.orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent 70%);
  top: 50%; left: 55%;
  animation-delay: -6s;
}
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -20px) scale(1.05); }
  66% { transform: translate(-15px, 15px) scale(0.97); }
}

/* ── Glass card ── */
.login-card {
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 2.5rem 2.25rem;
  width: 100%;
  max-width: 420px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 32px 64px -16px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(99, 102, 241, 0.08);
  overflow: hidden;
}

/* Subtle grid texture inside card */
.card-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  border-radius: inherit;
}

/* ── Header ── */
.login-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.logo-mark {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.7));
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.25rem;
  color: #fff;
  box-shadow: 0 8px 24px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
}
.logo-mark svg { width: 28px; height: 28px; }

.login-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 5px;
  color: #fff;
  text-shadow: 0 0 40px rgba(99,102,241,0.5);
  margin-bottom: 0.4rem;
}
.subtitle {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.5px;
}

/* ── Form ── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  position: relative;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
  transition: color 0.2s;
}
.form-group.focused label { color: rgba(167, 139, 250, 0.9); }
.field-icon { width: 14px; height: 14px; flex-shrink: 0; }

.input-wrapper { position: relative; }

.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 3rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.25s;
  outline: none;
  letter-spacing: 0.3px;
}
.form-group:not(.input-wrapper) input { padding-right: 1rem; }
.form-group input::placeholder { color: rgba(255,255,255,0.2); }
.form-group input:focus,
.form-group.focused input {
  background: rgba(255,255,255,0.09);
  border-color: rgba(167,139,250,0.5);
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12), 0 0 20px rgba(99,102,241,0.08);
}

.field-line {
  position: absolute;
  bottom: 0; left: 0;
  height: 2px; width: 0;
  background: linear-gradient(90deg, #6366f1, #a855f7);
  border-radius: 2px;
  transition: width 0.3s ease;
}
.form-group.focused .field-line { width: 100%; }

.toggle-password {
  position: absolute;
  right: 0.75rem; top: 50%;
  transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(255,255,255,0.3);
  padding: 4px;
  transition: color 0.2s;
  display: flex; align-items: center;
}
.toggle-password:hover { color: rgba(255,255,255,0.7); }
.toggle-password svg { width: 18px; height: 18px; }

/* ── Submit button ── */
.login-btn {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.85rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 24px rgba(99,102,241,0.35);
  min-height: 50px;
}
.login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}
.login-btn:hover:not(:disabled)::before { opacity: 1; }
.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99,102,241,0.5);
}
.login-btn:active:not(:disabled) { transform: translateY(0); }
.login-btn:disabled { opacity: 0.55; cursor: not-allowed; }

.btn-text {
  display: flex; align-items: center; justify-content: center; gap: 0.6rem;
}
.btn-text svg { width: 18px; height: 18px; transition: transform 0.2s; }
.login-btn:hover:not(:disabled) .btn-text svg { transform: translateX(4px); }

/* Loader dots */
.btn-loader { display: flex; align-items: center; justify-content: center; gap: 5px; }
.btn-loader span {
  width: 7px; height: 7px;
  background: #fff; border-radius: 50%;
  animation: bounce 0.9s ease-in-out infinite;
}
.btn-loader span:nth-child(2) { animation-delay: 0.15s; }
.btn-loader span:nth-child(3) { animation-delay: 0.3s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

/* ── Error ── */
.error-message {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(239,68,68,0.25);
  color: #f87171;
  font-size: 0.85rem;
}
.error-message svg { width: 16px; height: 16px; flex-shrink: 0; }

/* ── Demo notes ── */
.demo-notes { margin-top: 1.75rem; }

.notes-divider {
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
}
.notes-divider::before {
  content: '';
  position: absolute;
  top: 50%; left: 0;
  width: 100%; height: 1px;
  background: rgba(255,255,255,0.08);
}
.notes-divider span {
  position: relative;
  background: transparent;
  padding: 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
  text-transform: uppercase;
  /* Need a bg so text masks the line — use the card bg color */
  background: #181826;
}

.credentials { display: flex; flex-direction: column; gap: 0.6rem; }

.credential-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.9rem;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: all 0.2s;
}
.credential-item:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.15);
  transform: translateX(4px);
}

.badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  flex-shrink: 0;
}
.admin-badge {
  background: rgba(99,102,241,0.2);
  color: #a5b4fc;
  border: 1px solid rgba(99,102,241,0.25);
}
.user-badge {
  background: rgba(16,185,129,0.15);
  color: #6ee7b7;
  border: 1px solid rgba(16,185,129,0.2);
}

.cred-info { display: flex; flex-direction: column; gap: 1px; flex: 1; min-width: 0; }
.cred-email {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.7);
  font-family: 'SF Mono', 'Consolas', monospace;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cred-pass {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  font-family: 'SF Mono', 'Consolas', monospace;
}
.cred-arrow {
  width: 14px; height: 14px;
  color: rgba(255,255,255,0.2);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
}
.credential-item:hover .cred-arrow {
  color: rgba(255,255,255,0.6);
  transform: translateX(2px);
}

/* ── Transition ── */
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Responsive ── */
@media (max-width: 480px) {
  .login-card { padding: 2rem 1.5rem; }
}
</style>