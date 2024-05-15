import {html, render} from "lit-html";
import {getItem, setItem} from "../service/storage-service";
export class TickRoutes extends HTMLElement {

    routes = []
    foundRoutes = []
    tickedRoutes = new Set()
    selectedRoute = null
    routeApi = 'https://p01--heavens-gate-routes-api--dn2jq92t54q6.code.run/routes';
    apiToken = 'NdM~sPuEc2rAc5Rnz9LDF3EHT';

    connectedCallback() {
        this.load()
        this.render()
    }

    async load() {
        const savedRoutes = getItem('routes');

        if (savedRoutes) {
            this.routes = savedRoutes;
            this.render()
        } else {
            await this.loadRoutesAndRender();
        }

        getItem('tickedRoutes', []).forEach(route=>this.tickedRoutes.add(route.id))
    }

    render() {
        render(html`
            <div>
                <label>LineNr</label>
                <input class="search" name="search" @keyup="${e=>this.search(e.target.value)}" type="number" placeholder="search">
                <button @click="${_=>this.loadRoutesAndRender()}">RELOAD ROUTES</button>
            </div>
            ${this.selectedRoute ? html`
                <div class="route">
                    <span class="route-color" style="background: ${this.selectedRoute.hexColor}"></span>
                    <span>${this.selectedRoute.line}</span>
                    <span>${this.selectedRoute.name}</span>
                    <span>${this.selectedRoute.grade}</span>
                    <span>${this.selectedRoute.height}m</span>
                </div>
                <button @click="${_=>this.tickRoute()}">TICK</button>
                <button @click="${_=>this.cancelSelection()}">CANCEL</button>
            `: html`
                <div id="routeResult">
                    ${this.foundRoutes.length > 0 ? html`
                    <div @click="${_=>this.clear()}" class="route cancel">CANCEL</div>
                    ${this.foundRoutes.map(route=> html`
                        <div class="route ${this.tickedRoutes.has(route.id) ? 'ticked' : ''}" @click="${e=>this.selectRoute(e, route)}">
                            <span class="route-color" style="background: ${route.hexColor}"></span>
                            <span>${route.line.substring(0, 3)}</span>
                            <span>${route.name}</span>
                            <span>${route.grade}</span>
                            <span>${route.height}m</span>
                        </div>
                    `)}
                ` : ''}
                </div>
            `}
        `, this)
    }

    async loadRoutesAndRender() {
        const response = await fetch(this.routeApi, {
            headers: {Authorization: `Bearer ${this.apiToken}`}
        });
        this.routes = await response.json();
        setItem('routes', this.routes);
        this.render()
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
        if(!this.tickedRoutes.has(route.id)) {
            this.selectedRoute = route
            this.render()
        }
    }

    tickRoute() {
        this.tickedRoutes.add(this.selectedRoute.id)
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
