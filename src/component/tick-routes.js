import {html, render} from "lit-html";
import {getItem} from "../service/storage-service";
export class TickRoutes extends HTMLElement {

    routes = []
    foundRoutes = []
    tickedRoutes = new Set()
    selectedRoute = null

    connectedCallback() {
        this.load()
        this.render()
    }

    load() {
        fetch(`/assets/routes.json`).then(r=>r.json()).then(routes => {
            this.routes = routes
            this.render()
        })
        getItem('tickedRoutes', []).forEach(r=>this.tickedRoutes.add(r['route-links-href']))
    }

    render() {
        render(html`
            <div>
                <label>LineNr</label>
                <input class="search" name="search" @keyup="${e=>this.search(e.target.value)}" type="number" placeholder="search">
            </div>
            ${this.selectedRoute ? html`
                <div class="route">
                    <span>${this.selectedRoute.line.substring(0, 3)}</span>
                    <span>${this.selectedRoute['route-links']}</span>
                    <span>${this.selectedRoute['vr-grade']}</span>
                    <span>${this.selectedRoute.height}m</span>
                </div>
                <button @click="${_=>this.tickRoute()}">TICK</button>
                <button @click="${_=>this.cancelSelection()}">CANCEL</button>
            `: html`
                <div id="routeResult">
                    ${this.foundRoutes.length > 0 ? html`
                    <div @click="${_=>this.clear()}" class="route cancel">CANCEL</div>
                    ${this.foundRoutes.map(route=> html`
                        <div class="route ${this.tickedRoutes.has(route['route-links-href']) ? 'ticked' : ''}" @click="${e=>this.selectRoute(e, route)}">
                            <span>${route.line.substring(0, 3)}</span>
                            <span>${route['route-links']}</span>
                            <span>${route['vr-grade']}</span>
                            <span>${route.height}m</span>
                        </div>
                    `)}
                ` : ''}
                </div>
            `}
        `, this)
    }

    clear() {
        this.selectedRoute = null
        this.querySelector('input[name=search]').value = ''
        this.search('')
    }

    cancelSelection() {
        this.selectedRoute = null
        this.render()
    }
    selectRoute(e, route) {
        e.stopPropagation()
        if(!this.tickedRoutes.has(route['route-links-href'])) {
            this.selectedRoute = route
            this.render()
        }
    }

    tickRoute() {
        this.tickedRoutes.add(this.selectedRoute['route-links-href'])
        this.dispatchEvent(new CustomEvent('ticked', { detail: this.selectedRoute }))
        this.clear()
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