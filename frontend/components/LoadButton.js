import { FXMLHttpRequest } from "../fajax/fajax.js";

export class LoadButton {
    /**
     * Creates a new LoadButton component and bind it to the given element
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
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