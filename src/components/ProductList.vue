<template>
    
    <div class="product-list">
    <ul>
      <li class="product-item" v-for="product in products" :key="product.id">
        <span>{{ product.title }}</span>
        <div class="action-links">

           <router-link class="edit-link" :to="{ name: 'EditProduct', params: { id: product.id } }">Edit</router-link>
           <router-link class="view-link" :to="{name: 'ProductDetail' , params: {id:product.id}}">View Details</router-link>
           <button class="delete-button" @click="deleteProduct(product.id)">Delete</button>
      
        </div>
      </li>
    </ul>
  </div>

</template>


<script>


import axios from '@/axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async deleteProduct(id) {
      try {
        await axios.delete(`/products/${id}`);
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('An error occurred while deleting product', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('An error occurred while listing products', error);
      }
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.product-list {
  margin: 20px auto;
  max-width: 600px;
}

.product-item {
  list-style-type: none;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.action-links {
  display: inline-block;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>