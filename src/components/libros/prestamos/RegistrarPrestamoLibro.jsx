import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Textarea,
    Tooltip,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createPrestamoLibro, getLibroByCodigo } from '../../../features/prestamo_libroSlice';
import { Search2Icon } from '@chakra-ui/icons';
import { getDocenteByDni } from '../../../features/docenteSlice';
import { getEstudianteByDni } from '../../../features/estudiantes/EBR/estudianteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { RiRefreshLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RegistrarPrestamoLibro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        codigo: '',
        estudiante: '',
        docente: '',
        libro: '',
        descripcion_entrega: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [codigoLibro, setCodigoLibro] = useState('');
    const [dniEstudiante, setDniEstudiante] = useState('');
    const [dniDocente, setDniDocente] = useState('');
    const [datosLibro, setDatosLibro] = useState([{}]);
    const [datosEstudiante, setDatosEstudiante] = useState([{}]);
    const [datosDocente, setDatosDocente] = useState([{}]);
    const [tipoSeleccion, setTipoSeleccion] = useState('');

    const handleSearchLibroByCodigo = () => {
        dispatch(getLibroByCodigo(codigoLibro)).then((res) => {
            if (res.meta?.requestStatus !== 'rejected') {
                setIndice({ ...indice, libro: res.payload._id });
                setDatosLibro(res.payload);
            } else {
                ToastChakra('LIBRO NO ENCONTRADO', 'El libro no se encuentra registrado con ese codigo', 'error', 1500, 'bottom');
            }
        })
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteByDni(dniEstudiante)).then((res) => {
            setIndice({ ...indice, estudiante: res.payload._id });
            setDatosEstudiante(res.payload);
        });
    }

    const handleSearchDocenteByDni = () => {
        dispatch(getDocenteByDni(dniDocente)).then((res) => {
            setIndice({ ...indice, docente: res.payload._id });
            setDatosDocente(res.payload);
        });
    }

    const handleChangeRadio = (e) => {
        setTipoSeleccion(e);
        if (e === 'ESTUDIANTE') {
            setDniDocente('');
            setDatosDocente([{}]);
        } else {
            setDniEstudiante('');
            setDatosEstudiante([{}]);
        }
    }

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createPrestamoLibro(indice)).then(() => {
            setCargando(false);
            navigate('/ebr/libros/prestamos');
        })
        setIndice(initialValues);
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
                        <Link to={'/ebr/libros/prestamos'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Registrar Nuevo Prestamo de Libros</Text>
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
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">CODIGO</FormLabel>
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
                                <FormLabel fontWeight="semibold">LIBRO</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por codigo'
                                        onChange={(e) => setCodigoLibro(e.target.value.toUpperCase())}
                                        textTransform={'uppercase'}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por codigo' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={codigoLibro === '' ? true : false}
                                                onClick={handleSearchLibroByCodigo}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosLibro?.nombre ? null : <FormHelperText>
                                        El libro Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosLibro?.nombre}</span> y su autor es : <span style={{ color: 'blue', fontWeight: "bold" }}> {datosLibro?.autor} </span>
                                    </FormHelperText>
                                }
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction="column" justifyContent="space-between" mt={2}>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">A QUIEN SE HACE EL PRESTADO</FormLabel>
                                <RadioGroup
                                    onChange={(e) => handleChangeRadio(e)}
                                >
                                    <Stack direction='row'>
                                        <Radio value={"ESTUDIANTE"}>ESTUDIANTE</Radio>
                                        <Radio value={"DOCENTE"}>DOCENTE</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isRequired={tipoSeleccion === 'ESTUDIANTE'} hidden={tipoSeleccion !== 'ESTUDIANTE'}>
                                <FormLabel fontWeight="semibold">ESTUDIANTE</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por dni'
                                        onChange={(e) => setDniEstudiante(e.target.value)}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por DNI' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={dniEstudiante === '' ? true : false}
                                                onClick={handleSearchEstudianteByDni}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosEstudiante?.nombres ? null : <FormHelperText>
                                        El estudiante Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosEstudiante?.nombres + ' ' + datosEstudiante?.apellidos}</span>
                                    </FormHelperText>
                                }
                            </FormControl>

                            <FormControl isRequired={tipoSeleccion === 'DOCENTE'} hidden={tipoSeleccion !== 'DOCENTE'}>
                                <FormLabel fontWeight="semibold">DOCENTE</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por dni'
                                        onChange={(e) => setDniDocente(e.target.value)}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por DNI' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={dniDocente === '' ? true : false}
                                                onClick={handleSearchDocenteByDni}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosDocente?.nombres ? null : <FormHelperText>
                                        El Docente Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosDocente?.nombres + ' ' + datosDocente?.apellidos}</span>
                                    </FormHelperText>
                                }
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction="column" justifyContent="space-between" mt={2}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">DESCRIPCION DE LA ENTREGA</FormLabel>
                                <Textarea
                                    placeholder="Descripcion de la entrega"
                                    onChange={(e) => setIndice({ ...indice, descripcion_entrega: e.target.value })}
                                    rows={2}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                                <Textarea
                                    placeholder="Observaciones adicionales de la entrega"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    rows={2}
                                />
                            </FormControl>
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
                                disabled={tipoSeleccion === 'ESTUDIANTE' ? !indice.estudiante : !indice?.docente || !indice?.codigo || !indice.libro}
                                borderRadius="none"
                            >
                                REGISTRAR PRESTAMO
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </form>
        </>
    )
}

export default RegistrarPrestamoLibro;