<template>
  <div class="table-wrapper">
    <div class="table-container">
      <table class="supplies-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Brand</th>
            <th>Stocks</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="id-column">{{ item.id }}</td>
            <td class="name-column">{{ item.name }}</td>
            <td class="brand-column">{{ item.brand }}</td>
            <td :class="{ 'low-stock': item.stocks <= 5 }">
              {{ item.stocks }}
            </td>
            <td>{{ item.location }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(item.stocks)]">
                {{ getStatus(item.stocks) }}
              </span>
            </td>
            <td class="actions">
              <button class="edit-btn" @click="$emit('edit', item)" title="Edit">
                <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button class="delete-btn" @click="$emit('delete', item.id)" title="Delete">
                <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="7" class="empty-row">No items found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminSuppliesTable',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['edit', 'delete'],
  methods: {
    getStatus(stocks) {
      if (stocks <= 0) {
        return 'Out of Stock'
      } else if (stocks <= 5) {
        return 'Low Stock'
      } else {
        return 'In Stock'
      }
    },
    getStatusClass(stocks) {
      if (stocks <= 0) {
        return 'out-of-stock'
      } else if (stocks <= 5) {
        return 'low-stock'
      } else {
        return 'in-stock'
      }
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  background: var(--card-bg);
  border-radius: 0.75rem;
  border: 1px solid var(--border-color);
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.table-container {
  overflow-x: auto;
  overflow-y: auto;
  max-height: calc(100vh - 250px);
}

.supplies-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.supplies-table thead {
  background: var(--bg-secondary);
  position: sticky;
  top: 0;
  z-index: 10;
}

.supplies-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--border-color);
}

.supplies-table td {
  padding: 1rem;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.supplies-table tbody tr {
  transition: background-color 0.2s ease;
}

.supplies-table tbody tr:hover {
  background: var(--bg-secondary);
}

.id-column {
  font-weight: 600;
  color: var(--accent-primary);
  width: 60px;
}

.name-column {
  font-weight: 500;
  min-width: 180px;
}

.brand-column {
  font-weight: 400;
  min-width: 140px;
}

.low-stock {
  color: var(--error);
  font-weight: 600;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: 0.025em;
}

.status-badge.in-stock {
  background: var(--success);
  color: white;
  opacity: 0.9;
}

.status-badge.low-stock {
  background: var(--warning);
  color: white;
  opacity: 0.9;
}

.status-badge.out-of-stock {
  background: var(--error);
  color: white;
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
}

.edit-btn,
.delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
}

.edit-btn {
  color: var(--accent-primary);
}

.edit-btn:hover {
  background: var(--bg-secondary);
  transform: scale(1.1);
}

.delete-btn {
  color: var(--error);
}

.delete-btn:hover {
  background: var(--bg-secondary);
  transform: scale(1.1);
}

.action-icon {
  width: 18px;
  height: 18px;
  stroke-width: 1.8;
}

.empty-row {
  text-align: center;
  color: var(--text-secondary);
  padding: 3rem !important;
}

@media (max-width: 768px) {
  .supplies-table th,
  .supplies-table td {
    padding: 0.75rem;
  }
}
</style>