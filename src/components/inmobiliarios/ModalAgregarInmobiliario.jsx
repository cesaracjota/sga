import React, { useEffect, useState } from 'react'
import { 
    Button,
    FormControl,
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
    Select, 
    Stack,
    Switch,
    Textarea, 
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { createInmobiliario } from '../../features/inmobiliarioSlice';
import ModalAgregarGrado from '../grados/ModalAgregarGrado';
import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { getModalidades, reset} from '../../features/modalidadSlice';
import { RiRefreshLine } from 'react-icons/ri';

const ModalAgregarInmobiliario = ({ grados }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { modalidades, isError, message } = useSelector((state) => state.modalidades);
    
    useEffect(() => {
        
        if(isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        dispatch(getModalidades())

        return () => {
            dispatch(reset())
        }

    }, [navigate, isError, message, dispatch]);

    const initialValues = {
        nombre: '',
        codigo: '',
        descripcion: '',
        cantidad: '',
        grado: '',
        img: '',
        observaciones: '',
        estado: true,
    }

    const [indice, setIndice] = useState(initialValues);

    let gradosFilter = grados.filter(grado => grado.modalidad?.nombre === "EDUCACION BASICA REGULAR");

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
    }

    const handleSave = () => {
        dispatch(createInmobiliario(indice));
        setIsModalOpen(false)
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
            <Button
                colorScheme="messenger"
                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
                variant="solid"
                rounded={'none'}
                onClick={handleModalOpen}
            >
                Nuevo Registro
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                        <ModalHeader textAlign="center">AGREGAR UNA NUEVO INMOBILIARIO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} mt={-4} direction="column" justifyContent="space-between" p={2}>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                        <Input
                                            placeholder="Escribe el nombre"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>CÓDIGO</FormLabel>
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
                                </Stack>

                                <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                        <Input
                                            placeholder="100"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>GRADOS</FormLabel>
                                        <Stack direction="row" justifyContent="space-between" w="full">
                                            <Select 
                                                placeholder="Selecciona una opción" 
                                                onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                            >
                                                { gradosFilter.map((grado) => (
                                                    <option key={grado._id} value={grado?._id}>
                                                        {grado?.nombre}
                                                    </option>
                                                ))}
                                            </Select>
                                            <ModalAgregarGrado  modalidades = { modalidades } />
                                        </Stack>
                                    </FormControl>
                                </Stack>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={2}
                                    />
                                </FormControl>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                        <InputGroup size='md'>
                                            <Textarea
                                                defaultValue={indice ? indice.observaciones : ''}
                                                type="text"
                                                onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                                placeholder="Escribe las observaciones acerca del articulo"
                                                rows={2}
                                            />
                                            <InputRightElement width='4rem'>
                                                <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : false } colorScheme="purple" isChecked={indice ? indice.estado : false } size='lg' />
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter mt={-4}>
                            <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} size="lg" mr={3} onClick={handleModalClose} borderRadius="none">
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="messenger" 
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.nombre === '' || indice.codigo === '' || indice.grado === '' }
                                borderRadius="none"
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarInmobiliario;