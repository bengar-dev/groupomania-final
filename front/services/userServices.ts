import {api, axios} from "./config"

export const getUserInfo = (id: number, token: string) => {

    interface resProps {
        data: object 
    }
    
    interface errProps {
        response: object
    }

    return axios.get(`${api}/users/${id}`, {
        headers: {"Authorization": `Bearer ${token}`}
    })
        .then((response: resProps) => {
            return response.data
        })
        .catch((error: errProps) => {
            return error.response
        })
}