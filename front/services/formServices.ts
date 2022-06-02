import {api} from './config'
import {axios} from './config'

export const getRegister = (email: string, password:string, firstname: string, lastname: string) => {

    const data :{
        email: string,
        password: string,
        firstname: string,
        lastname: string
    } = {
        email,
        password,
        firstname,
        lastname
    }

    return axios.post(`${api}/users/signup`, data)
        .then((response: object) => {
            return true
        })
        .catch((error: object) => {
            return false
        })

}

export const getSignIn = (email: string, password: string) => {

    const data: {
        email: string,
        password: string
    } = {
        email,
        password
    }

    return axios.post(`${api}/users/signin`, data)
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