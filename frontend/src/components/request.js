import { stringify } from 'querystring';
import swal from 'sweetalert2';

export const get = (url, params = null) => {
    let encoded = stringify(params)
    return fetch(`${url}${params === null ? '' : `?${encoded}`}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    .then(res => res.json())
    .catch(() => {
        swal("Ooops...", "Something went wrong with fetch data from server.", "error")
    })
}

export const post = (url, params = null, data = {}) => {
    let encoded = stringify(params)
    return fetch(`${url}${params === null ? '' : `?${encoded}`}`, {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(() => {
        swal("Ooops...", "Something went wrong with fetch data from server.", "error")
    })
}