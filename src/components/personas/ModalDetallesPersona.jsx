import React, { useState, useRef } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Button,
    Stack,
    Text,
    Divider,
    Badge,
    Avatar,
    Tooltip,
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';

export const ModalDetallesPersona = ({ persona }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const btnRef = useRef();

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                <IconButton
                    aria-label="Ver"
                    icon={<CgEyeAlt />}
                    fontSize="xl"
                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                    colorScheme="blue"
                    variant={'ghost'}
                    onClick={handleOpenDrawer}
                    ml={2}
                />
            </Tooltip>
            <Drawer
                isOpen={isOpenDrawer}
                placement='bottom'
                onClose={handleCloseDrawer}
                finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent _dark={{ bg: "primary.800" }}>
                    <DrawerHeader fontWeight="bold" bg="blue.600" color="gray.200" textAlign="center">INFORMACIÓN BASICA DE LA CATEGORÍA SELECCIONADA</DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" mt={6} px={[0, 10, 40, 60]}>
                            <Stack direction="row" justifyContent="center">
                                <Avatar size="2xl" color="white" name={persona?.nombre} src={persona?.img} textAlign="center" fontWeight="bold" />
                            </Stack>
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold">ID:</Text>
                                <Text>{persona?.uid}</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold">NOMBRES:</Text>
                                <Text>{persona?.nombre}</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold">CORREO:</Text>
                                <Text>{persona?.correo}</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold">ESTADO:</Text>
                                <Badge
                                    colorScheme={persona?.estado === true ? 'green' : 'red'}
                                    variant="solid"
                                    px={6}
                                    py={1.5}
                                    rounded="full"
                                >
                                    {persona?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                </Badge>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold">ROL:</Text>
                                <Badge
                                    colorScheme={persona?.rol === 'ADMIN_ROLE' ? 'messenger' : 'red'}
                                    variant="solid"
                                    px={6}
                                    py={2}
                                    rounded="full"
                                >
                                    { persona?.rol === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO' }
                                </Badge>
                            </Stack>
                            <Divider />
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button 
                            colorScheme="blue" 
                            _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.700" } }} 
                            size="lg" 
                            onClick={handleCloseDrawer}
                            borderRadius="none"
                        >
                            OK
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
