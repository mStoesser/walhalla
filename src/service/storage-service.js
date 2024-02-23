
const prefix = 'walhalla-'
export function getItem(key, defaultValue = null) {
    return JSON.parse(localStorage.getItem(`${prefix}${key}`)) || defaultValue
}

export function setItem(key, value) {
    localStorage.setItem(`${prefix}${key}`, JSON.stringify(value))
}