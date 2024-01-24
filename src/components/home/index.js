import { List } from "../../common/component/list/index.js";
import { loadJson } from "../../utils/file-loader.js";
import { NavigationBar } from "../navigation-bar/index.js";

const Home = async () => {

    const navBar = await NavigationBar();
    const items = await loadJson("/MOCK_DATA.json");
    const productList = await List({items, baseUrl: "product"});

    return (
        `
        <div class="container" id="app">
            <div id="nav-bar">
                ${navBar}
            </div>
            <div id="main-content">
                ${productList}
            </div>
        </div>
        `
    )
}

export default Home;