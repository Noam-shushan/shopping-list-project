let template = document.createElement('template');
template.innerHTML = `
    <style>
        .chat {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 100%;
            border: 1px solid #ccc;
            height: 100vh;
        }

        .list {
            display: flex;
            flex-direction: column;
            gap: 0.1em;
            border-radius: 5px;
            padding: 0.1em;
            scroll-behavior: smooth;
            overflow-y: scroll;

        }

        .new-item {
            display: flex;
            flex-direction: row;
            align-items: center;

            background: #a7bcb9;
            border-top: 2px solid #24527a;
            padding: 0.5em;
            margin-top: 0.5em;
        }

        input[type="text"] {
            border: none;
            background: inherit;
            font-size: 1.5em;
            width: 100%;
            font-family: 'Nunito', sans-serif;
            color: #24527a;
        }
        input[type="text"]:focus {
            outline: none;
        }

        svg {
            width: 1.2em;
            height: 1.2em;
            cursor: pointer;
            position: relative;
            right: 0;
            z-index: 5;
            display: inline-block;
        }
    </style>
    <div class="chat"> 
        <div class="list">
            <slot></slot>
        </div>
        <div class="new-item">
            <input id="new-product" type="text" placeholder=">" tabindex="0">
            <svg id="add-product" viewBox="0 0 24 24" fill="none">
                <path d="M10.5004 11.9998H5.00043M4.91577 12.2913L2.58085 19.266C2.39742 19.8139 2.3057 20.0879 2.37152 20.2566C2.42868 20.4031 2.55144 20.5142 2.70292 20.5565C2.87736 20.6052 3.14083 20.4866 3.66776 20.2495L20.3792 12.7293C20.8936 12.4979 21.1507 12.3822 21.2302 12.2214C21.2993 12.0817 21.2993 11.9179 21.2302 11.7782C21.1507 11.6174 20.8936 11.5017 20.3792 11.2703L3.66193 3.74751C3.13659 3.51111 2.87392 3.39291 2.69966 3.4414C2.54832 3.48351 2.42556 3.59429 2.36821 3.74054C2.30216 3.90893 2.3929 4.18231 2.57437 4.72906L4.91642 11.7853C4.94759 11.8792 4.96317 11.9262 4.96933 11.9742C4.97479 12.0168 4.97473 12.0599 4.96916 12.1025C4.96289 12.1506 4.94718 12.1975 4.91577 12.2913Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
`;

export class ShoppingList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('#new-product').addEventListener('keyup', this.addNewItemOnEnter.bind(this));
        this.shadowRoot.querySelector('#add-product').addEventListener('click', this.addNewItem.bind(this));
    }

    get listName() {
        return this.getAttribute('listName');
    }

    set listName(value) {
        this.setAttribute('listName', value);
    }

    static get observedAttributes() {
        return ['listName'];
    }

    addNewItemOnEnter(event) {
        if (event.key === 'Enter') {
            const newItem = document.createElement('list-item');
            newItem.product = event.target.value;
            event.target.value = '';
            const list = this.shadowRoot.querySelector('.list');
            list.appendChild(newItem);
            this.fireOnNewItemEvent(newItem);
        }
    }

    addNewItem() {
        const newItem = document.createElement('list-item');
        newItem.product = this.shadowRoot.querySelector('#new-product').value;
        this.shadowRoot.querySelector('#new-product').value = '';
        const list = this.shadowRoot.querySelector('.list');
        list.appendChild(newItem);
        this.fireOnNewItemEvent(newItem);
    }

    fireOnNewItemEvent(newItem) {
        const onNewItemEvent = new CustomEvent('onNewItem', {
            bubbles: true,
            composed: true,
            detail: {
                product: newItem.product,
                amount: newItem.amount,
                listName: this.listName
            }
        });
        this.dispatchEvent(onNewItemEvent);
    }

    dradAndDropItems() {
        const list = this.shadowRoot.querySelector('.list');
        list.addEventListener('dragover', (event) => {
            event.preventDefault();
            const afterElement = this.getDragAfterElement(list, event.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                list.appendChild(draggable);
            } else {
                list.insertBefore(draggable, afterElement);
            }
        });
    }
}