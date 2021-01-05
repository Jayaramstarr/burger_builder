import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-46908.firebaseio.com/'
})

export default instance