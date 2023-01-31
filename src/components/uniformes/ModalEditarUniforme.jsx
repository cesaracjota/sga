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
import { updateUniforme } from '../../features/uniformeSlice';
import ModalAgregarCategoria from './categorias/ModalAgregarCategoria';

export const ModalEditarUniforme = ({ row, categorias }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        _id: null,
        articulo: '',
        codigo: '',
        descripcion: '',
        cantidad: '',
        precio: '',
        talla: '',
        caracteristicas: '',
        categoria: '',
        img: '',
        observaciones: '',
        estado: null,
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = (data) => {
        setIsModalOpen(true);
        setIndice(data);
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = () => {
        dispatch(updateUniforme(indice));
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
                    <ModalHeader textAlign="center">ACTUALIZAR EL UNIFORME SELECCIONADO</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
                            <Stack spacing={1} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ARTÍCULO</FormLabel>
                                    <Input
                                        type="text"
                                        defaultValue={indice ? indice.articulo : ''}
                                        onChange={(e) => setIndice({ ...indice, articulo: e.target.value })}
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
                                            indice.codigo.length > 0 && indice.codigo.length < 4 ? 'debe tener al menos 5 caracteres' : ''
                                        }
                                    </FormHelperText>
                                </FormControl>
                            </Stack>

                            <Stack spacing={1} direction={{ base: 'column', lg: "row" }}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>CANTIDAD STOCK</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.cantidad : ''}
                                        placeholder='100'
                                        type="number"
                                        onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>PRECIO</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.precio : ''}
                                        placeholder="S/.49.90"
                                        type="number"
                                        onChange={(e) => setIndice({ ...indice, precio: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>TALLA</FormLabel>
                                    <Select 
                                        placeholder="Selecciona una opción"
                                        defaultValue={indice ? indice.talla : ''}
                                        onChange={(e) => setIndice({ ...indice, talla: e.target.value })}
                                    >
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                        <option value="OTRO">OTRO</option>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack spacing={2} direction={{ base: "column", lg: "row"}} justifyContent="space-between">
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.img : ''}
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                        placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>CATEGORIA</FormLabel>
                                    <Stack direction="row" justifyContent="space-between" w="full">
                                        <Select
                                            defaultValue={indice.categoria !== null ? indice.categoria._id : ''}
                                            onChange={(e) => setIndice({ ...indice, categoria: e.target.value })}
                                        >
                                            { categorias.map((categoria) => (
                                                <option key={categoria._id} value={categoria._id}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                        <ModalAgregarCategoria />
                                    </Stack>
                                </FormControl>
                            </Stack>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN CORTA</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.descripcion : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                    rows={2}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CARACTERISTICAS</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.caracteristicas : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, caracteristicas: e.target.value })}
                                />
                            </FormControl>

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
                                            <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={indice ? indice.estado : false} colorScheme="purple" isChecked={indice.estado === true ? true : false} size='lg' />
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
