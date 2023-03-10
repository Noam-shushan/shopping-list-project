let template = document.createElement('template');
template.innerHTML = `
    <style>
        #tabs {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        #tabs ::slotted(*) {
            background-color: #76b39d44;
            color: #a0b3b0;
            font-size: 1rem;
            border: none;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease-in-out;
        }
        #tabs ::slotted([aria-selected="true"]) {
            background-color: #64b798;
            color: white;
        }
        #tabs ::slotted(:focus) {
            z-index: 1; /* make sure focus ring doesn't get buried */
        }
        #tabs ::slotted(:hover) {
            background-color: #76b39dbf;
            color: whitesmoke;
        }
        #panels ::slotted([aria-hidden="true"]) {
            display: none;
        }

    </style>

    <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
    </div>
    <div id="panels">
        <slot id="panelsSlot"></slot>
    </div>
`;

let selected_ = null;

export class TabControl extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get selected() {
        return selected_;
    }

    set selected(idx) {
        selected_ = idx;
        this._selectTab(idx);

        // Updated the element's selected attribute value when
        // backing property changes.
        this.setAttribute('selected', idx);
    }

    connectedCallback() {
        this.setAttribute('role', 'tablist');

        const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
        const panelsSlot = this.shadowRoot.querySelector('#panelsSlot');

        this.tabs = tabsSlot.assignedNodes({ flatten: true });
        this.panels = panelsSlot.assignedNodes({ flatten: true }).filter(el => {
            return el.nodeType === Node.ELEMENT_NODE;
        });

        // Add aria role="tabpanel" to each content panel.
        for (let [i, panel] of this.panels.entries()) {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('tabindex', 0);
        }

        // Save refer to we can remove listeners later.
        this._boundOnTitleClick = this._onTitleClick.bind(this);
        this._boundOnKeyDown = this._onKeyDown.bind(this);

        tabsSlot.addEventListener('click', this._boundOnTitleClick);
        tabsSlot.addEventListener('keydown', this._boundOnKeyDown);

        this.selected = this._findFirstSelectedTab() || 0;
    }

    disconnectedCallback() {
        const tabsSlot = this.shadowRoot.querySelector('#tabsSlot');
        tabsSlot.removeEventListener('click', this._boundOnTitleClick);
        tabsSlot.removeEventListener('keydown', this._boundOnKeyDown);
    }

    _onTitleClick(e) {
        if (e.target.slot === 'title') {
            this.selected = this.tabs.indexOf(e.target);
            e.target.focus();
        }
    }

    _onKeyDown(e) {
        switch (e.code) {
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                var idx = this.selected - 1;
                idx = idx < 0 ? this.tabs.length - 1 : idx;
                this.tabs[idx].click();
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                var idx = this.selected + 1;
                this.tabs[idx % this.tabs.length].click();
                break;
            default:
                break;
        }
    }

    _findFirstSelectedTab() {
        let selectedIdx;
        for (let [i, tab] of this.tabs.entries()) {
            tab.setAttribute('role', 'tab');

            // Allow users to declaratively select a tab
            // Highlight last tab which has the selected attribute.
            if (tab.hasAttribute('selected')) {
                selectedIdx = i;
            }
        }
        return selectedIdx;
    }

    _selectTab(idx = null) {
        for (let i = 0, tab; tab = this.tabs[i]; ++i) {
            let select = i === idx;
            tab.setAttribute('tabindex', select ? 0 : -1);
            tab.setAttribute('aria-selected', select);
            this.panels[i].setAttribute('aria-hidden', !select);
        }
    }
}