import axios from 'axios';

export const baseUrl = 'http://localhost:5000/api'

export const axiosPrivate = axios.create({
    baseURL:baseUrl
})