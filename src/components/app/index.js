import Home from "../home/index.js";

const App = () => {

    const homePage = Home()

    return (
        `
        <div class="container" id="app">
            ${homePage}
        </div>
        `
    )
}

export default App;