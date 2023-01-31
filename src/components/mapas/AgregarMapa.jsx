import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Text,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createMapa } from '../../features/mapaSlice';
import { RiRefreshLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ToastChakra } from '../../helpers/toast';
import { getGrados, reset } from '../../features/gradoSlice';

const AgregarMapa = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { grados, isError, message } = useSelector((state) => state.grados);

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getGrados());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const initialValues = {
        codigo: '',
        nombre: '',
        grado: '',
        cantidad: '',
        img: '',
        descripcion: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    let gradosFilter = grados.filter(grado => grado.modalidad?.nombre === "EDUCACION BASICA REGULAR");

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setCargando(true);
        dispatch(createMapa(indice)).then(() => {
            setCargando(false);
            navigate('/ebr/mapas');
        })
        setIndice(initialValues)
    }

    const handleClickGenerateCode = () => {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result1 = '';

        const charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        setIndice({ ...indice, codigo: result1.toUpperCase() });
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
                        <Link to={'/ebr/mapas'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Agregar Nueva Mapa</Text>
                    </HStack>
                </Stack>
            </Box>

            <form onSubmit={handleSave}>
                <Box
                    borderRadius="xs"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.800" }}
                    mt={4}
                    p={4}
                >
                    <Stack spacing={8} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Ingrese el codigo'
                                        defaultValue={indice.codigo !== '' ? indice.codigo : ''}
                                        onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
                                        textTransform={'uppercase'}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Generar codigo' placement='auto'>
                                            <IconButton aria-label="Buscar" colorScheme={'yellow'} rounded={'full'} size={'sm'} onClick={handleClickGenerateCode}>
                                                <Icon as={RiRefreshLine} />
                                            </IconButton>
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                <Input
                                    placeholder="Nombre de la mapa"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                                <Select
                                    placeholder="Selecciona una opción"
                                    onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                >
                                    {gradosFilter.map((grado) => (
                                        <option key={grado._id} value={grado._id}>
                                            {grado.nombre}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                <Input
                                    placeholder="100"
                                    type="number"
                                    onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                />
                            </FormControl>
                        </Stack>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                            <Textarea
                                placeholder="Escribe la descripcion de la mapa"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                            />
                        </FormControl>

                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                <Input
                                    type="text"
                                    placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                    onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Stack spacing={4} direction="row" justifyContent="right">
                        <Button
                            colorScheme="messenger"
                            _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                            loadingText='Guardando...'
                            spinnerPlacement='start'
                            size="lg"
                            type='submit'
                            isLoading={cargando ? true : false}
                            disabled={indice.nombre === '' || indice.codigo === '' || indice.grado === ''}
                            borderRadius="none"
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            </form>
        </>
    )
}

export default AgregarMapa;