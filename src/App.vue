<template>
  <div class="flex justify-center">
    <div class="max-w-4xl px-12 py-4">
      <div class="grid grid-cols-2 gap-1">
        <div class="grid grid-cols-3 gap-4">
          <div v-if="loading" class="container">
            <div class="flex-loader">
              <div class="loader"></div>
            </div>
            <div class="load-text">Loading...</div>
          </div>
          <div
            v-for="product in products"
            :key="product.id"
            class="rounded-sm shadow py-4 px-8 text-center"
          >
            <div class="text-4xl">
              {{ product.icon }}
            </div>
            <span>
              {{ product.name }}
              (${{ product.cost }})
            </span>

            <button
              class="w-14 h-8 text-xs text-white font-extrabold rounded-md flex items-center justify-center bg-green-500 my-1"
              @click="add(product)"
            >
              Add
            </button>
            <button
              class="w-14 h-8 text-xs text-white font-extrabold rounded-md flex items-center justify-center bg-red-500 my-1"
              @click="remove(product)"
            >
              Remove
            </button>
          </div>
        </div>

        <div class="px-6 w-56">
          <h2 class="underline">Cart</h2>

          <!-- some nice spacing if there are no item in the cart -->
          <br v-if="cart.length === 0" />

          <div
            v-for="item in cart"
            :key="item.name"
            class="flex justify-between"
          >
            <div>{{ item.name }} ({{ item.quantity }}):</div>
            <div class="text-right">${{ item.cost }}</div>
          </div>

          <div class="double-underline text-right">${{ total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useCartStore } from "./store/cart";
import { Product, useProductStore } from "./store/product";

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    const loading = ref(true);

    onMounted(async () => {
      await productStore.fetchAll();
      loading.value = false;
    });

    const cartStore = useCartStore();

    return {
      products: computed(() => productStore.list),
      cart: computed(() => cartStore.formattedCart),
      total: computed(() => cartStore.total),
      loading,
      add: (product: Product) => cartStore.add(product),
      remove: (product: Product) => cartStore.remove(product),
    };
  },
});
</script>

<style style>
.double-underline {
  border-top: 3px double;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  align-content: center;
}

.flex-loader {
  min-height: 60pt;
}

@keyframes loading {
  0% {
    width: 50pt;
    height: 50pt;
    margin-top: 0;
  }
  25% {
    height: 4pt;
    margin-top: 23pt;
  }
  50% {
    width: 4pt;
  }
  75% {
    width: 50pt;
  }
  100% {
    width: 50pt;
    height: 50pt;
    margin-top: 0;
  }
}

.loader {
  border-radius: 100%;
  border: #6767fa 4pt solid;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  animation: loading 1s infinite;
}

.load-text {
  padding-top: 15px;
  text-align: center;
  font: 14pt "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: lighten(#6767fa, 75%);
}
</style>
