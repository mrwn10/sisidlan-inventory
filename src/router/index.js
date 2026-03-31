import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/all/Login.vue'

// Import the new AdminLayout component
import AdminLayout from '../components/admin/AdminLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // New admin routes with nested structure
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/AdminDashboard.vue')
      },
      {
        path: 'supplies',
        name: 'AdminSupplies',
        component: () => import('../views/admin/AdminSupplies.vue')
      },
      {
        path: 'equipment',
        name: 'AdminEquipment',
        component: () => import('../views/admin/AdminEquipment.vue')
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: () => import('../views/admin/AdminReports.vue')
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: () => import('../views/admin/AdminProfile.vue')
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('../views/admin/AdminSettings.vue')
      },
      {
        path: 'scan-qr',
        name: 'AdminScanQR',
        component: () => import('../views/admin/AdminScanQR.vue')
      }
    ]
  },
  // Keep your existing user dashboard route
  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: () => import('../views/users/UserDashboard.vue'),
    meta: { requiresAuth: true, role: 'user' }
  },
  // Optional: Redirect old admin-dashboard to new structure
  {
    path: '/admin-dashboard',
    redirect: '/admin/dashboard'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navigation guard with role checking
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('userRole')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login')
    } else if (to.meta.role && userRole !== to.meta.role) {
      // Redirect if user doesn't have the required role
      next(userRole === 'admin' ? '/admin/dashboard' : '/user-dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router