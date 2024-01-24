# shopping-cart

## Setup

1. Open folder `shopping-cart` by VS code
2. Setup `Live Server`
    a. Select extendsion in VS code
    b. Search `Live Server` and install
    c. Go to the setting of `Live server`, at `Live Server > Settings: File` - input the value: `index.html`
3. Find the `Go Live` button on top or on the bottom right of VS code. Click `Go Live` to start a live server

## Funtionality

`/` : `Home page` lists all products, choose each one to open `Product page`
`/product/:id`: `Product page` shows product view and allow people to add a number of product to `Cart` by clicking `Add to cart` button
`/cart`: `Cart page` lists all products added by `Product page` and allow people to adjust amount, remove products from `Cart` by `Remove` button

## Components
Root -> App -> Home -> NavigationBar 
                    -> List (product list) -> Item (product item)
            -> ProductPage -> NavigationBar 
                            -> ProductView
                            -> ShoppingBtn
                            -> Add button
            -> CartPage    -> CartItem      -> ShoppingBtn
                                            -> Remove button

Home: contains `NavigationBar`, `Product` list
NavigationBar: contains links to Home and `CartPage`
ProductPage: contains `NavigationBar`, `ProductView`, `ShoppingBtn`, Add button
ProductView: show detail of product in name, picture, price and description
ShoppingBtn: contains `Number Input`, `increse/descrease` buttons to adjust amount. 
Add button: add the product to `Cart`
CartPage: contains title, list of `CartItem`, the total of Cart
CartItem: show the basic item info, `ShoppingBtn`, `RemoveBtn`
Remove button: remove the product from `Cart`

