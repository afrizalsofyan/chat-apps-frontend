import axios from 'axios'

const http = () => {
    const headers = {}
    const {token} = JSON.parse(localStorage.getItem('chat-apps'))
    if(token) {
        headers.authorization = `Bearer ${token}`
    }
    return axios.create({
        headers,
        baseURL: 'http://localhost:4000/api'
    })
}

export default http