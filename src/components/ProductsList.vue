<template>
  <div> 
    <h1>
        Product List - ({{ availableProductsCount }}/{{ productsCount }})
    </h1>
    <img 
      v-if="loading"
      src="https://icon-library.com/images/loading-gif-icon/loading-gif-icon-9.jpg" 
      alt="Searching Products" 
      width="300"
    />
    <ul v-else>
        <li v-for="product in products" :key="product.id">
            {{ product.title }} - {{ product.price }} - {{ product.inventory }}
            <button :disabled="!productIsInStock(product)" @click="addToCart(product)">
                add to cart
            </button>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapState({
            products: state => state.products.items,
        }),
        ...mapGetters('products', {
            productIsInStock: 'productIsInStock', 
            availableProductsCount: 'availableProductsCount', 
            productsCount: 'productsCount'
        }),
    },
    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addToCart: 'cart/addProductToCart',
        }),
    },
    created () {
        this.loading = true;
        this.fetchProducts().then(() => this.loading = false);
    }
}
</script>