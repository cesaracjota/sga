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
    Select as SelectChakra,
    Stack,
    Textarea,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { Search2Icon } from '@chakra-ui/icons';
import { getEstudianteSearch } from '../../../features/estudiantes/CEBA/estudianteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { RiRefreshLine } from 'react-icons/ri';
import { createPago } from '../../../features/pagos/CEBA/pagoSlice';
import { Select } from "chakra-react-select";

const ModalRegistrarPago = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalSearch, setOpenModalSearch] = useState(false);

    const initialValues = {
        codigo: '',
        estudiante: '',
        concepto: '',
        meses: [],
        anio: new Date().getFullYear().toString(),
        importe: '',
        metodo_pago: '',
        descripcion: '',
        estado: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [dataSearch, setDataSearch] = useState('');
    const [datosEstudiante, setDatosEstudiante] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState([]);
    const bg = useColorModeValue('white', 'primary.900');

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
        setDatosEstudiante([]);
        setEstudianteSeleccionado([]);
    }

    const handleCloseModalSearch = () => {
        setOpenModalSearch(false);
        setDataSearch('');
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteSearch(dataSearch)).then((res) => {
            if(res.payload.length > 0){
                setOpenModalSearch(true);
                setDatosEstudiante(res.payload);
            } else {
                ToastChakra('NO SE ENCONTRARON REGISTROS', 'No se encontró registros con los datos ingresados', 'error', 1500, 'bottom');
                setDatosEstudiante([]);
            }
        });
    }

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(createPago(indice));
        setIsModalOpen(false);
        setIndice(initialValues);
        setDatosEstudiante([]);
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

    const meses = [
        { value: 'ENERO', label: 'ENERO' },
        { value: 'FEBRERO', label: 'FEBRERO' },
        { value: 'MARZO', label: 'MARZO' },
        { value: 'ABRIL', label: 'ABRIL' },
        { value: 'MAYO', label: 'MAYO' },
        { value: 'JUNIO', label: 'JUNIO' },
        { value: 'JULIO', label: 'JULIO' },
        { value: 'AGOSTO', label: 'AGOSTO' },
        { value: 'SEPTIEMBRE', label: 'SEPTIEMBRE' },
        { value: 'OCTUBRE', label: 'OCTUBRE' },
        { value: 'NOVIEMBRE', label: 'NOVIEMBRE' },
        { value: 'DICIEMBRE', label: 'DICIEMBRE' },
    ]

    const handleSelect = (data) => {
        setIndice({ ...indice, meses: data.map((item) => item.value) });
    }

    const handleSelectConcepto = (data) => {
        setIndice({ ...indice, concepto: data.value });
    }

    const handleSelectEstudiante = (data) => {
        if(data){
            setIndice({ ...indice, estudiante: data.value });
            setEstudianteSeleccionado(data);
        }else{
            setIndice({ ...indice, estudiante: '' });
            setEstudianteSeleccionado([]);
        }
    }

    const ChakraStyle = {
        option: (provided) => ({
            ...provided,
            bg: bg,
            cursor: "pointer",
            borderRadius: "xs",
            fontWeight: 'semibold',
            _hover: {
                bg: 'blue.500',
                color: 'white',
                fontWeight: 'semibold',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            bg: '#0078ff1c',
            borderColor: 'blue.500',
            fontSize: '10px',
            size: "small",
            color: 'blue.500',
            borderWidth: "1px",
            fontWeight: 'semibold',
        }),
        placeholder: (provided) => ({
            ...provided,
            bg: "none",
            fontSize: "14px",
            cursor: "inherit"
        }),
    }

    const anio = new Date().getFullYear();

    const anios = [
        { value: anio - 1, label: anio - 1 },
        { value: anio, label: anio },
        { value: anio + 2, label: anio + 2 },
        { value: anio + 3, label: anio + 3 },
        { value: anio + 4, label: anio + 4 },
        { value: anio + 5, label: anio + 5 },
    ]

    const conceptos = [
        { value: 'MATRICULA', label: 'MATRICULA' },
        { value: 'MENSUALIDAD', label: 'MENSUALIDAD' },
        { value: 'OTROS', label: 'OTROS' },
    ]

    const estudianteOptions = datosEstudiante.map((item) => {
        return {
            value: item._id,
            label: `🧑‍🎓${item.apellidos}, ${item.nombres} 🎴 ${item.dni} `            
        }
    });

    return (
        <>
            <Button
                colorScheme="messenger"
                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
                variant="solid"
                rounded={'none'}
                onClick={handleModalOpen}
            >
                Nuevo Registro de Pago
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay />
                <form onSubmit={handleSave}>
                    <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                        <ModalHeader textAlign="center">REGISTRAR NUEVO PAGO DE UN ESTUDIANTE</ModalHeader>
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
                                <FormControl>
                                    <FormLabel fontWeight="semibold">CONCEPTO DE PAGO</FormLabel>
                                    <Select
                                        placeholder="Seleccione el concepto de pago"
                                        size="md"
                                        onChange={handleSelectConcepto}
                                        options={conceptos}
                                        isClearable
                                        isSearchable
                                        colorScheme="purple"
                                        className="chakra-react-select"
                                        classNamePrefix="chakra-react-select"
                                        variant="fulled"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={2} direction={{base: "column", lg: "row"}} justifyContent={'space-between'} mt={2}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">ESTUDIANTE</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={'text'}
                                            placeholder='Buscar por dni, nombres y apellidos del estudiante'
                                            defaultValue={dataSearch}
                                            onChange={(e) => setDataSearch(e.target.value)}
                                        />
                                        <InputRightElement width='2.5rem'>
                                            <Tooltip hasArrow label='Buscar por DNI' placement='auto'>
                                                <IconButton
                                                    aria-label="Buscar"
                                                    icon={<Icon as={Search2Icon} fontSize="md" />}
                                                    colorScheme={'green'}
                                                    variant="solid"
                                                    isDisabled={dataSearch.length <=3 ? true : false}
                                                    onClick={handleSearchEstudianteByDni}
                                                />
                                            </Tooltip>
                                            <Modal isOpen={openModalSearch} onClose={handleCloseModalSearch} size={'4xl'}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>SELECCIONE EL ESTUDIANTE</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Select
                                                            placeholder="Seleccione el estudiante"
                                                            size="md"
                                                            onChange={handleSelectEstudiante}
                                                            options={estudianteOptions}
                                                            isClearable
                                                            isSearchable
                                                            colorScheme="pink"
                                                            className="chakra-react-select"
                                                            classNamePrefix="chakra-react-select"
                                                            variant="fulled"
                                                        />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button colorScheme='blue' mr={3} onClick={handleCloseModalSearch}>
                                                            ACEPTAR
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </InputRightElement>
                                    </InputGroup>
                                    {
                                        !estudianteSeleccionado?.value ? null : <FormHelperText>
                                            El estudiante Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{estudianteSeleccionado?.label}</span>
                                        </FormHelperText>
                                    }
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">IMPORTE</FormLabel>
                                    <Input
                                        type={'number'}
                                        placeholder='Ingrese el importe'
                                        onChange={(e) => setIndice({ ...indice, importe: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={4} direction={{base: "column", lg: "row"}} justifyContent="space-between" mt={2}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">AÑO</FormLabel>
                                    <SelectChakra
                                        defaultValue={indice?.anio}
                                        onChange={(e) => setIndice({ ...indice, anio: e.target.value })}
                                    >
                                        {
                                            anios.map((item, index) => (
                                                <option key={index} value={item.value}>{item.label}</option>
                                            ))
                                        }
                                    </SelectChakra>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">MES</FormLabel>
                                    <Select
                                        placeholder="Seleccione el mes"
                                        options={meses}
                                        onChange={handleSelect}
                                        isClearable
                                        colorScheme="purple"
                                        className="chakra-react-select"
                                        classNamePrefix="chakra-react-select"
                                        variant="fulled"
                                        chakraStyles={ChakraStyle}
                                        isMulti
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={2} direction="column" justifyContent="space-between" mt={2}>

                                <FormControl>
                                    <FormLabel fontWeight="semibold">DESCRIPCION DE LA ENTREGA</FormLabel>
                                    <Textarea
                                        placeholder="Descripcion de la entrega"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={2}
                                    />
                                </FormControl>
                                <Stack spacing={4} direction={{base: "column", lg: "row"}} justifyContent="space-between" mt={4}>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                        <RadioGroup
                                            onChange={(e) => setIndice({ ...indice, estado: e })}
                                        >
                                            <Stack direction='row'>
                                                <Radio value={"PENDIENTE"}>PENDIENTE</Radio>
                                                <Radio value={"INCOMPLETO"}>INCOMPLETO</Radio>
                                                <Radio value={"CANCELADO"}>CANCELADO</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>METODO DE PAGO</FormLabel>
                                        <SelectChakra
                                            placeholder="Selecciona una opción"
                                            onChange={(e) => setIndice({ ...indice, metodo_pago: e.target.value })}
                                        >
                                            <option value="EFECTIVO">EFECTIVO</option>
                                            <option value="TARGETA_CREDITO">TARGETA DE CREDITO</option>
                                            <option value="TRANSFERENCIA_BANCARIA">TRANSFERENCIA BANCARIA</option>
                                            <option value="YAPE">YAPE</option>
                                            <option value="OTRO">OTRO</option>
                                        </SelectChakra>
                                    </FormControl>
                                </Stack>
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
                                isDisabled={!indice.estudiante || !indice?.codigo || !indice?.meses || !indice?.anio || !indice?.importe || !indice?.estado}
                                borderRadius="none"
                            >
                                REGISTRAR PAGO
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default ModalRegistrarPago;


// function ModalSeleccionarEstudiante({ open, close, estudiantes }) {

//     return (
//         <>
//             <Modal isOpen={open} onClose={close}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Modal Title</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Text>Hi There</Text>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={close}>
//                             Close
//                         </Button>
//                         <Button variant='ghost'>Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }