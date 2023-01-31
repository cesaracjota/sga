import React, { useEffect } from 'react'
import {
    IconButton,
    Stack,
    Text,
    Divider,
    Badge,
    Image,
    Box,
    HStack,
} from '@chakra-ui/react';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { SpinnerComponent } from '../../helpers/spinner';
import { getDocente, reset } from '../../features/docenteSlice';

const DetallesDocente = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { docente, isLoading, isError, message } = useSelector((state) => state.docentes);

    const params = useParams(location);

    if (isError) {
        ToastChakra('Error', message, 'error', 1000);
        console.log(message);
    }

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getDocente(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch, params.id]);

    const getBithdayTimer = (birthday) => {
        if (!birthday) return 'No hay fecha de nacimiento';
        else {
            const date = new Date(birthday);
            const today = new Date();
            const diffMonth = today.getMonth() - date.getMonth();
            const diffDay = (today.getDate() - date.getDate()) - 1;

            if (Math.abs(diffMonth) === 0 && Math.abs(diffDay) === 0) {
                return '¡Feliz cumpleaños!';
            }
            else if (Math.abs(diffMonth) === 0) {
                return `${Math.abs(diffDay)} días`;
            }
            else if (Math.abs(diffMonth) > 1) {
                return `${Math.abs(diffMonth)} meses y ${Math.abs(diffDay)} días`;
            } else {
                return `${Math.abs(diffMonth)} mes y ${Math.abs(diffDay)} días`;
            }
        }
    }

    let faltaCumpleanios = getBithdayTimer(docente?.fecha_nacimiento);

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
                        <Link to={'/ebr/docentes'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Detalles del Docente Seleccionado</Text>
                    </HStack>
                </Stack>
            </Box>

            <Stack 
                direction="column" 
                mt={3}
                p={4}
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
                        src={docente?.img}
                        fallbackSrc='https://via.placeholder.com/400x400?text=Docente+sin+imagen'
                        border={'1px'}
                        borderColor="gray.200"
                        alt={docente?.nombres}
                        maxH={'300px'} 
                        maxW={'300px'} 
                        minW="300px"
                        alignSelf={'center'}
                        borderRadius="lg"
                        p={4}
                        rounded="full"
                    />
                    <Stack direction="column" p={6} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>NOMBRES </Text>
                            <Text>{docente?.nombres}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>APELLIDOS </Text>
                            <Text>{docente?.apellidos}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>DNI </Text>
                            <Text>{docente?.dni}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">FECHA CREADA </Text>
                            <Text>{Moment(docente?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={docente?.estado === 'ACTIVO' ? 'green' : docente?.estado === 'RETIRADO' ? 'gray' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                { docente?.estado }
                            </Badge>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack 
                direction="column" 
                p={10}
                spacing={4} 
                w="full" 
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={3}
                _dark={{ bg: "primary.800" }}
            >
                    <Stack justifyContent="center">
                        <Text fontWeight="bold" textAlign="center">MÁS DETALLES DEL DOCENTE</Text>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                        <Text fontWeight="bold" mr={2}>CORREO </Text>
                        <Text>{docente?.correo}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                        <Text fontWeight="bold" mr={2}>CELULAR </Text>
                        <Text>{docente?.celular}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                        <Text fontWeight="bold" mr={2}>FECHA CUMPLEAÑOS </Text>
                        <Text>{ !docente?.fecha_nacimiento ? 'No se le agregó fecha de cumpleaños' : Moment.utc(docente?.fecha_nacimiento).format('[El] DD [de] MMMM [del] YYYY')}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                        <Text fontWeight="bold" mr={2}>CUANTO FALTA PARA SUS CUMPLEAÑOS </Text>
                        <Badge
                                colorScheme={'pink'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {faltaCumpleanios}
                        </Badge>
                    </Stack>
            </Stack>

        </>
    )
}

export default DetallesDocente;