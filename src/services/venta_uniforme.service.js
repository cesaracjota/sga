import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const GETALL = async () => {
    const response = await axios.get(`${API_URL}/ventas_uniforme`);
    return response.data;
}

const GET = async (id) => {
    const response = await axios.get(`${API_URL}/ventas_uniforme/${id}`);
    return response.data;
}

const CREATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/ventas_uniforme`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('VENTA DE UNIFORME REGISTRADO', 'La venta de uniforme se ha registrado correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

// const UPDATE = async (data, token) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             'x-token': token
//         }
//     }
//     const response = await axios.put(`${API_URL}/ventas_uniforme/${data._id}`, data, config);
//     if (response.status === 200 || response.status === 201) {
//         ToastChakra('EQUIPO DE LABORATORIO MODIFICADO', 'El equipo de laboratorio ha sido modificada correctamente', 'success', 1500, 'bottom');
//     }
//     return response.data;
// }

const DELETE = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/ventas_uniforme/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('VENTA DE UNIFORME ELIMINADO', 'La venta de uniforme, se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const venta_uniformeService = {
    GETALL,
    GET,
    CREATE,
    DELETE,
}

export default venta_uniformeService;