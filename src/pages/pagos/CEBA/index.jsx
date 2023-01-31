import React from 'react';
import Dashboard from '../../../components/layout/Dashboard';
import Pagos from '../../../components/pagos/CEBA/Pagos';
import DetallesPago from '../../../components/pagos/CEBA/DetallesPago';

export const PagosCEBAPage = () => {
    return ( <Dashboard componente={<Pagos />} /> )
}

export const PagosCEBAPageDetalles = () => {
    return ( <Dashboard componente={<DetallesPago />} /> )
}
