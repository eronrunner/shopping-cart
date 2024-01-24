import { HiddenElement } from "../../common/component/hidden/index.js";
import { ShoppingBtn } from "../../common/component/shopping-btn/index.js";
import { ProductItem } from "../../models/product-item.js";
import { EventManager, Subject } from "../../services/events.js";
import { DataStorage } from "../../services/storage/storage.js";
import { NavigationBar } from "../navigation-bar/index.js";


export const CartPage = async () => {
    const pageTitle = "Product list"
    const navBar = await NavigationBar();
    const dataStorage = await DataStorage.getInstance();
    const eventManager = EventManager.getInstance();

    const generateCartItems = async () => {
        let items = ""
        for await (let [_, product] of dataStorage.cart) {
            const item = await CartItem({product})
            items += item
        }
        return items || "Cart is empty"
    }

    const reloadList = async () => {
        if (!dataStorage.cart.size) {
            document.getElementById("cart-list").innerHTML = `
                    ${await generateCartItems()}
            `
        }
    }
    const total = () => {
        let sum = 0;
        for (let [_, item] of dataStorage.cart) {
            sum += item.quantity * item.price
        }
        return sum
    }
    const reloadTotal = () => {
        const content = dataStorage.cart.size ? `Total: ${total()}` : ""
        document.getElementById("cart-total").innerHTML = content
    }
    const onEventRemoveFromCart = () => {
        eventManager.push("UPDATE-CART");
        reloadList();
        reloadTotal();
    }
    eventManager.register(new Subject(undefined, "UPDATE-CART-LIST", "update cart list"), reloadList)
    eventManager.register(new Subject(undefined, "UPDATE-CART-TOTAL", "update cart total"), reloadTotal)
    eventManager.register(new Subject(undefined, "REMOVE-FROM-CART", "remove from cart"), onEventRemoveFromCart)
    return (
        `   
            ${navBar}
            <div class="cart-page">
                <div class="title"><b>${pageTitle}</b></div>
                <div class="product-list" id="cart-list">
                    ${await generateCartItems()}
                </div>
                <div class="total" id="cart-total">${dataStorage.cart.size ? `Total: ${total()}` : ""}</div>
            </div>
        `
    )
}

export const CartItem = async ({product}) => {
    let productQuantity = product.quantity
    const productId = product.id
    const minQuantity = 1
    const maxQuantity = 99
    const storage = await DataStorage.getInstance();
    const eventManager = EventManager.getInstance();

    const reloadShoppingBtn = async (event, value) => {
        const btn = await ShoppingBtn({increaseCallback: increaseNumber, decreaseCallback: decreaseNumber, numberInputOnChange, value: value})
        document.getElementById(event.target.id).parentElement.innerHTML = btn
    }

    const increaseNumber = async (event) => {
        event.preventDefault();
        if (minQuantity <= productQuantity && productQuantity < maxQuantity) {
            productQuantity += 1
            const item = new ProductItem({id: productId, name: product.name, quantity: 1, description: product.description, image: product.image, price: product.price});
            storage.addToCart(item)
            storage.save()
            reloadShoppingBtn(event, productQuantity)
            eventManager.push("UPDATE-CART-TOTAL")
        }
    }
    
    const decreaseNumber = (event) => {
        event.preventDefault();
        if (minQuantity < productQuantity && productQuantity <= maxQuantity) {
            productQuantity -= 1
            const item = new ProductItem({id: productId, name: product.name, quantity: -1, description: product.description, image: product.image, price: product.price});
            storage.addToCart(item)
            storage.save()
            reloadShoppingBtn(event, productQuantity);
            eventManager.push("UPDATE-CART-TOTAL")
        }
    }

    const numberInputOnChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (minQuantity <= value && value <= maxQuantity) {
            const delta = value - product.quantity
            const item = new ProductItem({id: productId, name: product.name, quantity: delta, description: product.description, image: product.image, price: product.price});
            productQuantity += delta
            storage.addToCart(item)
            storage.save()
            reloadShoppingBtn(event, productQuantity);
            eventManager.push("UPDATE-CART-TOTAL")
        }
    }

    const removeFromCart = (event) => {
        const productId = event.target.id.split("-")[3]
        storage.removeFromCart(productId)
        document.getElementById(`cart-item-${product.id}`).remove()
        eventManager.push("REMOVE-FROM-CART")
    }

    const registerListener = () => {
        setTimeout(() => {
            const element = document.getElementById(`cart-remove-btn-${product.id}`)
            element.onclick = removeFromCart
        }, 500)
    }
    const shoppingBtn = await ShoppingBtn({increaseCallback: increaseNumber, decreaseCallback: decreaseNumber, numberInputOnChange, value: product.quantity})
    const hidden = HiddenElement({callback: registerListener})

    return (
        `
        <div class="cart-item" id="cart-item-${productId}">
            <div class="col-0">
                <div><b>${product.name}</b></div>
                <img src="${product.image}"/>
            </div>
            <div class="col-1">
                <div class="quantity">
                    ${shoppingBtn}
                </div>
            </div>
            <div class="col-2">
                <div class="price">
                    <i>${product.price} USD</i>
                </div>
            </div>
            <div class="col-3">
                <div class="func">
                    <button id="cart-remove-btn-${product.id}" class="btn remove">Remove</button>
                </div>
                ${hidden}
            </div>
        </div>
        `
    )
}