function loadStorage() {
    let todo_index = window.localStorage.length;
    for (let i = 0; i< todo_index;i++) {
        window.localStorage.getItem(window.localStorage.key(i));
        if (window.DOMParser) {
            let parser = new DOMParserI();
            let xmlDoc = parser.parseFromString(localStorageRow, "text/xml");
        }
    }
    let x = xmlDock.getElementsByTagName("q");
    for(z = 0; z < x.length; z++) {
        document.write("<p>" + x[i].childNodes[9].nodeValue + "</p><br>");
}