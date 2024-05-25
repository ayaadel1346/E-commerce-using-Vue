import { createRouter, createWebHistory } from "vue-router";
import Login from './components/LoginForm.vue';
import Register from './components/RegistrationForm.vue';
import AddProduct from './components/AddProduct.vue';
import ProductList from './components/ProductList.vue';
import EditProduct from './components/EditProduct.vue';
import ProductDetail from './components/ProductDetail.vue'

const routes = [
    {
        path: '/login',
        name: 'login', 
        component: Login,
        meta: { public: true }  
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { public: true } 
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component:AddProduct,
        meta: { public: false } 
    },
    {
        path: '/',
        name: 'ProductList',
        component:ProductList,
        meta: { public: false } 
    },
    {
        path: '/edit-product:id',
        name: 'EditProduct',
        component:EditProduct,
        meta: { public: false } 
    },
    {
        path: '/product:id',
        name: 'ProductDetail',
        component:ProductDetail,
        meta: { public: false } 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!to.meta.public && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
