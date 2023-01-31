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
    Image,
    Tooltip,
    HStack,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot,
} from '@chakra-ui/react';
import Moment from 'moment';
import { FaFileInvoice } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';

const ModalGenerarBoleta = ({ venta_uniforme }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const btnRef = useRef();
    const componentRef = useRef();

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Boleta de venta de uniforme - ${venta_uniforme.codigo}`,
        documentContent: () => componentRef.current,
        documentContentURL: () => componentRef.current,
        documentHead: () => componentRef.current,
        documentBodyClassName: 'pdf-body',
        onBeforeGetContent: () => {
            const style = document.createElement('style');
            style.innerHTML = `
                .pdf-body {
                    font-family: 'Roboto', sans-serif;
                    font-size: 12px;
                    color: #000;
                }
            `;
            document.head.appendChild(style);
        },
        onAfterPrint: () => {
            const style = document.querySelector('style');
            style.remove();
        },

        onBeforePrint: () => {
            const style = document.createElement('style');
            style.innerHTML = `
                .pdf-body {
                    font-family: 'Roboto', sans-serif;
                    font-size: 12px;
                    color: #000;
                }
            `;
            document.head.appendChild(style);
        },
    });

    // const totalPagar = venta_uniforme?.uniforme?.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

    return (
        <>
            <Tooltip hasArrow label='Generar boleta' placement='auto'>
                <IconButton
                    aria-label="Ver"
                    icon={<FaFileInvoice />}
                    fontSize="xl"
                    _dark={{ color: "white", _hover: { bg: "purple.800" } }}
                    colorScheme="purple"
                    variant={'ghost'}
                    onClick={handleOpenDrawer}
                    mr={2}
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
                    <DrawerHeader fontWeight="bold" bg="purple.600" color="gray.200" textAlign="center">BOLETA DE VENTA</DrawerHeader>
                    <DrawerBody ref={componentRef} fontFamily={'heading'}>
                        <Stack direction="column" mt={4} w={'full'}>
                            <Stack direction="row" w="full" mb={4} justifyContent="space-evenly" alignItems={'center'} spacing={6} display={'flex'}>
                                <Image objectFit='cover' src={'https://upload.wikimedia.org/wikipedia/commons/0/00/Colegio_mayor_coar_logo.png'} maxW={'100px'} fallbackSrc='https://via.placeholder.com/100x100?text=LOGO' alt={venta_uniforme.nombre} alignSelf={'center'} />
                                <HStack spacing={4} w="full" justifyContent="space-around" textAlign={'end'}>
                                    <Stack direction="column" spacing={2} w="full" fontSize={'12px'}>
                                        <Text>SGA - Colegio de Alto Rendimiento</Text>
                                        <Text>RUC: 1020304050</Text>
                                        <Text>Av. Los Pinos 123</Text>
                                        <Text>Arequipa - Perú</Text>
                                    </Stack>
                                    <Stack direction="column" spacing={2} w="full" fontSize={'12px'}>
                                        <Text>www.coar.gob.pe</Text>
                                        <Text>E-mail: info@obedalvarado.pw</Text>
                                        <Text>Tel: +456-345-908-559</Text>
                                        <Text>Facebook: @colegio_imaculada</Text>
                                    </Stack>
                                </HStack>
                            </Stack>
                            <Divider
                                borderColor="purple.600"
                                borderWidth={'3px'}
                            />
                            <Stack direction={{ base: "column", lg: "row" }} w="full" justifyContent="stretch" spacing={6}>
                                <Stack direction="column" mt={4} spacing={2} w="full">
                                    <Stack direction="row" justifyContent="space-between" mb={6}>
                                        <Text fontWeight="bold" fontSize={'3xl'} alignSelf={'center'}>BOLETA</Text>
                                        <Stack direction="column" fontSize={'sm'}>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >CODIGO:</Text>
                                                <Text>{venta_uniforme?.codigo}</Text>
                                            </HStack>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >DNI:</Text>
                                                <Text>{venta_uniforme?.estudiante?.dni}</Text>
                                            </HStack>
                                            <HStack spacing={4} justifyContent="space-between">
                                                <Text fontWeight="bold" >APELLIDOS Y NOMBRES:</Text>
                                                <Text>{venta_uniforme?.estudiante?.apellidos + ', ' + venta_uniforme?.estudiante?.nombres}</Text>
                                            </HStack>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >FECHA VENTA:</Text>
                                                <Text>{Moment(venta_uniforme?.fecha_venta).format('DD-MM-YYYY - HH:mm:ss A')}</Text>
                                            </HStack>
                                        </Stack>
                                    </Stack>
                                    <Divider borderColor="purple.600"/>
                                    <Stack>
                                        <Text fontWeight="bold" fontSize={'2xl'} alignSelf={'center'}>DETALLE DE LA VENTA</Text>
                                        <Table border={'1px'} mt={6}>
                                            <TableCaption>El monto de la boleta no incluye el impuesto sobre las ventas.</TableCaption>
                                            <Thead border={'1px'}>
                                                <Tr>
                                                    <Th color={'black'} fontSize={'md'} fontWeight={'bold'}>Codigo</Th>
                                                    <Th color={'black'} fontSize={'md'} fontWeight={'bold'}>Descripción</Th>
                                                    <Th color={'black'} fontSize={'md'} fontWeight={'bold'} isNumeric>Precio</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody border={'1px'}>
                                            {venta_uniforme?.uniforme?.map((uniforme, index) => (
                                                <Tr key={index} textAlign={'right'} border={'1px'}>
                                                    <Td fontSize={'sm'}>{ uniforme?.codigo }</Td>
                                                    <Td fontSize={'sm'}>{ uniforme?.descripcion }</Td>
                                                    <Td fontSize={'sm'} isNumeric>S/{ uniforme?.precio }</Td>
                                                </Tr>
                                            ))}
                                            </Tbody>
                                            <Tfoot mt={4}>
                                                <Tr mt={4}>
                                                    <Th></Th>
                                                    <Th color={'black'} fontSize={'lg'}>TOTAL PAGADO</Th>
                                                    <Th color={'black'} isNumeric  fontSize={'xl'}>S/ { venta_uniforme?.monto_pagado } </Th>
                                                </Tr>
                                            </Tfoot>
                                        </Table>
                                    </Stack>
                                    <Divider borderColor="purple.600"/>
                                    {
                                        venta_uniforme?.observaciones ? (
                                            <Stack direction="column" mt={4} spacing={2} w="full">
                                                <Stack direction="row" justifyContent="space-between" mb={6}>
                                                    <Text fontWeight="bold" fontSize={'xl'} alignSelf={'center'}>OBSERVACIONES</Text>
                                                    <Text fontSize={'sm'}>{venta_uniforme?.observaciones}</Text>
                                                </Stack>
                                            </Stack>
                                        ) : null
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button colorScheme="purple" ml={4} _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.700" } }} size="lg" onClick={handlePrint} borderRadius="none">
                            IMPRIMIR/DESCARGAR
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ModalGenerarBoleta;