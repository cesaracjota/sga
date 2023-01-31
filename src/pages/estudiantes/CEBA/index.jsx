import React from 'react';
import Estudiantes from '../../../components/estudiantes/CEBA/Estudiantes';
import Dashboard from '../../../components/layout/Dashboard';
import AgregarEstudiante from '../../../components/estudiantes/CEBA/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/CEBA/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/CEBA/EditarEstudiante';
import HistorialPagoEstudiantes from '../../../components/estudiantes/CEBA/HistorialPagosEstudiante';

export const EstudiantesCEBAPage = () => {
    return ( <Dashboard componente={<Estudiantes />} /> )
}

export const EstudiantesCEBAPageAgregar = () => {
    return ( <Dashboard componente={<AgregarEstudiante />} /> )
}

export const EstudiantesCEBAPageDetalles = () => {
    return ( <Dashboard componente={<DetallesEstudiante />} /> )
}

export const EstudiantesCEBAPageEditar = () => {
    return ( <Dashboard componente={<EditarEstudiante />} /> )
}

export const EstudiantesCEBAPageHistorialPagos = () => {
    return ( <Dashboard componente={<HistorialPagoEstudiantes />} /> )
}