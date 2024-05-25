<template>
    
    <div class="edit-product">
        <form @submit.prevent="submitForm">
            <input v-model="product.title" placeholder="Product title">
            <p v-if="errors.title">{{ errors.title }}</p>
            <input v-model="product.description" placeholder="Product description">
            <p v-if="errors.description">{{ errors.description }}</p>
            <input v-model="product.price" placeholder="Product price">
            <p v-if="errors.price">{{ errors.price }}</p>
            <button type="submit">Edit product</button>
        </form>
    </div>

</template>

<script>

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';

export default {
    setup() {
        const product = ref({ id: null, title: '', description: '', price: '' });
        const errors = ref({});
        const route = useRoute();
        product.value.id = route.params.id;

        const router = useRouter();

        const validateInput = () => {
            const errorMessages = {};
            if (!product.value.title) errorMessages.title = 'Title is required';
            if (!product.value.description) errorMessages.description = 'Description is required';
            if (!product.value.price || isNaN(product.value.price)) errorMessages.price = 'Price is required';

            return errorMessages;
        };

        const submitForm = async () => {
            const errorMessages = validateInput();
            if (Object.keys(errorMessages).length > 0) {
                errors.value = errorMessages;
                return;
            }
            try {
                await axios.put(`/products/${product.value.id}`, product.value);
                router.push('/');
            } catch (error) {
                console.error('An error occurred during updating the product', error);

                if (error.response && error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            }
        };

        onMounted(async () => {
            try {
                const response = await axios.get(`/products/${product.value.id}`);
                product.value.title = response.data.title;
                product.value.description = response.data.description;
                product.value.price = response.data.price;

            } catch (error) {
                console.error('An error occurred during fetching data', error);
            }
        });

        return { product, submitForm, errors };
    }
}
</script>