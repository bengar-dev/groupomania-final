import {api, axios} from "./config"

export const getUserInfo = (id: number, token: string) => {
    
    return axios.get(`${api}/users/${id}`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
        .then((response: {
            data: object
        }) => {
            return response.data
        })
        .catch((error: {
            response: object
        }) => {
            return error.response
        })
}