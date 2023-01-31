import React from 'react'
import Personas from '../../components/personas/Personas'
import Dashboard from '../../components/layout/Dashboard';

const PersonasPage = () => {
    return ( <Dashboard componente={<Personas />} /> )
}

export default PersonasPage