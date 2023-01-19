export class FXMLHttpRequest {
    constructor() {
        this.onload = () => { };
    }
    open(method, url, async) {

    }
    send(data) {

    }
    setRequestHeader(header, value) {
    }
    setOnReadyStateChange(callback) {
        this.xhr.onreadystatechange = callback;
    }
    getResponseText() {
    }
    getResponse() {
    }
    getReadyState() {
    }
    getStatus() {
    }
}


function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let demo = document.getElementById("demo");
        let content = JSON.parse(this.responseText);
        demo.insertAdjacentHTML('beforeend', content);
    }
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
}

let animalsContainer = document.getElementById('animals');
let loadBtn = document.getElementById('loadBtn');

loadBtn.addEventListener('click', () => {
    catsDataUrl = 'https://learnwebcode.github.io/json-example/animals-1.json';

    let request = new XMLHttpRequest();

    request.open('GET', catsDataUrl);

    request.onload = function () {
        let data = JSON.parse(request.responseText);
        renderHTML(data);
    };

    request.send();
});


function renderHTML(data) {
    let htmlString = "";
    for (let i = 0; i < data.length; i++) {
        htmlString += `<p>${data[i].name} is a ${data[i].species}</p>`;
    }
    animalsContainer.insertAdjacentHTML('beforeend', htmlString);
}