import { FXMLHttpRequest } from "../fajax/fajax.js";

export class LoginButton {
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
        let username = document.getElementById("username").querySelector("input").value.trim();
        let password = document.getElementById("password").querySelector("input").value.trim();


        let request = new FXMLHttpRequest();
        request.open("GET", "/users",true);

        request.onload = () => {
            let data = JSON.parse(request.responseText);
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i] === null || data[i] === undefined ) {
                    continue;
                }
                if ( data[i]["name"] == username && data[i]["password"] == password) {
                    document.getElementById("afterLogin").classList.remove("hidden");
                    document.getElementById("username").querySelector("input").value = ''
                    document.getElementById("password").querySelector("input").value = ''
                    return;             
                }
            }
            window.alert("Wrong username or password");
        };

        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send();

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}