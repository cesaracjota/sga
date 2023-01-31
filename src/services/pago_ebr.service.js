import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllPagos = async () => {
    const response = await axios.get(`${API_URL}/pagos_ebr`);
    return response.data;
}

const getPago = async (id) => {
    const response = await axios.get(`${API_URL}/pagos_ebr/${id}`);
    return response.data;
}

const getPagoByStudent = async (id) => {
    const response = await axios.get(`${API_URL}/pagos_ebr/estudiante/${id}`);
    return response.data;
}

const createPago = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/pagos_ebr`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('PAGO REGISTRADO', 'El pago se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updatePago = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/pagos_ebr/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('PAGO MODIFICADO', 'El PAGO ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deletePago = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/pagos_ebr/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('PAGO ELIMINADO', 'El pago se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const pagoService = {
    getAllPagos,
    getPago,
    getPagoByStudent,
    createPago,
    updatePago,
    deletePago,
}

export default pagoService;