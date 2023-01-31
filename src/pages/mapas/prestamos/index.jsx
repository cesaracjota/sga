import React from 'react';
import Dashboard from '../../../components/layout/Dashboard';
// import RegistrarPrestamoLibro from '../../../components/libros/prestamos/RegistrarPrestamoLibro';
import PrestamoMapas from '../../../components/mapas/prestamos/Prestamos';

export const PrestamoMapasPage = () => {
    return ( <Dashboard componente={<PrestamoMapas />} /> )
}

// export const PrestamoMapasPageRegistro = () => {
//     return ( <Dashboard componente={<RegistrarPrestamoLibro />} /> )
// }