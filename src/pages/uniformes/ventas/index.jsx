import React from 'react'
import Dashboard from '../../../components/layout/Dashboard';
import VentasUniforme from '../../../components/uniformes/ventas/VentasUniforme';
import DetallesVentaUniforme from '../../../components/uniformes/ventas/DetallesVentaUniforme';

export const VentasUniformePage = () => {

    return ( <Dashboard componente={<VentasUniforme />} /> )

}

export const VentasUniformePageDetalles = () => {

    return ( <Dashboard componente={<DetallesVentaUniforme />} /> )

}
