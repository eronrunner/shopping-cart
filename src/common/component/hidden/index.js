
export const HiddenElement = ({callback, args}) => {
    return (
        `
            <div class="hidden-element">${callback(args)}</div>
        `
    )
}

