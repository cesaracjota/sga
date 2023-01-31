import React, { useEffect } from 'react'
import {
    IconButton,
    Stack,
    Text,
    Divider,
    Badge,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    HStack,
    Card,
    Image,
    CardBody,
    Heading,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../../helpers/toast';
import { SpinnerComponent } from '../../../helpers/spinner';
import { getVentaUniforme, reset } from '../../../features/venta_uniformeSlice';

const DetallesVentaUniforme = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { venta_uniforme, isLoading, isError, message } = useSelector((state) => state.ventas_uniforme);

    const params = useParams(location);

    useEffect(() => {

        if (isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getVentaUniforme(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch, params.id]);

    if (isLoading) {
        return <SpinnerComponent />
    }

    const totalPagar = venta_uniforme?.uniforme?.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);

    return (
        <>
            <Box
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
            >
                <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
                    <HStack spacing={4} direction="row">
                        <Link to={'/ebr/uniformes/ventas'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize={{ base: "xs", lg: "md" }} fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={'black'}>Detalles del Equipo Seleccionado</Text>
                    </HStack>
                </Stack>
            </Box>

            <Stack
                direction="column"
                mt={3}
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'center'}>DETALLES DE LA VENTA</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" bg="white" _dark={{ bg: "primary.800" }} justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CODIGO </Text>
                            <Text>{venta_uniforme?.codigo}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">METODO DE PAGO </Text>
                            <Text>{venta_uniforme?.metodo_pago}</Text>
                        </Stack>
                        <Stack spacing={1} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">MONTO PAGADO</Text>
                            <Badge
                                colorScheme={'purple'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                S/{venta_uniforme?.monto_pagado}
                            </Badge>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" bg="white" _dark={{ bg: "primary.800" }} justifyContent="space-around" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">FECHA VENTA </Text>
                            <Text>{Moment(venta_uniforme?.fecha_venta).format('DD-MM-YYYY - HH:mm:ss A')}</Text>
                        </Stack>
                        <Stack spacing={1} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={venta_uniforme?.estado === "CANCELADO" ? 'green' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {venta_uniforme?.estado}
                            </Badge>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'center'}>DETALLES DEL ESTUDIANTE QUIEN COMPRÓ</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" bg="white" _dark={{ bg: "primary.800" }} justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">APELLIDOS</Text>
                            <Text>{venta_uniforme?.estudiante?.apellidos}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">NOMBRES</Text>
                            <Text>{venta_uniforme?.estudiante?.nombres}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">DNI</Text>
                            <Text>{venta_uniforme?.estudiante?.dni}</Text>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" bg="white" _dark={{ bg: "primary.800" }} justifyContent="space-around" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CORREO </Text>
                            <Text>{venta_uniforme?.estudiante?.correo}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CELULAR:</Text>
                            <Text>{venta_uniforme?.estudiante?.celular}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'center'}>ARTICULOS QUE COMPRÓ</Text>
                    <Divider />
                    <Stack direction="column" spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }} justifyContent="space-between">
                        {venta_uniforme?.uniforme?.map((uniforme, index) => (
                            <Card
                                direction="row"
                                overflow='hidden'
                                variant='outline'
                                w={'full'}
                                key={index}
                            >
                                <Image
                                    objectFit='cover'
                                    maxW="105px"
                                    maxH="105px"
                                    minW="105px"
                                    src={uniforme?.img}
                                    alt={uniforme?.articulo}
                                    borderColor="gray.200"
                                />

                                <Stack borderLeft={'1px'} borderLeftColor={'gray.200'}>
                                    <CardBody alignSelf={'center'}>
                                        <Heading size='xs'>{uniforme?.articulo}</Heading>
                                        <Text fontSize='sm' color='gray.500'>{uniforme?.codigo}</Text>
                                        <Badge colorScheme="yellow" variant="solid" px={3} py={0.5} rounded="full">
                                            S/{uniforme?.precio}
                                        </Badge>
                                    </CardBody>
                                </Stack>
                            </Card>
                        ))}
                        <Divider />
                        <Stack spacing={1} w="full" _dark={{ bg: "primary.800" }}>
                            <Stack direction="row" justifyContent="flex-end">
                                <Text fontWeight="extrabold" textAlign={'right'}>Total: <span style={{ fontWeight: 'lighter', fontSize: '26px', marginLeft: '4px' }}>S/{totalPagar}.00</span></Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>



            <Stack
                direction="column"
                mt={3}
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
                p={4}
            >
                <Accordion allowMultiple defaultIndex={[0]}>
                    <AccordionItem>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <Text fontWeight="bold" alignSelf={'center'}>DESCRIPCIÓN</Text>
                                        </Box>
                                        {isExpanded ? (
                                            <MinusIcon fontSize='14px' />
                                        ) : (
                                            <AddIcon fontSize='14px' />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {venta_uniforme?.descripcion}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
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
                                    {venta_uniforme?.observaciones}
                                </AccordionPanel>

                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Stack>
        </>
    )
}

export default DetallesVentaUniforme;