<template>
    <div class="form-container">
        <form @submit.prevent="register" class="register-form">
            <input v-model="name" type="text" placeholder="Name" required class="form-input">
            <input v-model="email" type="email" placeholder="Email" required class="form-input">
            <input v-model="password" type="password" placeholder="Password" required class="form-input">
            <button type="submit" class="form-button">Register</button>
        </form>
    </div>
</template>

<script>
import axios from '@/axios';

export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        };
    },
    methods: {
        async register() {
            try {
                await axios.post("/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });
            } catch (error) {
                console.error("An error occurred")
                if (error.response) {
                    console.error("Error details:", error.response.data)
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
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
</style>
