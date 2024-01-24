

export class DataStorage {

    static instance = undefined

    constructor() {
        this.cart = undefined;
        this.loadCart = async () => {
            const data = localStorage.getItem("cart") || "";
            if (data) {
                const cart = await JSON.parse(data);
                this.cart = new Map(Object.entries(cart))
            }
            else {
                this.cart = new Map();
            }
        }
        this.clearCart = () => {
            localStorage.removeItem("cart")
        }
        this.addToCart = (productItem) => {
            if (productItem) {
                if (this.cart.constructor === Map) {
                    const temp = this.cart.get(`${productItem.id}`) || {quantity: 0}
                    productItem.quantity += temp.quantity
                    this.cart.set(`${productItem.id}`, productItem.asObject())
                }
            }
        }
        this.removeFromCart = (productId) => {
            if (productId) {
                this.cart.delete(`${productId}`)
                this.save()
            }
        }
        this.save = () => {
            if (this.cart) {
                const json = JSON.stringify(Object.fromEntries(this.cart));
                localStorage.setItem("cart", json);
            }
        }
    }

    static getInstance = async () => {
        if (!DataStorage.instance) {
            DataStorage.instance = new DataStorage();
            await DataStorage.instance.loadCart()
        }
        return DataStorage.instance
    }

}


