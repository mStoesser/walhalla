import {html, render} from "lit-html";
import {getItem, setItem} from "../service/storage-service";
import {asSpeed, asTime, getSpeed} from "../service/util";
export class HomeStart extends HTMLElement {

    totalTime = 8 * 60 * 60
    totalMeter = 1300
    aimedSpeed = this.totalMeter / (this.totalTime/60)
    started = null
    tickedRoutes = []
    speedData = []

    connectedCallback() {
        this.load()
        this.render()
    }

    load() {
        this.started = getItem('started')
        this.totalTime = getItem('totalTime', 8 * 60 * 60)
        this.totalMeter = getItem('totalMeter', 1300)
        this.aimedSpeed = this.totalMeter / (this.totalTime/60)
        this.tickedRoutes = getItem('tickedRoutes', [])
        this.speedData = getItem('speedData', [])
        if(this.started) this.startInterval()
    }

    get meterDone() {
        return this.speedData.length > 0 ? this.speedData[this.speedData.length-1].meter : 0
    }

    getSpeed(i= 1) {
        const current = this.speedData.length >= i ? this.speedData[this.speedData.length-i] : null
        return current ? current.speed: 0.0
    }

    render() {
        const timeGone = this.started ? (Math.floor(new Date().getTime() / 1000) - this.started) : 0
        const currentSpeed = this.getSpeed(1)
        const lastSpeed = this.getSpeed(2)
        const speedChange = currentSpeed - lastSpeed;
        render(html`
             <div class="overview-grid">
                <span class="green">${asTime(timeGone)}</span>
                <span class="red">${asTime(this.totalTime - timeGone)}</span>
                
                <span class="green">${this.meterDone} m</span>
                <span class="red">${this.totalMeter - this.meterDone} m</span>

                 <span class="${currentSpeed > this.aimedSpeed ? 'green' : 'red'}">${asSpeed(currentSpeed)}</span>
                 <span class="${lastSpeed > this.aimedSpeed ? 'green' : 'red'}">
                     <span>${asSpeed(lastSpeed)}</span>
                     <span class="${speedChange >= 0 ? 'green' : 'red'}">(${asSpeed(speedChange)})</span>
                 </span>
            </div>
            
            <tick-routes @ticked="${e=>this.routeTicked(e.detail)}"></tick-routes>
            
            ${this.started ? html`
                <button @click="${_=>this.reset()}">reset</button>`
            : html`
                <button @click="${_=>this.start()}">start</button>
            `}
        `, this)
    }

    routeTicked(route) {
        this.tickedRoutes.push(route)
        setItem('tickedRoutes', this.tickedRoutes)
        const meterDone =  this.meterDone + parseFloat(route.height)
        const meterDoneAt = Math.floor(new Date().getTime() / 1000)
        this.speedData.push({
            meter: meterDone,
            time: meterDoneAt,
            speed: getSpeed(meterDone, meterDoneAt, this.started)
        })
        setItem('speedData', this.speedData)
        this.render()
    }

    start() {
        this.started = Math.floor(new Date().getTime() / 1000)
        setItem('started', this.started)
        setItem('totalTime', this.totalTime)
        setItem('totalMeter', this.totalMeter)
        this.startInterval()
    }

    reset() {
        if(confirm('Really reset?')) {
            this.started = null
            this.speedData = []
            this.tickedRoutes = []
            setItem('started', this.started)
            setItem('speedData', this.speedData)
            setItem('tickedRoutes', this.tickedRoutes)
            clearInterval(this.intervalTimer);
            this.render()
        }
    }

    startInterval() {
        this.intervalTimer = setInterval(()=>{
            this.render()
        }, 1000)
    }
}

customElements.define("home-start", HomeStart)