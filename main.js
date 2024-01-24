import App from "./src/components/app/index.js";
import { importCss } from "./src/common/helper/import.js";
import { ProductPage } from "./src/components/product-page/index.js";
import Home from "./src/components/home/index.js";
import { parsePathParams } from "./src/utils/url-parser.js";
import { parameters } from "./src/utils/parameters.js";
import { CartPage } from "./src/components/cart-page/index.js";


const modules = [
    "/src/components/navigation-bar",
    "/src/components/home",
    "/src/common/component/list",
    "/src/components/product-page",
    "/src/common/component/shopping-btn",
    "/src/common/component/hidden",
    "/src/components/cart-page"
]


const router = new Map([
    ["/", {path: "/", component: Home, mockID: "app",}],
    ["/product", {path: "/product", component: ProductPage, mockID: "app"}],
    ["/product/:id", {path: "/product/:id", component: ProductPage, mockID: "app"}],
    ["/cart", {path: "/cart", component: CartPage, mockID: "app"}]
])

function importModules() {
    modules.forEach((value, index, modules) => {
        importCss(`${value}/style.css`)
    })
}

async function route() {
    const paths = window.location.pathname;
    const mapping = router.get(paths);
    if (mapping) {
        document.getElementById(mapping.mockID).innerHTML = await mapping.component();
    } 
    else {
        let pathParams;
        let mapping;
        router.forEach( async (value, key) => {
            if(key.includes(":")) {
                pathParams = parsePathParams(key);
                if(pathParams.size) {
                    mapping = value
                    parameters.pathParameters = pathParams
                    return
                }
            }
        })
        if(pathParams.size) {
            document.getElementById(mapping.mockID).innerHTML = await mapping.component();
        }
        else {
            document.getElementById("app").innerHTML = await Home();
        }
    }
}

window.addEventListener('load', async (event) => {
    importModules();
    route()
});

document.getElementById("root").innerHTML = App();
