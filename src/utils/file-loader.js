
export async function loadJson(path) {
    return await fetch(path).then(res => {
        return res.json();
    })
}

