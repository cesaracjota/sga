import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get all phrases
const getAllPhrases = async () => {
    const response = await axios.get(`${baseURL}/frases`);
    return response.data.frases;
}

// Get random phrase

const getRandomPhrase = async () => {
    const response = await axios.get(`${baseURL}/frases/frase/random`);
    return response.data.frase;
}

// Create a new phrase

const createPhrase = async (phrase, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${baseURL}/frases`, phrase, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('FRASE CREADA', 'La frase se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data.frase;
    }
}

// Update phrase

const updatePhrase = async (phraseData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${baseURL}/frases/${phraseData._id}`, phraseData, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('FRASE MODIFICADA', 'La frase se ha modificado correctamente','success', 1500, 'bottom');
        return response.data.frase;
    }
}

// Delete phrase

const deletePhrase = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${baseURL}/frases/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('FRASE DELETA', 'La frase se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data.frase;
    }
}

const fraseService = {
    getRandomPhrase,
    getAllPhrases,
    createPhrase,
    updatePhrase,
    deletePhrase
}

export default fraseService;