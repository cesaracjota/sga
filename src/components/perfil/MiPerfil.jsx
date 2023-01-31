import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import DetallesPerfil from './DetallesPerfil'
import EditarPerfil from './EditarPerfil'
import { useSelector } from 'react-redux'

const MiPerfil = () => {

  const user = useSelector(state => state.auth.user);

  return (
    <>
      <Box bg="red.500" w="full" h="full" bgColor={'white'} _dark={{ bg: "primary.900" }} boxShadow="base">
        <Tabs defaultIndex={0} isFitted  variant='enclosed'>
          <TabList display={'flex'} justifyContent="stretch">
            <Tab borderRadius="none">Detalles de Mi Perfil</Tab>
            <Tab borderRadius="none">Editar Mis Datos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DetallesPerfil usuario = { user?.usuario } />
            </TabPanel>
            <TabPanel>
              <EditarPerfil usuario = { user?.usuario } />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default MiPerfil