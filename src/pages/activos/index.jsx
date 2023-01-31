import React from 'react'
import Dashboard from '../../components/layout/Dashboard';
import Activos from '../../components/activos/Activos';
import DetallesActivo from '../../components/activos/DetallesActivo';
import AgregarActivo from '../../components/activos/AgregarActivo';
import EditarActivo from '../../components/activos/EditarActivo';

export const ActivosPage = () => {
    return ( <Dashboard componente={<Activos />} /> )
}

export const DetallesActivosPage = () => {
    return ( <Dashboard componente={< DetallesActivo /> } />)
}

export const AgregarActivoPage = () => {
    return ( <Dashboard componente={< AgregarActivo /> } />)
}

export const EditarActivoPage = () => {
    return ( <Dashboard componente={< EditarActivo /> } />)
}
