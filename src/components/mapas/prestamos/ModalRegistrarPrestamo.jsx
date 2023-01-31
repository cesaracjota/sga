import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { Search2Icon } from '@chakra-ui/icons';
import { getDocenteByDni } from '../../../features/docenteSlice';
import { getEstudianteByDni } from '../../../features/estudiantes/EBR/estudianteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { RiRefreshLine } from 'react-icons/ri';
import { createPrestamoMapa, getMapaByCodigo } from '../../../features/prestamo_mapaSlice';

const ModalRegistrarPrestamo = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        codigo: '',
        estudiante: '',
        docente: '',
        mapa: '',
        descripcion_entrega: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [codigoMapa, setCodigoMapa] = useState('');
    const [dniEstudiante, setDniEstudiante] = useState('');
    const [dniDocente, setDniDocente] = useState('');
    const [datosMapa, setDatosMapa] = useState([{}]);
    const [datosEstudiante, setDatosEstudiante] = useState([{}]);
    const [datosDocente, setDatosDocente] = useState([{}]);
    const [tipoSeleccion, setTipoSeleccion] = useState('');

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
        setCodigoMapa('');
        setDatosMapa([{}]);
        setDniEstudiante('');
        setDatosEstudiante([{}]);
        setDniDocente('');
        setDatosDocente([{}]);
        setTipoSeleccion('');
    }

    const handleSearchMapaByCodigo = () => {
        dispatch(getMapaByCodigo(codigoMapa)).then((res) => {
            if(res.meta?.requestStatus !== 'rejected'){
                setIndice({ ...indice, mapa: res.payload._id });
                setDatosMapa(res.payload);
            }else{
                ToastChakra('MAPA NO ENCONTRADO', 'La mapa no se encuentra registrado con ese codigo', 'error', 1500, 'bottom');
            }
        })
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteByDni(dniEstudiante)).then((res) => {
            if(res.meta?.requestStatus !== 'rejected'){
                setIndice({ ...indice, estudiante: res.payload._id });
                setDatosEstudiante(res.payload);
            } else {
                ToastChakra('ESTUDIANTE NO ENCONTRADO', 'El estudiante no se encuentra registrado con ese DNI', 'error', 1500, 'bottom');
            }
        });
    }

    const handleSearchDocenteByDni = () => {
        dispatch(getDocenteByDni(dniDocente)).then((res) => {
            if(res.meta?.requestStatus !== 'rejected'){
                setIndice({ ...indice, docente: res.payload._id });
                setDatosDocente(res.payload);
            }else{
                ToastChakra('DOCENTE NO ENCONTRADO', 'El docente no se encuentra registrado con ese DNI', 'error', 1500, 'bottom');
            }
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

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(createPrestamoMapa(indice));
        setIsModalOpen(false);
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
            <Tooltip hasArrow label='Registrar nuevo prestamo' placement='auto'>
                <IconButton
                    colorScheme="messenger"
                    _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                    aria-label="Agregar"
                    icon={<Icon as={VscAdd} fontSize="2xl" />}
                    variant="solid"
                    onClick={handleModalOpen}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="6xl" isCentered>
                <ModalOverlay />
                <form onSubmit={handleSave}>
                    <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                        <ModalHeader textAlign="center">REGISTRAR NUEVO PRESTAMO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
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
                                    <FormLabel fontWeight="semibold">MAPA</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={'text'}
                                            placeholder='Buscar por codigo'
                                            onChange={(e) => setCodigoMapa(e.target.value.toUpperCase())}
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
                                                    disabled={codigoMapa === '' ? true : false}
                                                    onClick={handleSearchMapaByCodigo}
                                                />
                                            </Tooltip>
                                        </InputRightElement>
                                    </InputGroup>
                                    {
                                        !datosMapa?.nombre ? null : <FormHelperText>
                                            El mapa seleccionada es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosMapa?.nombre}</span> , codigo : <span style={{ color: 'blue', fontWeight: "bold" }}> {datosMapa?.codigo} </span>
                                        </FormHelperText>
                                    }
                                </FormControl>
                            </Stack>
                            <Stack spacing={4} direction="column" justifyContent="space-between" mt={2}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">A QUIEN SE HACE EL PRESTADO</FormLabel>
                                    <RadioGroup
                                        onChange={ (e) =>  handleChangeRadio(e) }
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
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="red"
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }}
                                size="lg"
                                mr={3}
                                onClick={handleModalClose}
                                borderRadius="none"
                            >
                                CANCELAR
                            </Button>
                            <Button
                                colorScheme="messenger"
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                                size="lg"
                                mr={3}
                                type='submit'
                                disabled={ tipoSeleccion==='ESTUDIANTE' ? !indice.estudiante : !indice?.docente || !indice?.codigo || !indice.mapa }
                                borderRadius="none"
                            >
                                REGISTRAR PRESTAMO
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default ModalRegistrarPrestamo;