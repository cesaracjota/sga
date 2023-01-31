import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    HStack,
    Flex,
    Image,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import {  useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import bgCardAuth from '../../assets/img/bgAuth.webp';
import bgAuth from '../../assets/img/lineas-fondo-auth.png';
import { FaRegUser } from 'react-icons/fa';

const ForgotPasswordPage = () => {

    const [correo, setCorreo] = useState('');
    const { isLoading } = useSelector(state => state.auth);

    const handleResetPassword = () => {
        if (!correo) {
            ToastChakra('Atención', 'Ingrese su correo', 'error', 1500, 'top-right');
        } else {
            ToastChakra('Atención', 'Se ha enviado un correo para restablecer su contraseña', 'success', 1500, 'top-right');
        }
    }

    const content = (isLoading) ? (
        <Center h={'100vh'} w={'full'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="xl" fontWeight="bold">
                    {' '}
                    Iniciando Sesión ...{' '}
                </Text>
                <Spinner
                    thickness="4px"
                    speed="0.5s"
                    emptyColor="gray.200"
                    color="purple.500"
                    size="xl"
                />
            </Stack>
        </Center>
    ) : (
        <HStack spacing={2} w={'full'} h={'100vh'} bgImage={bgAuth} px={{ base: 4, lg: 28}} py={{base: 14, lg: 20}}>
            <Flex w="full" h="full" display={{ base: 'none', lg: 'flex'}}>
                <Box justifyContent="center" w="full">
                        <Image
                            objectFit={'cover'}
                            w={'full'}
                            h={'full'}
                            src={bgCardAuth}
                            rounded={'lg'}
                        />
                </Box>
            </Flex>
            <Flex w="full" h="full">
                <Box borderWidth={1} w="full" h="full" px={{ base : 8, lg: 10}} mr={2} bg="white" _dark={{ bg: 'primary.900'}} alignItems={'center'} justifyContent={'center'} borderRadius="lg" boxShadow={'base'}>
                    <Stack w="full" h="full" spacing={4} alignItems="center" justifyContent="center">
                        <Image src="https://react-material.fusetheme.com/assets/images/logo/logo.svg" w={16} />
                        <Heading textAlign={'center'} fontSize="xl" fontWeight="bold" mt={2}>
                            Sistema de Administración de una API
                        </Heading>
                        <FormControl id="email">
                            <FormLabel mt={4}>Correo Electrónico</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.500"
                                    _dark={{ color: 'gray.400' }}
                                    children={ <FaRegUser color="gray.500" fontSize={18} /> }
                                />
                                <Input
                                    type="email"
                                    placeholder='Ingrese su correo electrónico'
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <Button
                                w="full"
                                colorScheme={'messenger'}
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }}
                                onClick={handleResetPassword}
                            >
                                Enviar
                            </Button>
                        </FormControl>
                        <NavLink to="/login">
                            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400'}}>
                                Regresar a login
                            </Text>
                        </NavLink>
                    </Stack>
                </Box>
            </Flex>
        </HStack>
    );

    return content;
};

export default ForgotPasswordPage;