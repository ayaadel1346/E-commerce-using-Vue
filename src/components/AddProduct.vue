<template>
    
    <div class="form-container">
    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <label for="title">Product Name:</label>
        <input v-model="title" id="name" placeholder="Product name">
        <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
      </div>
      <div class="form-group">
        <label for="description">Product Description:</label>
        <input v-model="description" id="description" placeholder="Product description">
        <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input v-model="price" id="price" placeholder="Price">
        <p v-if="errors.price" class="error-message">{{ errors.price }}</p>
      </div>
      <button type="submit">Add Product</button>
    </form>
  </div>


</template>


<script>


import axios from '@/axios';

export default {
  data() {
    return {
        title: "",
      description: "",
      price: "",
      errors: {} 
    };
  },
  methods: {
    validateInput() {
      const errors = {};
      if (!this.title) errors.title = "title is required";
      if (!this.description) errors.description = "Description is required";
      if (!this.price || isNaN(this.price)) errors.price = "Price is required and must be a number";
      return errors;
    },
    async submitForm() {
     
      this.errors = {};

     
      const errors = this.validateInput();

   
      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return; 
      }

      
      try {
        await axios.post('/products', {
            title: this.title,
          description: this.description,
          price: this.price
        });
        
        
        this.$router.push("/");
      } catch (error) {
       
      }
    }
  }
}
</script>

<style scoped>

.form-container {
  max-width: 400px;
  margin: 0 auto;
}


.product-form {
  margin-top: 20px;
}


.form-group {
  margin-bottom: 15px;
}


input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.error-message {
  color: red;
  margin-top: 5px;
}


button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


button:hover {
  background-color: #0056b3;
}
</style>