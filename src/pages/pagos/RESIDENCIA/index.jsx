import React from 'react';
import Dashboard from '../../../components/layout/Dashboard';
import Pagos from '../../../components/pagos/RESIDENCIA/Pagos';
import DetallesPago from '../../../components/pagos/RESIDENCIA/DetallesPago';

export const PagosRESIDENCIAPage = () => {
    return ( <Dashboard componente={<Pagos />} /> )
}

export const PagosRESIDENCIAPageDetalles = () => {
    return ( <Dashboard componente={<DetallesPago />} /> )
}
