import {html, render} from "lit-html";
import {getItem, setItem} from "../service/storage-service";
import {asSpeed, asTime, getSpeed} from "../service/util";
import Chart from 'chart.js/auto';
export class HomeStart extends HTMLElement {

    totalTime = 8 * 60 * 60
    totalMeter = 1300
    aimedSpeed = this.totalMeter / (this.totalTime/60)
    started = null
    tickedRoutes = []
    speedData = []

    chart = null

    connectedCallback() {
        this.load()
        this.render()
        this.setupChart()
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize(e) {
        this.setCanvasSize()
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
             <tick-routes @ticked="${e=>this.routeTicked(e.detail)}"></tick-routes>
            
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

             <div id="chart" style=""><canvas></canvas></div>
            
             <div>
                 ${this.tickedRoutes.map(route => {
                     return html`
                         <div class="route ticked">
                             <span>${route.line.substring(0, 3)}</span>
                             <span>${route['route-links']}</span>
                             <span>${route['vr-grade']}</span>
                             <span>${route.height}m</span>
                         </div>
                 `})}
             </div>
            
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
        const speed = getSpeed(meterDone, meterDoneAt, this.started)
        this.speedData.push({
            meter: meterDone,
            time: meterDoneAt,
            speed: speed
        })
        setItem('speedData', this.speedData)
        this.chart.data.labels.push(asTime(meterDoneAt - this.started));
        this.chart.data.datasets[0].data.push(speed)
        this.chart.data.datasets[1].data.push(meterDone)
        this.chart.update();
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
        this.intervalTimer = setInterval(()=> this.render(), 1000)
    }

    setCanvasSize() {
        if (this.canvas) {
            const width = Math.floor(Math.min(window.innerWidth * 0.9, 800.0))
            const height = Math.floor(width * 0.5)
            this.canvas.style.width = width+'px'
            this.canvas.style.height = height+'px'
        }
        if (this.chart) this.chart.update()
    }

    setupChart() {
        this.canvas = this.querySelector('#chart canvas')
        this.setCanvasSize()
        this.chart = new Chart(this.canvas
            , {
                type: 'line',
                data: {
                    labels: this.speedData.map(item=>asTime(item.time - this.started)),
                    datasets: [
                        {
                            label: 'Speed',
                            data: this.speedData.map(item=>item.speed),
                            yAxisID: 'y',
                        },
                        {
                            label: 'Total Meter',
                            data: this.speedData.map(item=>item.meter),
                            yAxisID: 'y1',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    }
                }
            })
    }
}

customElements.define("home-start", HomeStart)