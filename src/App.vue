<template>
  <div id="app">
    <products-list />
    <hr>
    <shopping-cart />
  </div>
</template>

<script>
import ProductsList from './components/ProductsList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
export default {
  name: 'app',
  components: {
    ProductsList,
    ShoppingCart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
