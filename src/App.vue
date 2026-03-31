<template>
  <div id="app" :class="[theme, 'font-space-grotesk']">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      theme: 'light-theme'
    }
  },
  created() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.theme = savedTheme
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      this.theme = prefersDark ? 'dark-theme' : 'light-theme'
    }
    document.body.className = this.theme
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light-theme' ? 'dark-theme' : 'light-theme'
      localStorage.setItem('theme', this.theme)
      document.body.className = this.theme
    }
  },
  provide() {
    return {
      toggleTheme: this.toggleTheme,
      theme: this.theme
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

* {
  transition: background-color 0.2s ease-in-out,
              color 0.2s ease-in-out,
              border-color 0.2s ease-in-out;
}

.font-space-grotesk {
  font-family: 'Space Grotesk', sans-serif;
}

/* Light Theme */
.light-theme {
  --bg-primary: #060E20;
  --bg-secondary: #0a1430;
  --bg-tertiary: #0f1a3a;
  --text-primary: #81ECFF;
  --text-secondary: #a0f0ff;
  --accent-primary: #81ECFF;
  --accent-secondary: #5fb8cc;
  --border-color: rgba(129, 236, 255, 0.2);
  --card-bg: rgba(10, 20, 48, 0.8);
  --card-bg-hover: rgba(10, 20, 48, 0.9);
  --input-bg: rgba(10, 20, 48, 0.6);
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}

/* Dark Theme */
.dark-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --text-primary: #060E20;
  --text-secondary: #1e293b;
  --accent-primary: #060E20;
  --accent-secondary: #1e293b;
  --border-color: rgba(6, 14, 32, 0.1);
  --card-bg: #ffffff;
  --card-bg-hover: #f8fafc;
  --input-bg: #ffffff;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}

body, #app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--accent-secondary);
  border-radius: 4px;
}
</style>