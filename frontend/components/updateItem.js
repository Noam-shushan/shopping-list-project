import { FXMLHttpRequest } from "../fajax/fajax.js";


export class UpdateItem {
    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.element.addEventListener("click", this.loadMore.bind(this));
    }

    loadMore() {
        this.element.classList.add("loading");
        this.element.disabled = true;
        var updatedItemValue = this.element.innerText.slice(0,-2);

        let request = new FXMLHttpRequest();
        request.open("PUT", "/products",true);

        request.onload = () => {
            console.log("success to update the item: " + updatedItemValue);
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send(updatedItemValue);

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}