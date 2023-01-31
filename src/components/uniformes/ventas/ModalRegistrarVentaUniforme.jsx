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
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { registrarVenta } from '../../../features/venta_uniformeSlice';
import { RiRefreshLine } from 'react-icons/ri';
import { getEstudianteByDni } from '../../../features/estudiantes/EBR/estudianteSlice';
import { Search2Icon } from '@chakra-ui/icons';

import Select from "react-select";

const ModalRegistrarVentaUniforme = ({ uniformes }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        codigo: '',
        estudiante: '',
        uniforme: [
            {
                _id: null,
            }
        ],
        metodo_pago: '',
        descripcion: '',
        monto_pagado: '',
        estado: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [datosEstudiante, setDatosEstudiante] = useState({});
    const [dniEstudiante, setDniEstudiante] = useState('');
    const [totalPagar, setTotalPagar] = useState(0);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
        setDatosEstudiante({});
        setDniEstudiante('');
        setTotalPagar(0);
    }

    const handleSave = () => {
        dispatch(registrarVenta(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteByDni(dniEstudiante)).then((res) => {
            setIndice({ ...indice, estudiante: res.payload._id });
            setDatosEstudiante(res.payload);
        });
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

    const handleSelect = (data) => {

        setIndice({ ...indice, uniforme: data.map((item) => {
            return { _id: item.value._id }
        }) });

        setTotalPagar(data.map(item => item?.value?.precio).reduce((prev, curr) => prev + curr, 0));

    }

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
                Nuevo Registro de venta
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay />
                <ModalContent _dark={{ bg: "primary.900" }} borderRadius="none">
                    <ModalHeader textAlign="center">REGISTRAR NUEVA VENTA</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
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
                            </Stack>
                            <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>UNIFORME</FormLabel>
                                    <Select
                                        options={
                                            uniformes.map((uniforme) => (
                                                { value: uniforme, label: uniforme.articulo }
                                            ))
                                        }
                                        placeholder="Selecciona los uniformes"
                                        onChange={handleSelect}
                                        isSearchable={true}
                                        isMulti
                                    />
                                </FormControl>
                            </Stack>

                            <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>MONTO TOTAL</FormLabel>
                                    <Input
                                        placeholder="S/.100.00"
                                        type="number"
                                        onChange={(e) => setIndice({ ...indice, monto_pagado: e.target.value })}
                                    />
                                    {
                                        totalPagar === 0 ? null : <FormHelperText>
                                            El monto total a pagar es : <span style={{ color: 'blue', fontWeight: "bold" }}>S/.{totalPagar}</span>
                                        </FormHelperText>
                                    }
                                </FormControl>
                                <FormControl isRequired>
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
                                <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                <Textarea
                                    placeholder="Escribe la descripcion de la venta"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                />
                            </FormControl>

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
                                {
                                    indice.estado === 'INCOMPLETO' ? <FormHelperText>
                                        <span style={{ color: 'red', fontWeight: "bold" }}>*Especificar detalles en las observaciones</span>
                                    </FormHelperText> : null
                                }
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.observaciones : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    placeholder="Escribe las observaciones acerca del articulo"
                                    rows={2}
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter mt={-4}>
                        <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }} size="lg" mr={3} onClick={handleModalClose} borderRadius="none">
                            CANCELAR
                        </Button>
                        <Button
                            colorScheme="messenger"
                            _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                            size="lg"
                            mr={3}
                            onClick={handleSave}
                            disabled={indice.articulo === '' || indice.codigo === '' || indice.categoria === '' || indice.talla === ''}
                            borderRadius="none"
                        >
                            REGISTRAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalRegistrarVentaUniforme;