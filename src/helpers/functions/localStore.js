export const get = (name) => {
    return localStorage.getItem(name);
}

export const remove = (name) => {
    return localStorage.removeItem(name);
}

export const add = (name, value) => {
    return localStorage.setItem(name, value);
}