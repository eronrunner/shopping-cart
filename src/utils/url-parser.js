

export function parseSearchParams() {
    const path = window.location;
    const requestParameters = new Map();
    if (path.search) {
        const search = path.search.split("?");
        const pairs = search[1].split("&");
        pairs.forEach(element => {
            const params = element.split("=");
            requestParameters.set(params[0].trim(), params[1].trim());
        });
    }

    return requestParameters
}

export function parsePathParams(path) {
    const pathParameters = new Map();
    if (window.location.pathname) {
        const pieces = window.location.pathname.split("/");
        const path_pieces = path.split("/");
        if (pieces.length == path_pieces.length) {
            for (let i = 0; i < pieces.length; i++) {
                if (path_pieces[i].includes(":")) {
                    const key = path_pieces[i].split(":")[1]
                    const value = pieces[i]
                    pathParameters.set(key, value)
                }
                else if (path_pieces[i] !== pieces[i]) {
                    return new Map()
                }
            }
        }
    }
    return pathParameters
}
