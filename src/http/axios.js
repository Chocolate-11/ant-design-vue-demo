import http from "./interceptors";

export function getRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: data
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function postRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        // var aa=qs.stringify(data)
        http.post(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function putRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.put(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function deleteRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.delete(url, {
            data: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}