import { FXMLHttpRequest } from "../fajax/fajax.js";

export class DeleteItemButton {
    /**
     * Creates a new DeleteItemButton component and bind it to the given element
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.element.addEventListener("click", this.deleteItem.bind(this));
    }

    deleteItem() {
        this.element.classList.add("loading");
        this.element.disabled = true;
        var deleteItemValue = this.element.innerText.slice(0,-1);;

        let request = new FXMLHttpRequest();
        request.open("DELETE", "/products",true);

        request.onload = () => {
            console.log("success to remove the item " + deleteItemValue);
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send(deleteItemValue);

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}