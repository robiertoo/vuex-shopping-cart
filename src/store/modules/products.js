import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        items: [],
    },
    getters: {
        availableProducts(state) {
            return state.items.filter(
                product => product.inventory > 0
            );
        },
        products(state) {
            return state.items;
        },
        productsCount(state) {
            return state.items.length;
        },
        availableProductsCount(state, getters) {
            return getters.availableProducts.length;
        },
        cart(state) {
            return state.cart;
        },
        productIsInStock() {
            return (product) => {
                return product.inventory > 0;
            } 
        }
    },
    mutations: {
        setProducts(state, products) {
            state.items = products
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        }
    },
    actions: {
        fetchProducts({ commit }) {
            return new Promise ((resolve) => {
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve(products);
                });
            });
        },
    }
}