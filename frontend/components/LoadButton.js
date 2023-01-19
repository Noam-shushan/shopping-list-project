import { FXMLHttpRequest } from "../fajax/fajax.js";

class LoadButton {
    constructor(element) {
        this.element = element;
    }

    init() {
        this.element.addEventListener("click", this.loadMore.bind(this));
    }

    loadMore() {
        this.element.classList.add("loading");
        this.element.disabled = true;

        setTimeout(() => {
            let request = new FXMLHttpRequest();
            request.open("GET", "/users");

            request.onload = () => {
                let data = JSON.parse(request.responseText);
                renderHTML(data);
            };

            request.send();

            this.element.classList.remove("loading");
            this.element.disabled = false;
        }, 2000);
    }
}