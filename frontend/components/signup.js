import { FXMLHttpRequest } from "../fajax/fajax.js";


export class SignUpButton {
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
        let username = document.getElementById("username").querySelector("input").value.trim();
        let password = document.getElementById("password").querySelector("input").value.trim();


        let request = new FXMLHttpRequest();
        request.open("POST", "/users",true);

        request.onload = () => {
            console.log("success to add a new user: " + username);
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send(username + '%' + password );

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}