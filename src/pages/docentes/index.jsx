import React from 'react';
import Docentes from '../../components/docentes/Docentes';
import Dashboard from '../../components/layout/Dashboard';
import AgregarDocente from '../../components/docentes/AgregarDocente';
import DetallesDocente from '../../components/docentes/DetallesDocente';

export const DocentesPage = () => {
    return ( <Dashboard componente={<Docentes />} /> )
}

export const DocentesPageDetalles = () => {
    return ( <Dashboard componente={<DetallesDocente />} /> )
}

export const DocentesPageAgregar = () => {
    return ( <Dashboard componente={<AgregarDocente />} /> )
}