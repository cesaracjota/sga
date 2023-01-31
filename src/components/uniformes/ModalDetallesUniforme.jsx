import React, { useState, useRef } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Button,
    Stack,
    Text,
    Divider,
    Badge,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    Tooltip,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { CgEyeAlt } from 'react-icons/cg';

const ModalDetallesUniforme = ({ uniforme }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const btnRef = useRef();

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                <IconButton
                    aria-label="Ver"
                    icon={<CgEyeAlt />}
                    fontSize="xl"
                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                    colorScheme="blue"
                    variant={'ghost'}
                    onClick={handleOpenDrawer}
                />
            </Tooltip>
            <Drawer
                isOpen={isOpenDrawer}
                placement='left'
                onClose={handleCloseDrawer}
                finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent _dark={{ bg: "primary.800" }}>
                    <DrawerHeader fontWeight="bold" bg="blue.600" color="gray.200" textAlign="center">INFORMACIÓN BÁSICA DEL ARTICULO SELECCIONADO</DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" mt={6}>
                            <Stack direction={{ base: "column", lg: "row" }} w="full" justifyContent="stretch" spacing={6}>
                                <Image objectFit='cover' src={uniforme.img} fallbackSrc='https://via.placeholder.com/300x450?text=Artículo+sin+imagen' alt={uniforme?.nombre} maxH={'360px'} maxW={'300px'} minW="250px" alignSelf={'center'} />
                                <Stack direction="column" mt={6} spacing={2} w="full">
                                    <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>CODIGO:</Text>
                                        <Text>{uniforme?.codigo}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>NOMBRE</Text>
                                        <Text>{uniforme?.articulo}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">PRECIO: </Text>
                                        <Badge
                                            colorScheme={'yellow'}
                                            variant="solid"
                                            px={6}
                                            py={1.5}
                                            rounded="full"
                                        >
                                            S/ {uniforme?.precio !== null ? uniforme?.precio : 0}
                                        </Badge>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold" mr={2}>TALLA:</Text>
                                        <Text>{uniforme?.talla}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">FECHA CREADA:</Text>
                                        <Text>{Moment(uniforme?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">CATEGORIA: </Text>
                                        <Badge
                                            colorScheme={'red'}
                                            variant="solid"
                                            px={6}
                                            py={1.5}
                                            rounded="full"
                                        >
                                            {uniforme?.categoria !== null ? uniforme?.categoria?.nombre : ''}
                                        </Badge>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">CANTIDAD EN STOCK: </Text>
                                        <Badge
                                            colorScheme={'purple'}
                                            variant="solid"
                                            px={6}
                                            py={1.5}
                                            rounded="full"
                                        >
                                            {uniforme?.cantidad !== null ? uniforme?.cantidad : 0}
                                        </Badge>
                                    </Stack>
                                    <Divider />
                                    <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                        <Text fontWeight="bold">ESTADO:</Text>
                                        <Badge
                                            colorScheme={uniforme?.estado === true ? 'green' : 'red'}
                                            variant="solid"
                                            px={6}
                                            py={1.5}
                                            rounded="full"
                                        >
                                            {uniforme?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                        </Badge>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Divider />


                            <Accordion allowMultiple defaultIndex={[0]}>
                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <Text fontWeight="bold" alignSelf={'center'}>DESCRIPCIÓN</Text>
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='14px' />
                                                    ) : (
                                                        <AddIcon fontSize='14px' />
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {uniforme?.descripcion}
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>
                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <Text fontWeight="bold" alignSelf={'center'}>CARACTERISTICAS</Text>
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='14px' />
                                                    ) : (
                                                        <AddIcon fontSize='14px' />
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {uniforme?.caracteristicas}
                                            </AccordionPanel>

                                        </>
                                    )}
                                </AccordionItem>
                                <AccordionItem>
                                    {({ isExpanded }) => (
                                        <>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as="span" flex='1' textAlign='left'>
                                                        <Text fontWeight="bold" alignSelf={'center'}>OBSERVACIONES</Text>
                                                    </Box>
                                                    {isExpanded ? (
                                                        <MinusIcon fontSize='14px' />
                                                    ) : (
                                                        <AddIcon fontSize='14px' />
                                                    )}
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {uniforme?.observaciones}
                                            </AccordionPanel>

                                        </>
                                    )}
                                </AccordionItem>
                            </Accordion>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button colorScheme="blue" _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.700" } }} size="lg" onClick={handleCloseDrawer} borderRadius="none">
                            OK
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ModalDetallesUniforme;