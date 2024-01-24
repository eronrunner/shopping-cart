// import NavigationBar from "../navigation-bar/index.js"

import { HiddenElement } from "../../common/component/hidden/index.js";
import { ShoppingBtn } from "../../common/component/shopping-btn/index.js";
import { ProductItem } from "../../models/product-item.js";
import { EventManager } from "../../services/events.js";
import { DataStorage } from "../../services/storage/storage.js";
import { loadJson } from "../../utils/file-loader.js"
import { parameters } from "../../utils/parameters.js"
import { NavigationBar } from "../navigation-bar/index.js";


export const ProductPage = async () => {
    
    let quantity = 1
    const maxQuantity = 99
    const minQuantity = 1

    const product_id = parameters.pathParameters.get("id")
    const products = await loadJson("/MOCK_DATA.json")
    const getProduct = async function() {
        for await (let product of products) {
        if(product_id == product.id) {
            return product;
            }
        }
    }

    const storage = await DataStorage.getInstance();
    const product = await getProduct();
    const eventManager = EventManager.getInstance();

    const reloadShoppingBtn = async () => {
        const shoppingBtn = await ShoppingBtn({increaseCallback: increaseNumber, decreaseCallback: decreaseNumber, numberInputOnChange, value: quantity});
        document.getElementById("shopping-btn").innerHTML = shoppingBtn
    }
    
    const increaseNumber = (event) => {
        event.preventDefault();
        if (minQuantity <= quantity && quantity < maxQuantity) {
            ++quantity;
            reloadShoppingBtn();
        }
    }
    
    const decreaseNumber = (event) => {
        event.preventDefault();
        if (minQuantity < quantity && quantity <= maxQuantity) {
            --quantity;
            reloadShoppingBtn();
        }
    }

    const numberInputOnChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (minQuantity <= value && value <= maxQuantity) {
            quantity = value;
            reloadShoppingBtn();
        }
    }

    const registerListener = () => {
        setTimeout(() => {
            document.getElementById("add-cart-btn").onclick = addToCart
        }, 500)
    }

    const addToCart = (event) => {
        const item = new ProductItem({id: product.id, name: product.label, quantity, description: product.description, image: product.image, price: product.price});
        storage.addToCart(item)
        storage.save()
        eventManager.push("UPDATE-CART")
    }


    // components
    const navBar = await NavigationBar({badge: storage.cart.size || 0});
    const productView = await ProductView({product});
    const shoppingBtn = await ShoppingBtn({increaseCallback: increaseNumber, decreaseCallback: decreaseNumber, value: quantity});
    const hidden = HiddenElement({callback: registerListener})

    return (
        `
            ${navBar}
            <div class="product-page">
                <div class="product">
                    ${productView}
                    <div class="shopping-bar">
                        <div id="shopping-btn">
                            ${shoppingBtn}
                        </div>
                        <button class="add-cart-btn" id="add-cart-btn"> Add to Cart </div>
                    </div>
                </div>
                ${hidden}
            </div>
        `
    )
}

export const ProductView = async ({product}) => {
    return (
        `
            <div class="product-view">
                <div class="product-label">${product.label}</div>
                <img src="${product.image}">
                <div><i>${product.price} USD</i></div>
                <div class="product-des">${product.description}</div>
            </div>
        `
    )

}