import {html, render} from "lit-html";
export class TickRoutes extends HTMLElement {

    routes = []
    foundRoutes = []

    connectedCallback() {
        this.load()
        this.render()
    }

    load() {
        fetch(`/assets/routes.json`).then(r=>r.json()).then(routes => {
            this.routes = routes
            this.render()
        })

    }

    render() {
        render(html`
            <div>
            <label>LineNr</label>
            <input name="search" @keyup="${e=>this.search(e.target.value)}" type="number" placeholder="search">
            </div>
            ${this.foundRoutes.map(route=> html`
                <div @click="${e=>this.tickRoute(e, route)}" class="route">
                    <span>${route.line.substring(0, 3)}</span>
                    <span>${route['route-links']}</span>
                    <span>${route['vr-grade']}</span>
                    <span>${route.height}</span>
                </div>
            `)}

        `, this)
    }

    tickRoute(e, route) {
        e.stopPropagation()
        this.dispatchEvent(new CustomEvent('ticked', { detail: route }))
        this.querySelector('input[name=search]').value = ''
        this.search('')
    }


    search(searchStr) {
        if (searchStr.length > 0)
            this.foundRoutes = this.routes.filter(route => route.line.startsWith(searchStr))
        else
            this.foundRoutes = []
        this.render()
    }


}

customElements.define("tick-routes", TickRoutes)