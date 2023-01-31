import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { createDocente } from '../../features/docenteSlice';

const AgregarDocente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        nombres: '',
        apellidos: '',
        dni: '',
        correo: '',
        celular: '',
        fecha_nacimiento: '',
        img: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createDocente(indice)).then(() => {
            setCargando(false);
            navigate('/ebr/docentes');
        })
        setIndice(initialValues);
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
                        <Text fontSize="lg" fontWeight={'black'}>Agregar Nuevo Docente</Text>
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

                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                                <Input
                                    placeholder="Escribe los nombres"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombres: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                                <Input
                                    placeholder="Escribe los apellidos"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, apellidos: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                        </Stack>

                        <FormControl isRequired>
                            <FormLabel fontWeight={'semibold'}>DNI</FormLabel>
                            <Input
                                placeholder='Ejemplo: 71499918'
                                type="text"
                                onChange={(e) => setIndice({ ...indice, dni: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
                            <Input
                                placeholder='Ejemplo: usuario@gmail.com'
                                type="email"
                                onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                            />
                        </FormControl>

                        <FormControl fontWeight={'semibold'}>
                            <FormLabel>CELULAR</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children='+51' />
                                <Input
                                    placeholder="Escribe el celular"
                                    type="tel"
                                    onChange={(e) => setIndice({ ...indice, celular: '+51' + e.target.value })}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>FECHA DE NACIMIENTO</FormLabel>
                            <Input
                                type="date"
                                onChange={(e) => setIndice({ ...indice, fecha_nacimiento: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                            <Input
                                type="text"
                                placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                            />
                        </FormControl>

                        <FormControl isRequired>
                                    <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                    <RadioGroup
                                        onChange={(e) => setIndice({ ...indice, estado: e })}
                                    >
                                        <Stack direction='row'>
                                            <Radio value={"ACTIVO"}>ACTIVO</Radio>
                                            <Radio value={"INACTIVO"}>INACTIVO</Radio>
                                            <Radio value={"RETIRADO"}>RETIRADO</Radio>
                                        </Stack>
                                    </RadioGroup>
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
                            disabled={ indice.nombres === '' || indice.apellidos === '' || indice.dni === '' ? true : false }
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

export default AgregarDocente;