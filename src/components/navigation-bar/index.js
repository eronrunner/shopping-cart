import { EventManager, Subject } from "../../services/events.js";
import { DataStorage } from "../../services/storage/storage.js"

export const NavigationBar = async () => {

    const eventManager = EventManager.getInstance()
    const storage = await DataStorage.getInstance();
    const refreshCartBadge = async () => {
        document.getElementById("cart-badge").innerHTML = storage.cart.size || 0;
    }

    eventManager.register(new Subject(undefined, "UPDATE-CART", "update cart"), refreshCartBadge)

    return (
        `
        <div class="topnav">
            <div class="flex-filled width-50"></div>
            <div class="flex-items width-50 scale-h-100">
                <a class="active" href="/">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="/cart">Cart <div class="badge" id="cart-badge">${storage.cart.size}</div></a>
            </div>
        </div>
        `
    )
}
