import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        items: [],
        checkoutStatus: null
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => {
                return total + (product.price * product.quantity);
            }, 0);
        },
    },
    mutations: {
        pushProductToCart(state, product) {
            state.items.push(product)
        },
        incrementProductInCart(state, item) {
            item.quantity++
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        },
        emptyCart(state) {
            state.items = [];
        }
    },
    actions: {
        addProductToCart({state, commit, rootGetters}, product) {
            if(!rootGetters['products/productIsInStock'](product)) return;
            
            const cartItem = state.items.find(item => item.id == product.id);
    
            if(!cartItem) {
                commit('pushProductToCart', {
                    id: product.id,
                    quantity: 1,
                })   
            } else commit('incrementProductInCart', cartItem)
            commit('products/decrementProductInventory', product, { root: true })
        },
        checkout({state, commit}) {
            shop.buyProducts(
                state.items, 
                () => {
                    commit('emptyCart');
                    commit('setCheckoutStatus', 'success')
                },
                () => commit('setCheckoutStatus', 'fail'),
            )
        }
    }
}