import axios from 'axios'

const baseURI = 'http://localhost:3001/persons'

const getData = response => response.data

const getAll = () => {
    return axios
        .get(baseURI)
        .then(getData)
}

const createNew = entry => {
    return axios
    .post(baseURI, entry)
    .then(getData)
}

const deletePhone = id => {
    return axios
    .delete(`${baseURI}/${id}`)
}

const update = (id, newObject) => {
    return axios
        .put(`${baseURI}/${id}`, newObject)
        .then(getData)

}

export default {getAll, createNew, deletePhone, update}