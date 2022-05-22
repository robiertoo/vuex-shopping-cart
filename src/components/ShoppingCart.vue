<template>
  <h1> Shopping Cart </h1>
  <ul>
      <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }} - {{ product.quantity }}
      </li>
  </ul>
  <p>Total: {{ cartTotal }}</p>
  <button @click="checkout">Checkout</button>
  <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
    computed: {
        ...mapGetters('cart', {
            products: 'cartProducts',
            cartTotal: 'cartTotal',
        }),
        ...mapState('cart', {
            checkoutStatus: state => state.checkoutStatus
        }),
    },
    methods: {
        ...mapActions('cart', ['checkout'])
    }
}
</script>