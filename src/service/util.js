
export function getSpeed(meter, timeInSec) {
    return meter / (timeInSec / 60)
}

export function groupBy(arr, key) {
    return arr.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export function asSpeed(speed) {
    return speed == null ? 0.0.toFixed(2) : speed.toFixed(2)
}
export function parseTime(timeStr) {
    const part = timeStr.split(':')
    return (parseInt(part[0]) * 3600) + (parseInt(part[1]) * 60) + parseInt(part[2])
}
export function asMinuteTime(totalSeconds) {
    return new Date(totalSeconds * 1000).toISOString().substring(14, 19)
}
export function asTime(totalSeconds) {
    return new Date(totalSeconds * 1000).toISOString().substring(11, 19)
    // const hours = Math.floor(totalSeconds / 3600);
    // const minutes = Math.floor(totalSeconds % 3600 / 60);
    // const seconds = totalSeconds % 3600 % 60;
    // return `${hours}:${minutes}:${seconds}`
}