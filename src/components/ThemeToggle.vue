<template>
  <button 
    @click="handleToggle" 
    class="theme-toggle"
    aria-label="Toggle theme"
  >
    <svg v-if="isDarkMode" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  inject: ['toggleTheme', 'theme'], // Also inject theme to watch changes
  data() {
    return {
      isDarkMode: false
    }
  },
  created() {
    this.checkTheme()
  },
  watch: {
    // Watch for theme changes from parent
    theme: {
      handler() {
        this.checkTheme()
      },
      immediate: true
    }
  },
  methods: {
    checkTheme() {
      const currentTheme = localStorage.getItem('theme')
      this.isDarkMode = currentTheme === 'dark-theme'
    },
    handleToggle() {
      this.toggleTheme() // Call parent's toggleTheme
      // The watch will handle updating isDarkMode
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.theme-toggle:hover {
  transform: scale(1.05);
  background: var(--card-bg-hover);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>