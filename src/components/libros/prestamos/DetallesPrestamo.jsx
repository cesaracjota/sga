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
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    Tooltip,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { CgEyeAlt } from 'react-icons/cg';

const DetallesPrestamo = ({ libro_prestamo }) => {

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
                />
            </Tooltip>
            <Drawer
                isOpen={isOpenDrawer}
                placement='left'
                onClose={handleCloseDrawer}
                finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent _dark={{ bg: "primary.800" }}>
                    <DrawerHeader fontWeight="bold" bg="blue.600" color="gray.200" textAlign="center">INFORMACIÓN BÁSICA DEL LIBRO SELECCIONADO</DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" mt={6}>
                            <Stack direction={{ base: "column", lg: "row" }} w="full" justifyContent="stretch" spacing={6}>
                                <Image objectFit='cover' src={libro_prestamo?.libro?.img} fallbackSrc='https://via.placeholder.com/300x450?text=Libro+sin+imagen' alt={libro_prestamo?.libro?.nombre} maxH={'360px'} maxW={'300px'} minW="250px" alignSelf={'center'} />
                                <Stack direction="column" mt={6} spacing={2} w="full">
                                    <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>CODIGO PRÉSTAMO:</Text>
                                        <Text>{libro_prestamo?.codigo}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>CODIGO LIBRO:</Text>
                                        <Text>{libro_prestamo?.libro?.codigo}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>TÍTULO TITULO:</Text>
                                        <Text>{libro_prestamo?.libro?.titulo}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>NOMBRE LIBRO:</Text>
                                        <Text>{libro_prestamo?.libro?.nombre}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>A QUIEN SE LE PRESTÓ:</Text>
                                        <Text>{libro_prestamo.estudiante ? libro_prestamo.estudiante?.nombres + ' ' + libro_prestamo.estudiante?.apellidos : libro_prestamo.docente?.nombres + ' ' + libro_prestamo.docente?.apellidos}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>DNI DE LA PERSONA:</Text>
                                        <Text>{libro_prestamo.estudiante ? libro_prestamo.estudiante?.dni : libro_prestamo.docente?.dni}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">FECHA PRESTAMO:</Text>
                                        <Text>{Moment(libro_prestamo?.fecha_prestamo).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">ESTADO:</Text>
                                        <Badge
                                            colorScheme={libro_prestamo?.estado === 'PRESTADO' ? 'red' : 'blue'}
                                            variant="solid"
                                            px={6}
                                            py={1.5}
                                            rounded="full"
                                        >
                                            {libro_prestamo?.estado}
                                        </Badge>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Divider />

                            <Accordion allowMultiple defaultIndex={[0,1]}>
                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <Text fontWeight="bold" alignSelf={'center'}>DETALLES DE LA ENTREGA DEL LIBRO</Text>
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='14px' />
                                                    ) : (
                                                        <AddIcon fontSize='14px' />
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {libro_prestamo?.descripcion_entrega}
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>

                                { libro_prestamo?.estado === 'DEVUELTO' ? (
                                    <AccordionItem>
                                        {({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton>
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            <Text fontWeight="bold" alignSelf={'center'}>DETALLES DE LA DEVOLUCIÓN DEL LIBRO</Text>
                                                        </Box>
                                                        {isExpanded ? (
                                                            <MinusIcon fontSize='14px' />
                                                        ) : (
                                                            <AddIcon fontSize='14px' />
                                                        )}
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    <Stack direction="column" spacing={2} w="full" p={6}>
                                                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                                            <Text fontWeight="bold">FECHA DEVOLUCIÓN:</Text>
                                                            <Text>{Moment(libro_prestamo?.fecha_devolucion).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                                                        </Stack>
                                                        <Divider />
                                                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                                            <Text fontWeight="bold">DESCRIPCION DE LA DEVOLUCIÓN:</Text>
                                                            <Text>{libro_prestamo?.descripcion_devolucion}</Text>
                                                        </Stack>
                                                        <Divider />
                                                    </Stack>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                ) : null }

                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <Text fontWeight="bold" alignSelf={'center'}>OBSERVACIONES</Text>
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='14px' />
                                                    ) : (
                                                        <AddIcon fontSize='14px' />
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {libro_prestamo?.observaciones}
                                            </AccordionPanel>

                                        </>
                                    )}
                                </AccordionItem>
                            </Accordion>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button colorScheme="blue" _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.700" } }} size="lg" onClick={handleCloseDrawer} borderRadius="none">
                            OK
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DetallesPrestamo;