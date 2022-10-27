import axios from 'axios'

const http = () => {
    const headers = {}
    const token = localStorage.getItem('chat-apps-auth-token')
    if(token) {
        headers.authorization = `Bearer ${token}`
    }
    return axios.create({
        headers,
        baseURL: 'http://localhost:4000/api'
    })
}

export default http
