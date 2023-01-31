import React from 'react';
import Dashboard from '../../../components/layout/Dashboard';
import Pagos from '../../../components/pagos/EBR/Pagos';
import DetallesPago from '../../../components/pagos/EBR/DetallesPago';

export const PagosPage = () => {
    return ( <Dashboard componente={<Pagos />} /> )
}

export const PagosPageDetalles = () => {
    return ( <Dashboard componente={<DetallesPago />} /> )
}
