import React, { useState } from 'react'
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
    Stack,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createTipoActivo } from '../../../features/tipoActivoSlice';
import { RiRefreshLine } from 'react-icons/ri';

const ModalAgregarCategoria = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        codigo: '',
        nombre: '',
        descripcion: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleSave = () => {
        dispatch(createTipoActivo(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleClickGenerateCode = () => {

        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        let result1= '';

        const charactersLength = characters.length;

        for ( let i = 0; i < 10; i++ ) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        setIndice({ ...indice, codigo: result1 });
    }

    return (
        <>
            <Tooltip hasArrow label='Agregar Nuevo Registro' placement='auto'>
                <IconButton
                    colorScheme="messenger"
                    _dark={{ color: "white", _hover: { bg: "messenger.600" }}}
                    aria-label="Agregar"
                    icon={<Icon as={VscAdd} fontSize="2xl" />}
                    variant="solid"
                    onClick={handleModalOpen}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl" isCentered>
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                        <ModalHeader textAlign="center">AGREGAR NUEVA CATEGORIA PARA EQUIPOS</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl isRequired>
                                    <FormLabel>CODIGO</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={'text'}
                                            placeholder='Ingrese el codigo'
                                            defaultValue={indice.codigo !== '' ? indice.codigo : ''}
                                            onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
                                            textTransform="uppercase"
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
                                    <FormLabel>NOMBRE</FormLabel>
                                    <Input
                                        placeholder="ESCRIBE EL NOMBRE DE LA CATEGORIA"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme="red" 
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleModalClose}
                                borderRadius="none"
                            >
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="messenger" 
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.codigo === '' || indice.nombre === '' }
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

export default ModalAgregarCategoria