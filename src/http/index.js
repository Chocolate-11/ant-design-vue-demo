import { getRequest, postRequest, putRequest, deleteRequest } from "./axios";
const taskSql = '/taskSql'

export const html = {
    get: data => {
        return getRequest(`${taskSql}/html/show`, data)
    },
    post: data => {
        return postRequest(`${taskSql}/html/add`, data)
    },
    put: data => {
        return putRequest(`${taskSql}/html/update`, data)
    },
    delete: data => {
        return deleteRequest(`${taskSql}/html/del`, data)
    }
}