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
    Image as ImageChakra,
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
    useColorModeValue,
    DrawerCloseButton,
} from '@chakra-ui/react';
import Moment from 'moment';
import { FaFileInvoice } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

const ModalGenerarBoleta = ({ pago }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const btnRef = useRef();
    const componentRef = useRef();

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    // dowload img with html2canvas

    const handleDownloadImageBase = () => {
        const input = document.getElementById('boleta');
        html2canvas(input, {
            allowTaint: true,
            useCORS: true,
            logging: false,
            height: window.outerHeight + window.innerHeight,
            windowHeight: window.outerHeight + window.innerHeight,
            width: window.outerWidth + window.innerWidth,
            windowWidth: window.outerWidth + window.innerWidth,
            backgroundColor: '#fff', scale: 1.0
        })
            .then((canvas) => {

                const imgData = canvas.toDataURL('image/png');

                downloadjs(imgData, `Boleta de pago del estudiante - ${pago.codigo}`);

            });

    }

    const handleDownloadImageLg = () => {
        const input = document.getElementById('boleta');
        html2canvas(input, {
            allowTaint: true,
            useCORS: true,
        })
            .then((canvas) => {

                const imgData = canvas.toDataURL('image/png');

                downloadjs(imgData, `Boleta de pago del estudiante - ${pago.codigo}`);

            });

    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        copyStyles: true,
        documentTitle: `Boleta de pago del estudiante - ${pago.codigo}`,
        documentContent: () => componentRef.current,
        documentContentURL: () => componentRef.current,
        documentHead: () => componentRef.current,
        documentBodyClassName: 'pdf-body',
        onBeforePrint: () => {
            console.log('before print');
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
                    <DrawerCloseButton color="white" size={'lg'} />
                    <DrawerHeader fontWeight="bold" bg="purple.600" color="gray.200" textAlign="center">BOLETA DE PAGO</DrawerHeader>
                    <DrawerBody ref={componentRef} id="boleta" w="full" h="100%" bg={'white'} _dark={{ bg: "primary.800" }}>
                        <Stack direction="column" mt={4} w={'full'}>
                            <Stack direction={{ base: "column", lg: "row" }} w="full" mb={4} justifyContent="space-evenly" alignItems={'center'} spacing={4} display={'flex'}>
                                <ImageChakra objectFit='cover' src={'https://upload.wikimedia.org/wikipedia/commons/0/00/Colegio_mayor_coar_logo.png'} maxW={'100px'} fallbackSrc='https://via.placeholder.com/100x100?text=LOGO' alt={pago?.nombre} alignSelf={'center'} />
                                <HStack spacing={2} w="full" justifyContent="space-between" display={'flex'}>
                                    <Stack direction="column" spacing={2} w="full" fontSize={{ base: '9px', lg: '12px' }} textAlign={'start'}>
                                        <Text>SGA - Colegio de Alto Rendimiento</Text>
                                        <Text>RUC: 1020304050</Text>
                                        <Text>Av. Los Pinos 123</Text>
                                        <Text>Arequipa - Perú</Text>
                                    </Stack>
                                    <Stack direction="column" spacing={2} w="full" fontSize={{ base: '9px', lg: '12px' }} textAlign={'end'}>
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
                                    <Stack direction={{ base: "column", lg: "row" }} spacing={2} justifyContent="space-between" mb={6}>
                                        <Text fontWeight="bold" fontSize={'3xl'} alignSelf={'center'}>BOLETA</Text>
                                        <Stack direction="column" fontSize={'sm'}>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >N°:</Text>
                                                <Text>{pago?.codigo}</Text>
                                            </HStack>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >DNI:</Text>
                                                <Text>{pago?.estudiante?.dni}</Text>
                                            </HStack>
                                            <HStack spacing={4} justifyContent="space-between">
                                                <Text fontWeight="bold" >APELLIDOS Y NOMBRES:</Text>
                                                <Text>{pago?.estudiante?.apellidos + ', ' + pago?.estudiante?.nombres}</Text>
                                            </HStack>
                                            <HStack spacing={2} justifyContent="space-between">
                                                <Text fontWeight="bold" >FECHA PAGO:</Text>
                                                <Text>{Moment(pago?.createdAt).format('DD-MM-YYYY - HH:mm:ss A')}</Text>
                                            </HStack>
                                        </Stack>
                                    </Stack>
                                    <Divider borderColor="purple.600" />
                                    <Stack>
                                        <Text fontWeight="bold" fontSize={'2xl'} alignSelf={'center'}>DETALLES DEL PAGO</Text>
                                        <Table border={'1px'} mt={6}>
                                            <TableCaption>El monto de la boleta no incluye el impuesto sobre las ventas.</TableCaption>
                                            <Thead border={'1px'}>
                                                <Tr>
                                                    <Th color={useColorModeValue('black', 'white')} fontSize={{ base: 'xs', lg: 'md' }} fontWeight={'bold'}>AÑO</Th>
                                                    <Th color={useColorModeValue('black', 'white')} fontSize={{ base: 'xs', lg: 'md' }} fontWeight={'bold'}>MES</Th>
                                                    <Th color={useColorModeValue('black', 'white')} fontSize={{ base: 'xs', lg: 'md' }} fontWeight={'bold'} isNumeric>MONTO PAGADO</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody border={'1px'}>
                                                <Tr textAlign={'right'} border={'1px'}>
                                                    <Td fontSize={{ base: 'xs', lg: 'sm' }}>{pago?.anio}</Td>
                                                    <Td fontSize={{ base: 'xs', lg: 'sm' }}>{pago?.meses?.map(mes => mes).join(', ')}</Td>
                                                    <Td fontSize={{ base: 'xs', lg: 'sm' }} isNumeric>S/{pago?.monto}</Td>
                                                </Tr>
                                            </Tbody>
                                            <Tfoot mt={4}>
                                                <Tr mt={4}>
                                                    <Th></Th>
                                                    <Th color={useColorModeValue('black', 'white')} fontSize={{ base: 'xs', lg: 'lg' }}>TOTAL PAGADO</Th>
                                                    <Th color={useColorModeValue('black', 'white')} isNumeric fontSize={{ base: 'md', lg: 'xl' }}>S/ {pago?.monto} </Th>
                                                </Tr>
                                            </Tfoot>
                                        </Table>
                                    </Stack>
                                    <Divider borderColor="purple.600" />
                                    {
                                        pago?.observaciones ? (
                                            <Stack direction="column" mt={4} spacing={2} w="full">
                                                <Stack direction="row" justifyContent="space-between" mb={6}>
                                                    <Text fontWeight="bold" fontSize={'xl'} alignSelf={'center'}>OBSERVACIONES</Text>
                                                    <Text fontSize={'sm'}>{pago?.observaciones}</Text>
                                                </Stack>
                                            </Stack>
                                        ) : null
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button colorScheme="teal" ml={4} _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.700" } }} size="lg" onClick={handlePrint} borderRadius="none">
                            IMPRIMIR
                        </Button>

                        <Button colorScheme="green" ml={4} display={{ base: 'flex', lg: 'none' }} _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.700" } }} size="lg" onClick={handleDownloadImageBase} borderRadius="none">
                            DESCARGAR IMG
                        </Button>

                        <Button colorScheme="green" ml={4} display={{ base: 'none', lg: 'flex' }} _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.700" } }} size="lg" onClick={handleDownloadImageLg} borderRadius="none">
                            DESCARGAR IMG
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ModalGenerarBoleta;