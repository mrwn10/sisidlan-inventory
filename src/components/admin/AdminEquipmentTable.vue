<template>
  <div class="table-wrapper">
    <div class="table-container">
      <table class="equipment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipment Name</th>
            <th>Brand</th>
            <th>Quantity</th>
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
            <td :class="{ 'low-stock': item.quantity <= 2 }">{{ item.quantity }}</td>
            <td>{{ item.location }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(item.quantity)]">
                {{ getStatus(item.quantity) }}
              </span>
            </td>
            <td class="actions">
              <button class="edit-btn" @click="$emit('edit', item)" title="Edit">Edit</button>
              <button class="delete-btn" @click="$emit('delete', item.id)" title="Delete">Delete</button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="7" class="empty-row">No equipment found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminEquipmentTable',
  props: { items: { type: Array, required: true, default: () => [] } },
  emits: ['edit', 'delete'],
  methods: {
    getStatus(quantity) {
      if (quantity <= 0) return 'Out of Stock'
      if (quantity <= 2) return 'Low Stock'
      return 'In Stock'
    },
    getStatusClass(quantity) {
      if (quantity <= 0) return 'out-of-stock'
      if (quantity <= 2) return 'low-stock'
      return 'in-stock'
    }
  }
}
</script>

<style scoped>
/* Reuse the same styles as AdminSuppliesTable */
@import './AdminSuppliesTableStyles.css';
</style>