import React from 'react'
import Libros from '../../components/libros/Libros'
import Dashboard from '../../components/layout/Dashboard';

const LibrosPage = () => {
  return ( <Dashboard componente={<Libros />} /> )
}

export default LibrosPage