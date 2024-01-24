
export function importCss(href) {
    let head  = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.id   = href;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
}


export function importScript(src) {
    let script = document.createElement('script');
    script.src = src;
    document.head.prepend(script);
}