const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        .list-item {
            background: #202123;
            border-bottom: #ccc 1px solid;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1em;
            padding: 0.1em 0.5em;
        }

        .list-item:hover {
            background-color: #60646b;
            cursor: pointer;
        }

        .details {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5em;
        }

        .actions{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 1em;
        }

        .actions
        button {
            border: none;
            background: none;
            color: white;
            font-size: 1em;
            cursor: pointer;
        }
    </style>
    <div class="list-item">
        <div class="details">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <p><slot name="listName"/></p>
        </div>

        <div class="actions">
            <button id="remove">X</button>
        </div>
    </div>
`;

/**
 * this is a custom element that represents a list item
 */
export class ListItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#remove').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('onDelete', { detail: this.listName }));
            this.remove();
        });
    }

    get listName() {
        return this.getAttribute('listName');
    }

    set listName(value) {
        this.setAttribute('listName', value);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('slot[name="listName"]').textContent = this.listName;
    }

    static get observedAttributes() {
        return ['listName'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'listName') {
            this.listName = newValue;
            this.shadowRoot.querySelector('slot[name="listName"]').textContent = newValue;
        }
    }
}