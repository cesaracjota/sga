import React from 'react';
import Dashboard from '../../../components/layout/Dashboard';
import PrestamoLibros from '../../../components/libros/prestamos/Prestamos';
import RegistrarPrestamoLibro from '../../../components/libros/prestamos/RegistrarPrestamoLibro';

export const PrestamoLibrosPage = () => {
    return ( <Dashboard componente={<PrestamoLibros />} /> )
}

export const PrestamoLibrosPageRegistro = () => {
    return ( <Dashboard componente={<RegistrarPrestamoLibro />} /> )
}