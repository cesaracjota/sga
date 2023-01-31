import React from 'react';
import Dashboard from '../../components/layout/Dashboard';
import Mapas from '../../components/mapas/Mapas';
import AgregarMapa from '../../components/mapas/AgregarMapa';

export const MapasPage = () => {
    return (<Dashboard componente={<Mapas />} />)
}

export const MapasPageAgregar = () => {
    return (<Dashboard componente={<AgregarMapa />} />)
}
