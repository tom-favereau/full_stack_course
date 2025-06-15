import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://phonebook-v333.onrender.com/api/persons'
//const baseUrl = 'api/persons'
const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)
}

export default {
    getAll,
    create,
    remove,
    update
}