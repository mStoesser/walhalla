
export function getSpeed(meter, tickTime, startTime) {
    return meter / ((tickTime - startTime) / 60)
}

export function asSpeed(speed) {
    return speed == null ? 0.0.toFixed(2) : speed.toFixed(2)
}
export function asTime(totalSeconds) {
    return new Date(totalSeconds * 1000).toISOString().substring(11, 19)
    // const hours = Math.floor(totalSeconds / 3600);
    // const minutes = Math.floor(totalSeconds % 3600 / 60);
    // const seconds = totalSeconds % 3600 % 60;
    // return `${hours}:${minutes}:${seconds}`
}