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
        var inputValue = document.getElementById("myInput").value;


        let request = new FXMLHttpRequest();
        request.open("POST", "/products",true);

        request.onload = () => {
            console.log("success to add new item " + inputValue);
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send(inputValue);

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}