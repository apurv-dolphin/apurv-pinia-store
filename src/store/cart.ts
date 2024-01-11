import { defineStore } from "pinia";
import { useProductStore, Product } from "./product";

export interface Purchase {
  productId: string;
  quantity: number;
}

export interface CartState {
  contents: Record<string, Purchase>;
}

export interface CartPreview {
  name: string;
  quantity: number;
  cost: number;
}

export const useCartStore = defineStore({
  id: "cart",

  state: (): CartState => ({
    contents: {},
  }),

  actions: {
    add(product: Product) {
      if (this.contents[product.id]) {
        this.contents[product.id].quantity += 1;
      } else {
        this.contents[product.id] = {
          productId: product.id,
          quantity: 1,
        };
      }
    },

    remove(product: Product) {
      if (
        !this.contents[product.id] ||
        this.contents[product.id].quantity === 0
      ) {
        // If the item doesn't exist or its quantity is already 0, do nothing or handle as needed.
        return;
      }

      this.contents[product.id].quantity -= 1;

      // Remove the item from contents if the quantity becomes 0.
      if (this.contents[product.id].quantity === 0) {
        delete this.contents[product.id];
      }
    },
  },

  getters: {
    total() {
      const products = useProductStore();
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.all[id].cost * this.contents[id].quantity;
      }, 0);
    },

    formattedCart(): CartPreview[] {
      const products = useProductStore();

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId];

        return {
          name: products.all[purchase.productId].name,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.all[purchase.productId].cost,
        };
      });
    },
  },
});
