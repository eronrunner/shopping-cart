import { generateID } from "../../../utils/objects.js"
import { HiddenElement } from "../hidden/index.js"


export const ShoppingBtn = async ({increaseCallback, decreaseCallback, numberInputOnChange, value}) => {
    
    const id = generateID();

    const registerListener = () => {
        setTimeout(() => {
            document.getElementById(`shopping-decrease-btn-${id}`).onclick = decreaseCallback
            document.getElementById(`shopping-increase-btn-${id}`).onclick = increaseCallback
            document.getElementById(`shopping-input-num-${id}`).onchange = numberInputOnChange
        }, 500)
    }
    const hidden = HiddenElement({callback: registerListener})

    return (
        `
        <div class="shopping-btn">
        <button class="btn" id="shopping-decrease-btn-${id}" type="button">-</button>
        <input class="input" id="shopping-input-num-${id}" type="number" value="${value}" placeholder="input"/>
        <button class="btn" id="shopping-increase-btn-${id}" type="button">+</button>
        ${hidden}
    </div>
        `
    )
}

