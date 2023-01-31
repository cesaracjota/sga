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
    Select,
    Stack,
    Switch,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { updateLibro } from '../../features/libroSlice';

export const ModalEditarLibro = ({ row, grados }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        _id: null,
        titulo: '',
        nombre: '',
        codigo: '',
        descripcion: '',
        editorial: '',
        autor: '',
        cantidad: '',
        grado: '',
        img: '',
        es_obra_literaria: false,
        observaciones: '',
        estado: null,
    }

    const [indice, setIndice] = useState(initialValues);

    let gradosFilter = grados.filter(grado => grado.modalidad?.nombre === "EDUCACION BASICA REGULAR");

    const handleModalOpen = (data) => {
        setIsModalOpen(true);
        setIndice(data);
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = () => {
        dispatch(updateLibro(indice));
        setIsModalOpen(false)
    }

    return (
        <>
            <Tooltip hasArrow label='Editar' placement='auto'>
                <IconButton
                    colorScheme="blackAlpha" 
                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                    aria-label="Editar"
                    icon={<Icon as={VscEdit}
                    fontSize="2xl" />}
                    variant="ghost"
                    onClick={() => handleModalOpen(row)}
                    ml={2}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay />
                <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                    <ModalHeader textAlign="center">ACTUALIZAR EL LIBRO SELECCIONADO</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
                            <Stack spacing={1} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>TITULO</FormLabel>
                                    <Input
                                        type="text"
                                        defaultValue={indice ? indice.titulo : ''}
                                        onChange={(e) => setIndice({ ...indice, titulo: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.codigo : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                    <FormHelperText textColor={'red.500'}>
                                        {
                                            indice.codigo.length > 0 && indice.codigo.length < 5 ? 'debe tener al menos 5 caracteres' : ''
                                        }
                                    </FormHelperText>
                                </FormControl>
                            </Stack>

                            <Stack spacing={1} direction={{ base: 'column', lg: "row" }}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.nombre : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                        placeholder="Nombre"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                                    <Select
                                        defaultValue={indice.grado !== null ? indice.grado._id : ''}
                                        onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                    >
                                        { gradosFilter.map((grado) => (
                                            <option key={grado._id} value={grado._id}>
                                                {grado.nombre}
                                            </option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.descripcion : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, descripcion: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                    rows={1}
                                />
                            </FormControl>

                            <Stack spacing={1} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>EDITORIAL</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.editorial : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, editorial: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                    <FormHelperText textColor={'red.500'}>
                                        {
                                            indice.editorial.length > 0 && indice.editorial.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                        }
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>AUTOR</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.autor : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, autor: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                    <FormHelperText textColor={'red.500'}>
                                        {
                                            indice.autor.length > 0 && indice.autor.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                        }
                                    </FormHelperText>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.cantidad : ''}
                                        placeholder='100'
                                        type="number"
                                        onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>

                            <Stack spacing={2} direction={{base:"column", lg: "row"}}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ES UNA OBRA LITERARIA</FormLabel>
                                    <Switch onChange={(e) => setIndice({ ...indice, es_obra_literaria: e.target.checked })} value={indice ? indice.es_obra_literaria : null} colorScheme="messenger" isChecked={indice.es_obra_literaria === true ? true : false} size='lg' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.img : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                        placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                    />
                                </FormControl>
                            </Stack>

                            <Stack direction="row" w={'full'}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                    <InputGroup size='md'>
                                        <Textarea
                                            defaultValue={indice ? indice.observaciones : ''}
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                            placeholder="Escribe las observaciones acerca del libro"
                                            rows={1}
                                        />
                                        <InputRightElement width='4rem'>
                                            <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={indice ? indice.estado : null} colorScheme="purple" isChecked={indice.estado === true ? true : false} size='lg' />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }} size="lg" mr={3} onClick={handleModalClose} borderRadius="none">
                            CANCELAR
                        </Button>
                        <Button colorScheme="green" _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" } }} size="lg" mr={3} onClick={handleUpdate} borderRadius="none">
                            ACTUALIZAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
