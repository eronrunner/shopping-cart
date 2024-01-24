
export class ProductItem {

    constructor({id, name, quantity, description, image, price}) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.image = image;
        this.price = price;
        this.toJson = () => {
            return JSON.stringify("{" +
                    `
                        "id": ${this.id},
                        "name": ${this.name},
                        "quantity": ${this.quantity},
                        "description": ${this.description},
                        "image": ${this.image},
                        "price": ${this.price}
                    ` 
                )
        }
        this.asObject = () => {
            return {
                id: this.id,
                name: this.name,
                quantity: this.quantity,
                description: this.description,
                image: this.image,
                price: this.price
            }
        }
    }
}

