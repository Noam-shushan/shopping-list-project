import { FXMLHttpRequest } from "../fajax/fajax.js";


export class AddItemButton {
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
        request.open("POST", "/products",true);

        request.onload = () => {
            alert("success to add new item");
        };
        request.onerror = () => {
            console.log(request.responseText);
        };
        var inputValue = document.getElementById("myInput").value;
        request.send(inputValue);

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}