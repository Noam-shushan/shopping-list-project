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

        let request = new FXMLHttpRequest();
        request.open("GET", "/users",false);

        request.onload = () => {
            let data = JSON.parse(request.responseText);
            console.log(data);
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send();

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}