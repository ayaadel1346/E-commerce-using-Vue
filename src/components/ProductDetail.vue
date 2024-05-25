<template>
    <div v-if="product">
        <h1>Title:{{ product.title }}</h1>
        <p>Desciption:{{ product.description }}</p>
        <p>Price:${{ product.price }}</p>
      
    </div>
</template>

<script>
import axios from '@/axios'

export default {
    data(){
        return {
            product:null
        };
    },
    async mounted() {
        const productId=this.$route.params.id;
        try{
            const response=await axios.get(`/products/${productId}`);
            this.product=response.data;

        }catch(error){
            console.error('an error occur during fetching the product,error')
        }

    }
}
</script>