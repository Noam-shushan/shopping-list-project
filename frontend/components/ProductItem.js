let template = document.createElement('template');
template.innerHTML = `
    <style>
        .list-item {
            background: #f4f4f4;
            border-bottom: #ccc 1px dotted;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1em; 
            z-index: 5;
            border-radius: 5px;
            padding: 0 0.2rem;   
        }
        .list-item:hover {
            background: #e0ebeb;
        }

        .details {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 2em;
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
            font-size: 1.2em;
            cursor: pointer;
        }
        
        svg {
            cursor: pointer;
            width: 1.2em;
            height: 1.2em;
        }

        .dragging {
            opacity: 0.5;
        }
    </style>
    <div class="list-item">
        <div class="details">
            <p><slot name="product"/></p>
            <p><slot name="amount"/></p>
        </div>

        <div class="actions">
            <button id="inc">+</button>
            <button id="dec">-</button>
            <svg id="delete" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
            </svg>
        </div>

    </div>
`;

/**
 * This web component represents a single product item in the shopping list.
 * @class ProductItem
 */
export class ProductItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('#delete').addEventListener('click', () => {
            this.fireOnDeleteEvent();
            this.remove();
        });
        this.shadowRoot.querySelector('#inc').addEventListener('click', () => {
            this.amount++;
        });
        this.shadowRoot.querySelector('#dec').addEventListener('click', () => {
            if (this.amount > 0) {
                this.amount--;
            }
        });
    }

    get product() {
        return this.getAttribute('product');
    }

    set product(value) {
        this.setAttribute('product', value);
    }

    get amount() {
        let amount = this.getAttribute('amount');
        if (!amount || amount < 1) {
            amount = 1;
        }
        if (isNaN(amount)) {
            amount = 1;
        }
        return Number(amount);
    }

    set amount(value) {
        if (this.amount !== value) {
            this.setAttribute('amount', value);
            this.fireOnAmountChange();
        }
    }

    fireOnAmountChange() {
        const event = new CustomEvent('onAmountChange', {
            detail: {
                amount: this.amount,
                product: this.product
            },
        });
        this.dispatchEvent(event);
    }

    static get observedAttributes() {
        return ['product', 'amount'];
    }

    render() {
        this.shadowRoot.querySelector('slot[name="product"]').innerHTML = this.product;
        if (this.amount > 1) {
            this.shadowRoot.querySelector('slot[name="amount"]').innerHTML = 'x' + this.amount;
        } else {
            this.shadowRoot.querySelector('slot[name="amount"]').innerHTML = '';
        }
    }

    connectedCallback() {
        this.render();
    }

    fireOnDeleteEvent() {
        const event = new CustomEvent('onDelete', {
            detail: {
                product: this.product
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'product':
                this.shadowRoot.querySelector('slot[name="product"]').innerHTML = this.product;
                break;
            case 'amount':
                if (this.amount > 1) {
                    this.shadowRoot.querySelector('slot[name="amount"]').innerHTML = 'x' + this.amount;
                } else {
                    this.shadowRoot.querySelector('slot[name="amount"]').innerHTML = '';
                }
                break;
        }
    }
}