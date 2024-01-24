
export const Item = async ({item, baseUrl}) => {
    const getLink = (base, identity) => {
        return `${base}/${identity}`
    }

    return (
        `
            <div class="item">
                <img src="${item.image}" alt="loading ..."/>
                <a href="${getLink(baseUrl, item.id)}"><b>${item.label}</b></a>
                <div><i>${item.price} USD</i></div>
            </div>
        `
    )
}

export const List = async ({items, baseUrl}) => {
    
    const generateItems = async function(items) {
        let rs = ""
        await items.forEach(async (item, index, arr) => {
            const itemHtml = await Item({item, baseUrl})
            rs += itemHtml
        })
    
        return rs || "List is Empty"
    } 

    return (
        `
            <div class="list-items">
                ${await generateItems(items)}
            </div>
        `
    )
}
