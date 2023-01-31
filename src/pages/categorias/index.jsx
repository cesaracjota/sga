import React from 'react'
import Categorias from '../../components/categorias/Categorias'
import Dashboard from '../../components/layout/Dashboard';

const CategoriasPage = () => {
  return ( <Dashboard componente={<Categorias />} /> )
}

export default CategoriasPage