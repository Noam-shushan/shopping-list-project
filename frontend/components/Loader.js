const template = document.createElement('template');
template.innerHTML = `
    <style>
        .loader {
            width: 48px;
            height: 48px;
            border: 3px solid #FFF;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }
        
        .loader::after {
            content: '';
            box-sizing: border-box;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 3px solid transparent;
            border-bottom-color: #b8e6df;
        }
        
        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }
        
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    <span class="loader"></span>
`;

export class Loader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    /**
     * @returns {boolean}
     */
    get loading() {
        return this.getAttribute('loading');
    }

    /**
     * @param {boolean} value
     */
    set loading(value) {
        this.setAttribute('loading', value);
    }

    static get observedAttributes() {
        return ['loading'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'loading') {
            if (this.loading) {
                this.shadowRoot.querySelector('.loader').style.display = 'inline-block';
            } else {
                this.shadowRoot.querySelector('.loader').style.display = 'none';
            }
        }
    }
}