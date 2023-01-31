import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getAllModalidades = async () => {
    const response = await axios.get(`${API_URL}/modalidades`);
    return response.data;
}

const modalidadService = {
    getAllModalidades,
}

export default modalidadService;