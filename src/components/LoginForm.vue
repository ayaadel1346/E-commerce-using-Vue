<template>
  <div class="form-container">
    <form @submit.prevent="login" class="login-form">
        <input v-model="email" type="email" placeholder="Email" required class="form-input">
        <input v-model="password" type="password" placeholder="Password" required class="form-input">
        <button type="submit" class="form-button">Login</button>

    </form>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password
        });

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.$store.commit('LOGIN');
          this.$router.push("/");
        } else {
          this.errorMessage = "No token received from server";
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (error.response) {
          this.errorMessage = error.response.data.message || "An error occurred";
        } else {
          this.errorMessage = "An error occurred";
        }
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


.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}


.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}


.error-message {
  color: red;
  margin-top: 5px;
}
</style>

