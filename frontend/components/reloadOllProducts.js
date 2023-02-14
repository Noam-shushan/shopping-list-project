import { FXMLHttpRequest } from "../fajax/fajax.js";
import { DeleteItemButton } from "../components/deleteItemButton.js";
import { UpdateItem } from "../components/updateItem.js";


export class reloadAllItemsButton {
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
        request.open("GET", "/products",true);

        request.onload = () => {
            console.log("success to get all items");
            let allProducts = JSON.parse(request.responseText);
            
            allProducts.forEach(element => {
                if (element === undefined || element === null || element === ""  || element.name === " ")
                {
                    return;
                }
                var li = document.createElement("li");
                new UpdateItem(li)
                var t = document.createTextNode(element.name);
                li.appendChild(t);
                document.getElementById("myUL").appendChild(li);
                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);

                if(element.in_cart){
                    li.classList.toggle('checked');
                }

                var close = document.getElementsByClassName("close");
                close[close.length -1].onclick = function() {
                    var div = this.parentElement;
                    div.style.display = "none";
                    new DeleteItemButton(this.parentElement);
                }
            });
        };
        request.onerror = () => {
            console.log(request.responseText);
        };

        request.send();

        this.element.classList.remove("loading");
        this.element.disabled = false;
    }
}