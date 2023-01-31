import axios from "axios";
// import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get reportes modalidad EBR
const getReportesEBR = async (token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }

    const response = await axios.get(`${baseURL}/reportes/ebr`, config);
    return response.data;

}

const getReportesCEBA = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/reportes/ceba`, config);
    return response.data;
}

const getReportesRESIDENCIA = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/reportes/residencia`, config);
    return response.data;
}


const reporteService = {
    getReportesEBR,
    getReportesCEBA,
    getReportesRESIDENCIA
}

export default reporteService;