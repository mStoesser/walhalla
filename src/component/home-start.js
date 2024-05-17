import {html, render} from "lit-html";
import {getItem, setItem} from "../service/storage-service";
import {asMinuteTime, asSpeed, asTime, getSpeed, groupBy, parseTime} from "../service/util";
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
        this.calcFreeRoutes()
        if(this.started) this.startInterval()
    }

    get meterDone() {
        return this.speedData.length > 0 ? this.speedData[this.speedData.length-1].meterTotal : 0
    }

    getSpeed(i= 1) {
        const current = this.speedData.length >= i ? this.speedData[this.speedData.length-i] : null
        return current ? current.speed: 0.0
    }

    getLastTime(i= 1) {
        const current = this.speedData.length >= i ? this.speedData[this.speedData.length-i] : null
        return current ? current.time: (this.started || 0.0)
    }
    getLastTimeTook(i= 1) {
        const current = this.speedData.length >= i ? this.speedData[this.speedData.length-i] : null
        return current ? current.timeTook: 0.0
    }

    render() {
        const currentTime = Math.floor(new Date().getTime() / 1000)
        const timeGone = this.started ? (currentTime - this.started) : 0
        const currentSpeed = this.getSpeed(1)
        const lastSpeed = this.getSpeed(2)
        const speedChange = currentSpeed - lastSpeed;
        const currentTimeTook = currentTime - this.getLastTime()
        const timeTook = this.getLastTimeTook()
        render(html`
             <tick-routes @ticked="${e=>this.routeTicked(e.detail)}"></tick-routes>

             <div class="overview-grid">
                 <span class="green">${asTime(timeGone)}</span>
                 ${this.started ? html`
                     <span class="red">${asTime(this.totalTime - timeGone)}</span>
                 ` : html`
                     <input type="text" name="time" value="${asTime(this.totalTime)}">
                 `}

                <span class="green">${this.meterDone} m</span>
                 ${this.started ? html`
                     <span class="red">${this.totalMeter - this.meterDone} m</span>
                 ` : html`
                     <input type="number" name="meter" value="${this.totalMeter}">
                 `}
                 <span class="green">${asMinuteTime(currentTimeTook)}</span>
                 <span class="red">${asMinuteTime(timeTook)}</span>

                 <span class="${currentSpeed > this.aimedSpeed ? 'green' : 'red'}">${asSpeed(currentSpeed)}</span>
                 <span class="${lastSpeed > this.aimedSpeed ? 'green' : 'red'}">
                     <span>${asSpeed(lastSpeed)}</span>
                     <span class="${speedChange >= 0 ? 'green' : 'red'}">(${asSpeed(speedChange)})</span>
                 </span>
             </div>

             <div id="chart" style=""><canvas></canvas></div>


             <button @click="${_ => this.querySelector('#freeRoutes').classList.toggle('hidden')}">Show Free Routes</button>
             <div id="freeRoutes">
                 <div class="area">
                     <svg xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="150 120 250 170" >
                         <rect x="154" y="122" width="80" height="80" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/>
                         <rect x="234" y="122" width="80" height="80" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/>
                         <rect x="314" y="122" width="80" height="80" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/>
                         <rect x="154" y="202" width="80" height="80" fill="#e1d5e7" stroke="#9673a6" pointer-events="all"/>
                         <text x="216" y="277" text-anchor="middle" fill="${this.routesPerLine['101']}">101</text>
                         <text x="182" y="277" text-anchor="middle" fill="${this.routesPerLine['102']}">102</text>
                         <text x="167" y="260" text-anchor="middle" fill="${this.routesPerLine['104']}">104</text>
                         <text x="167" y="234" text-anchor="middle" fill="${this.routesPerLine['105']}">105</text>
                         <text x="191" y="217" text-anchor="middle" fill="${this.routesPerLine['107']}">107</text>
                         <text x="200" y="198" text-anchor="middle" fill="${this.routesPerLine['201']}">201</text>
                         <text x="167" y="198" text-anchor="middle" fill="${this.routesPerLine['202']}">202</text>
                         <text x="167" y="180" text-anchor="middle" fill="${this.routesPerLine['203']}">203</text>
                         <text x="167" y="157" text-anchor="middle" fill="${this.routesPerLine['204']}">204</text>
                         <text x="175" y="134" text-anchor="middle" fill="${this.routesPerLine['206']}">206</text>
                         <text x="202" y="134" text-anchor="middle" fill="${this.routesPerLine['207']}">207</text>
                         <text x="224" y="134" text-anchor="middle" fill="${this.routesPerLine['208']}">208</text>
                         <text x="246" y="180" text-anchor="middle" fill="${this.routesPerLine['301']}">301</text>
                         <text x="246" y="157" text-anchor="middle" fill="${this.routesPerLine['302']}">302</text>
                         <text x="253" y="134" text-anchor="middle" fill="${this.routesPerLine['304']}">304</text>
                         <text x="278" y="134" text-anchor="middle" fill="${this.routesPerLine['305']}">305</text>
                         <text x="302" y="134" text-anchor="middle" fill="${this.routesPerLine['306']}">306</text>
                         <text x="302" y="157" text-anchor="middle" fill="${this.routesPerLine['307']}">307</text>
                         <text x="302" y="180" text-anchor="middle" fill="${this.routesPerLine['308']}">308</text>
                         <text x="325" y="157" text-anchor="middle" fill="${this.routesPerLine['402']}">402</text>
                         <text x="336" y="134" text-anchor="middle" fill="${this.routesPerLine['403']}">403</text>
                         <text x="362" y="134" text-anchor="middle" fill="${this.routesPerLine['404']}">404</text>
                         <text x="383" y="134" text-anchor="middle" fill="${this.routesPerLine['405']}">405</text>
                         <text x="383" y="157" text-anchor="middle" fill="${this.routesPerLine['406']}">406</text>
                         <text x="383" y="180" text-anchor="middle" fill="${this.routesPerLine['407']}">407</text>
                         <text x="370" y="198" text-anchor="middle" fill="${this.routesPerLine['409']}">409</text>
                         <text x="344" y="198" text-anchor="middle" fill="${this.routesPerLine['410']}">410</text>
                     </svg>
                     <div>
                         <h2>Puréesilos</h2>
                         <div class="available-routes">
                            ${this.routesPerArea['Puréesilos'].map(data=> html`<span>${data.grade}</span><span>${data.count}</span><span>${data.meter}m</span>`)}
                        </div>
                     </div>
                 </div>
                 <div class="area">
                     <svg xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="312 200 170 170" >
                         <rect x="314" y="202" width="80" height="80" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/>
                         <rect x="394" y="282" width="80" height="80" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/>
                         <rect x="314" y="282" width="80" height="80" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/>
                         <rect x="394" y="202" width="80" height="80" fill="#fff2cc" stroke="#d6b656" pointer-events="all"/>
                         <path d="M 314 362 L 394 282" fill="none" stroke="#663300" stroke-miterlimit="10" pointer-events="stroke"/>
                         <rect x="314" y="233" width="24" height="14" fill="#ffb366" stroke="#cc6600" pointer-events="all"/>
                         <text x="340" y="360" text-anchor="middle" fill="${this.routesPerLine['501']}">501</text>
                         <text x="364" y="336" text-anchor="middle" fill="${this.routesPerLine['502']}">502</text>
                         <text x="383" y="315" text-anchor="middle" fill="${this.routesPerLine['503']}">503</text>
                         <text x="362" y="297" text-anchor="middle" fill="${this.routesPerLine['504']}">504</text>
                         <text x="344" y="320" text-anchor="middle" fill="${this.routesPerLine['505']}">505</text>
                         <text x="326" y="339" text-anchor="middle" fill="${this.routesPerLine['506']}">506</text>
                         <text x="327" y="281" text-anchor="middle" fill="${this.routesPerLine['601']}">601</text>
                         <text x="326" y="260" text-anchor="middle" fill="${this.routesPerLine['602']}">602</text>
                         <text x="351" y="244" text-anchor="middle" fill="${this.routesPerLine['603']}">603</text>
                         <text x="327" y="230" text-anchor="middle" fill="${this.routesPerLine['604']}">604</text>
                         <text x="326" y="214" text-anchor="middle" fill="${this.routesPerLine['605']}">605</text>
                         <text x="348" y="214" text-anchor="middle" fill="${this.routesPerLine['606']}">606</text>
                         <text x="373" y="214" text-anchor="middle" fill="${this.routesPerLine['607']}">607</text>
                         <text x="383" y="225" text-anchor="middle" fill="${this.routesPerLine['608']}">608</text>
                         <text x="406" y="279" text-anchor="middle" fill="${this.routesPerLine['701']}">701</text>
                         <text x="433" y="279" text-anchor="middle" fill="${this.routesPerLine['702']}">702</text>
                         <text x="462" y="279" text-anchor="middle" fill="${this.routesPerLine['703']}">703</text>
                         <text x="406" y="255" text-anchor="middle" fill="${this.routesPerLine['704']}">704</text>
                         <text x="434" y="297" text-anchor="middle" fill="${this.routesPerLine['801']}">801</text>
                         <text x="462" y="297" text-anchor="middle" fill="${this.routesPerLine['802']}">802</text>
                         <text x="462" y="320" text-anchor="middle" fill="${this.routesPerLine['803']}">803</text>
                         <text x="461" y="342" text-anchor="middle" fill="${this.routesPerLine['804']}">804</text>
                         <text x="446" y="357" text-anchor="middle" fill="${this.routesPerLine['805']}">805</text>
                         <text x="415" y="357" text-anchor="middle" fill="${this.routesPerLine['806']}">806</text>
                     </svg>
                     <div>
                         <h2>Knödelsilos</h2>
                         <div class="available-routes">
                            ${this.routesPerArea['Knödelsilos'].map(data=> html`<span>${data.grade}</span><span>${data.count}</span><span>${data.meter}m</span>`)}
                        </div>
                     </div>
                 </div>  
                 <div class="area">
                     <svg xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="150 360 330 160" >
                         <rect x="154" y="362" width="320" height="148" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/>
                         <text x="406" y="381" text-anchor="middle" fill="${this.routesPerLine['901']}">901</text>
                         <text x="441" y="381" text-anchor="middle" fill="${this.routesPerLine['902']}">902</text>
                         <text x="454" y="393" text-anchor="middle" fill="${this.routesPerLine['903']}">903</text>
                         <text x="454" y="429" text-anchor="middle" fill="${this.routesPerLine['904']}">904</text>
                         <text x="454" y="463" text-anchor="middle" fill="${this.routesPerLine['905']}">905</text>
                         <text x="454" y="499" text-anchor="middle" fill="${this.routesPerLine['906']}">906</text>
                         <text x="411" y="499" text-anchor="middle" fill="${this.routesPerLine['907']}">907</text>
                         <text x="293" y="499" text-anchor="middle" fill="${this.routesPerLine['909']}">909</text>
                         <text x="251" y="499" text-anchor="middle" fill="${this.routesPerLine['910']}">910</text>
                         <text x="216" y="499" text-anchor="middle" fill="${this.routesPerLine['911']}">911</text>
                         <text x="180" y="499" text-anchor="middle" fill="${this.routesPerLine['912']}">912</text>
                         <text x="181" y="440" text-anchor="middle" fill="${this.routesPerLine['913']}">913</text>
                         <text x="180" y="381" text-anchor="middle" fill="${this.routesPerLine['914']}">914</text>
                         <text x="216" y="381" text-anchor="middle" fill="${this.routesPerLine['915']}">915</text>
                         <text x="253" y="381" text-anchor="middle" fill="${this.routesPerLine['916']}">916</text>
                         <text x="288" y="381" text-anchor="middle" fill="${this.routesPerLine['917']}">917</text>
                         <text x="318" y="381" text-anchor="middle" fill="${this.routesPerLine['918']}">918</text>
                     </svg>
                     <div>
                         <h2>Neue Kartoffelhalle</h2>
                         <div class="available-routes">
                            ${this.routesPerArea['Neue Kartoffelhalle'].map(data=> html`<span>${data.grade}</span><span>${data.count}</span><span>${data.meter}m</span>`)}
                        </div>
                     </div>
                 </div>
                 <div class="area">
                     <svg xmlns="http://www.w3.org/2000/svg" width="90%" viewBox="150 505 330 135" >
                         <rect x="154" y="510" width="320" height="120" fill="#ffe6cc" stroke="#d79b00" pointer-events="all"/>
                         <text x="171" y="615" text-anchor="middle" fill="${this.routesPerLine['001']}">D01</text>
                         <text x="169" y="567" text-anchor="middle" fill="${this.routesPerLine['002']}">D02</text>
                         <text x="171" y="529" text-anchor="middle" fill="${this.routesPerLine['003']}">D03</text>
                         <text x="213" y="529" text-anchor="middle" fill="${this.routesPerLine['004']}">D04</text>
                         <text x="253" y="529" text-anchor="middle" fill="${this.routesPerLine['005']}">D05</text>
                         <text x="293" y="529" text-anchor="middle" fill="${this.routesPerLine['006']}">D06</text>
                         <text x="330" y="529" text-anchor="middle" fill="${this.routesPerLine['007']}">D07</text>
                         <text x="402" y="529" text-anchor="middle" fill="${this.routesPerLine['008']}">D08</text>
                         <text x="446" y="529" text-anchor="middle" fill="${this.routesPerLine['009']}">D09</text>
                     </svg>
                     <div>
                         <h2>Friteuse</h2>
                         <div class="available-routes">
                             ${this.routesPerArea['Friteuse'].map(data=> html`<span>${data.grade}</span><span>${data.count}</span><span>${data.meter}m</span>`)}
                         </div>
                     </div>
                 </div>
             </div>
             <div>
                 ${this.tickedRoutes.map(route => {
                     return html`
                         <div class="route ticked">
                             <span class="route-color" style="background: ${route.hexColor}"></span>
                             <span>${route.line}</span>
                             <span>${route.name}</span>
                             <span>${route.grade}</span>
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

    routesPerArea = { 'Puréesilos': [], 'Neue Kartoffelhalle': [], 'Knödelsilos': [], 'Friteuse': []}
    routesPerLine = {}
    calcFreeRoutes() {
        const allRoutes = getItem('routes')
        const routesToClimb = allRoutes.filter(route => !this.tickedRoutes.find(ticked=>ticked.id == route.id))
        Object.entries(groupBy(routesToClimb, 'area')).forEach(([area, routes]) => {
            const routesPerGrade = routes.reduce((acc, cur)=>{
                if(cur.grade.includes('4')) (acc['4'] = acc['4'] || []).push(cur);
                else if(cur.grade.includes('5')) (acc['5'] = acc['5'] || []).push(cur);
                else if(cur.grade.includes('6')) (acc['6'] = acc['6'] || []).push(cur);
                else if(cur.grade.includes('7')) (acc['7'] = acc['7'] || []).push(cur);
                else (acc['other'] = acc['other'] || []).push(cur);
                return acc
            },{})
            this.routesPerArea[area] = Object.entries(routesPerGrade).map(([grade, routes])=> ({
                grade: grade,
                count: routes?.length || 0,
                meter: routes?.reduce((a,c)=>a+c.height, 0) || 0,
            }))
        })
        this.routesPerLine = {}
        Object.entries(groupBy(routesToClimb, 'line')).forEach(([line, routes]) => {
            if(routes.length === 0)
                this.routesPerLine[line] = 'grey'
            else if(routes.find(route => route.grade.includes('4') || route.grade.includes('5') || route.grade.includes('6')))
                this.routesPerLine[line] = 'green'
            else if(routes.find(route => route.grade.includes('7')))
                this.routesPerLine[line] = 'red';
            else
                this.routesPerLine[line] = 'purple';
        })
    }

    routeTicked(route) {
        this.tickedRoutes.unshift(route)
        setItem('tickedRoutes', this.tickedRoutes)
        const lastDone = this.speedData.length > 0 ? this.speedData[this.speedData.length-1].time : this.started
        const meterDone =  parseFloat(route.height)
        const meterTotal = this.meterDone + meterDone
        const doneAt = Math.floor(new Date().getTime() / 1000)
        const timeTook = doneAt - lastDone
        const speed = getSpeed(meterDone, timeTook)
        this.speedData.push({
            meter: meterDone,
            meterTotal: meterTotal,
            timeTook: timeTook,
            time: doneAt,
            speed: speed
        })
        setItem('speedData', this.speedData)
        this.chart.data.labels.push(asTime(doneAt - this.started));
        this.chart.data.datasets[0].data.push(speed)
        this.chart.data.datasets[1].data.push(meterTotal)
        this.chart.update();
        this.calcFreeRoutes()
        this.render()
    }

    setTotalTime() {
        this.totalTime = parseTime(this.querySelector('input[name=time]').value)
        setItem('totalTime', this.totalTime)
        this.render()
    }

    setTotalMeter() {
        this.totalMeter = this.querySelector('input[name=meter]').value
        setItem('totalMeter', this.totalMeter)
        this.render()
    }

    start() {
        this.totalTime = parseTime(this.querySelector('input[name=time]').value)
        this.totalMeter = this.querySelector('input[name=meter]').value
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
            this.routesPerArea = { 'Puréesilos': [], 'Neue Kartoffelhalle': [], 'Knödelsilos': [], 'Friteuse': []}
            this.routesPerLine = {}
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
                            data: this.speedData.map(item=>item.meterTotal),
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
