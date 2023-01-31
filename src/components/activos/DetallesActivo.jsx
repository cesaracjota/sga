import React, { useEffect } from 'react'
import {
    IconButton,
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
    HStack,
    Icon,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getActivo, reset } from '../../features/activoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { SpinnerComponent } from '../../helpers/spinner';
import { RiFileList2Fill } from 'react-icons/ri';

const DetallesActivo = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { activo, isLoading, isError, message } = useSelector((state) => state.activos);

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

        dispatch(getActivo(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch, params.id]);

    if (isLoading) {
        return <SpinnerComponent />
    }

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
                        <Link to={'/ebr/equipos'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Detalles del Equipo Seleccionado</Text>
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
            >
                <Stack 
                    direction={{ base: "column", lg: "row" }} 
                    w="full" 
                    justifyContent="stretch"
                    spacing={4}
                >
                    <Image 
                        objectFit='cover' 
                        src={activo?.img} 
                        fallbackSrc='https://via.placeholder.com/400x400?text=Activo+sin+imagen' 
                        alt={activo?.nombre} 
                        maxH={'400px'} 
                        maxW={'400px'} 
                        minW="400px"
                        alignSelf={'center'}
                        borderRadius="lg"
                        p={4}
                    />
                    <Stack direction="column" p={6} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>CODIGO </Text>
                            <Text>{activo?.codigo}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>NOMBRE </Text>
                            <Text>{activo?.nombre}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">TIPO EQUIPO: </Text>
                            <Badge
                                colorScheme={'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {activo?.tipo_activo !== null ? activo?.tipo_activo?.nombre : ''}
                            </Badge>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">CANTIDAD</Text>
                            <Badge
                                colorScheme={'purple'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {activo?.cantidad !== null ? activo?.cantidad : 0}
                            </Badge>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>UBICACIÓN DEL EQUIPO </Text>
                            <Text>{activo?.ubicacion}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">FECHA CREADA </Text>
                            <Text>{Moment(activo?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={activo?.estado === "activo" ? 'green' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {activo?.estado === "activo" ? 'ACTIVO' : 'INACTIVO'}
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
                                    {activo?.descripcion}
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
                                    {activo?.observaciones}
                                </AccordionPanel>

                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Stack>

            <Box
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
                mt={3}
            >
                <Stack spacing={4} direction="row" justifyContent="space-between" py={3} px={6}>
                    <Text fontSize="md" fontWeight={'black'}>Más Detalles del equipo</Text>
                    <Icon as={RiFileList2Fill} fontSize="xl" />
                </Stack>
            </Box>

            <Stack 
                direction={{ base: "column", lg : "row" }}
                mt={3}
                borderRadius="xs"
                boxShadow="base"
            >
                <Stack 
                    direction="column" 
                    p={6} 
                    spacing={4} 
                    w="full" 
                    borderRadius="xs"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white" 
                    _dark={{ bg: "primary.800" }}
                >
                        <Stack justifyContent="center">
                            <Text fontWeight="bold" textAlign="center">SOFTWARE</Text>
                        </Stack>
                        <Divider />
                        <Divider />
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>MODELO </Text>
                            <Text>{activo?.modelo}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>MARCA </Text>
                            <Text>{activo?.marca}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>PROCESADOR </Text>
                            <Text>{activo?.procesador}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>RAM </Text>
                            <Text>{activo?.ram}</Text>
                        </Stack>
                        <Divider />
                </Stack>
                <Stack 
                    direction="column"
                    p={6} 
                    spacing={4} 
                    w="full" 
                    borderRadius="xs"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white" 
                    _dark={{ bg: "primary.800" }}
                >
                        <Stack justifyContent="center">
                            <Text fontWeight="bold" textAlign="center">HADWARE</Text>
                        </Stack>
                        <Divider />
                        <Divider />
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>COLOR </Text>
                            <Text>{activo?.color}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>ACCESORIOS </Text>
                            <Text>{activo?.accesorios}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>CONDICIÓN </Text>
                            <Text>{activo?.condicion}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>FECHA DE COMPRA </Text>
                            <Text>{Moment.utc(activo?.fecha_compra).format('[EL] DD [de] MMMM [del] YYYY')}</Text>
                        </Stack>
                        <Divider />
                </Stack>
            </Stack>
            <Stack 
                direction="column"
                p={6} 
                spacing={4} 
                w="full" 
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={3}
                _dark={{ bg: "primary.800" }}
            >
                <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>RESPONSABLE </Text>
                    <Text>{activo?.responsable}</Text>
                </Stack>
                {
                    activo?.estado === 'inactivo' ? (
                        <>
                            <Divider />
                            <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold" mr={2}>FECHA DE ANULACIÓN / INACTIVIDAD </Text>
                                <Text>{Moment.utc(activo?.fecha_anulacion).format('DD [de] MMMM [del] YYYY')}</Text>
                            </Stack>
                        </>
                    ) : null
                }
            </Stack>
        </>
    )
}

export default DetallesActivo;