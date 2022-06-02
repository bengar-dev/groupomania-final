import {api} from './config'
import {axios} from './config'

export const getRegister = (email: string, password:string, firstname: string, lastname: string) => {

    const data = {
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

interface resSignInProps {
    data: object 
}

interface errSignInProps {
    response: object
}

export const getSignIn = (email: string, password: string) => {

    const data = {
        email,
        password
    }

    return axios.post(`${api}/users/signin`, data)
        .then((response: resSignInProps) => {
            return response.data
        })
        .catch((error: errSignInProps) => {
            return error.response
        })
}