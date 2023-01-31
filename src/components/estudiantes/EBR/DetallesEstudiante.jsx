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
import { ToastChakra } from '../../../helpers/toast';
import { SpinnerComponent } from '../../../helpers/spinner';
import { getEstudiante, reset } from '../../../features/estudiantes/EBR/estudianteSlice';

const DetallesEstudiante = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { estudiante, isLoading, isError, message } = useSelector((state) => state.estudiantes_ebr);

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

        dispatch(getEstudiante(params.id));

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

    let faltaCumpleanios = getBithdayTimer(estudiante?.fecha_nacimiento);

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
                        <Link to={'/ebr/estudiantes'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Detalles del Estudiante Seleccionado</Text>
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
                        src={estudiante?.img}
                        fallbackSrc='https://via.placeholder.com/400x400?text=Estudiante+sin+imagen'
                        border={'1px'}
                        borderColor="gray.200"
                        alt={estudiante?.nombres}
                        maxH={'300px'}
                        maxW={'300px'}
                        minW="300px"
                        alignSelf={'center'}
                        borderRadius="lg"
                        p={4}
                        rounded="full"
                    />
                    <Stack direction="column" p={6} spacing={4} w="full" bg="white" _dark={{ bg: "primary.800" }}>
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>APELLIDOS </Text>
                            <Text>{estudiante?.apellidos}</Text>
                        </Stack>
                        <Divider />
                        <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>NOMBRES </Text>
                            <Text>{estudiante?.nombres}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>DNI </Text>
                            <Text>{estudiante?.dni}</Text>
                        </Stack>

                        <Divider />

                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>SEXO </Text>
                            <Text>{estudiante?.sexo === 'M' ? 'MASCULINO' : 'FEMENINO'}</Text>
                        </Stack>

                        <Divider />

                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">GRADO:</Text>
                            <Badge
                                colorScheme={'red'}
                                variant="solid"
                                px={6}
                                py={2}
                                rounded="full"
                            >
                                {estudiante?.grado?.nombre}
                            </Badge>
                        </Stack>

                        <Divider />

                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">TIPO DE ESTUDIANTE:</Text>
                            <Badge
                                colorScheme={'whatsapp'}
                                variant="solid"
                                px={6}
                                py={2}
                                rounded="full"
                            >
                                {estudiante?.tipo_estudiante}
                            </Badge>
                        </Stack>

                        <Divider />

                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={estudiante?.estado === 'ACTIVO' ? 'green' : estudiante?.estado === 'RETIRADO' ? 'gray' : 'red'}
                                variant="solid"
                                px={6}
                                py={2}
                                rounded="full"
                            >
                                {estudiante?.estado}
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
                    <Text fontWeight="bold" textAlign="center">MÁS DETALLES DEL ESTUDIANTE</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>DOMICIO </Text>
                    <Text>{ !estudiante?.domicilio ? 'SIN REGISTRO' : estudiante?.domicilio }</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>TURNO </Text>
                    <Text>{estudiante?.turno}</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>CORREO </Text>
                    <Text>{estudiante?.correo}</Text>
                </Stack>
                <Divider />
                <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}># CELULAR </Text>
                    <Text>{estudiante?.celular}</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>COLEGIO DE PROCEDENCIA </Text>
                    <Text>{ !estudiante?.colegio_procedencia ? 'NINGUNO' : estudiante?.colegio_procedencia }</Text>
                </Stack>
                <Divider />
                <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>FECHA CUMPLEAÑOS </Text>
                    <Text>{!estudiante?.fecha_nacimiento ? 'No se le agregó fecha de cumpleaños' : Moment.utc(estudiante?.fecha_nacimiento).format('[El] DD [de] MMMM [del] YYYY')}</Text>
                </Stack>
                <Divider />
                <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
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
                <Divider />
                <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold">FECHA CREADA </Text>
                    <Text>{Moment(estudiante?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                </Stack>
                <Divider />
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
                    <Text fontWeight="bold" textAlign="center">DETALLES ACERCA DE SUS PADRES</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>NOMBRES Y APELLIDOS </Text>
                    <Text>{!estudiante?.nombre_padres ? 'SIN REGISTRO' : estudiante?.nombre_padres}</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}># CELULAR </Text>
                    <Text>{!estudiante?.celular_padres ? 'SIN REGISTRO' : estudiante?.celular_padres }</Text>
                </Stack>
                <Divider />
                <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>CORREO </Text>
                    <Text>{!estudiante?.correo_padres ? 'SIN REGISTRO' : estudiante?.correo_padres }</Text>
                </Stack>
                <Divider />
            </Stack>

        </>
    )
}

export default DetallesEstudiante;