import React from 'react'
import Dashboard from '../../components/layout/Dashboard';
import Laboratorios from '../../components/laboratorios/Laboratorios';
import AgregarLaboratorio from '../../components/laboratorios/AgregarLaboratorio';
import EditarLaboratorio from '../../components/laboratorios/EditarLaboratorio';
import DetallesLaboratorio from '../../components/laboratorios/DetallesLaboratorio';

export const LaboratoriosPage = () => {
    return ( <Dashboard componente={<Laboratorios />} /> )
}

export const LaboratoriosPageAgregar = () => {
    return ( <Dashboard componente={<AgregarLaboratorio />} /> )
}

export const LaboratoriosPageEditar = () => {
    return ( <Dashboard componente={<EditarLaboratorio />} /> )
}

export const LaboratoriosPageDetalles = () => {
    return ( <Dashboard componente={<DetallesLaboratorio />} /> )
}