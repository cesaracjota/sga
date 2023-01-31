import React from 'react';
import Estudiantes from '../../../components/estudiantes/RESIDENCIA/Estudiantes';
import Dashboard from '../../../components/layout/Dashboard';
import AgregarEstudiante from '../../../components/estudiantes/RESIDENCIA/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/RESIDENCIA/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/RESIDENCIA/EditarEstudiante';
import HistorialPagoEstudiantes from '../../../components/estudiantes/RESIDENCIA/HistorialPagosEstudiante';

export const EstudiantesRESIDENCIAPage = () => {
    return ( <Dashboard componente={<Estudiantes />} /> )
}

export const EstudiantesRESIDENCIAPageAgregar = () => {
    return ( <Dashboard componente={<AgregarEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageDetalles = () => {
    return ( <Dashboard componente={<DetallesEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageEditar = () => {
    return ( <Dashboard componente={<EditarEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageHistorialPagos = () => {
    return ( <Dashboard componente={<HistorialPagoEstudiantes />} /> )
}
