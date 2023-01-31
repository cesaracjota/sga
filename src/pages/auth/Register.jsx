import React, { useState, useEffect } from 'react';
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
    useToast,
    HStack,
    Flex,
    Icon,
    Image,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/authSlice';
import { ToastChakra } from '../../helpers/toast';
import bgCardAuth from '../../assets/img/bgAuth.webp';
import bgAuth from '../../assets/img/lineas-fondo-auth.png';
import { FaRegUser } from 'react-icons/fa';
import { FiLock, FiMail } from 'react-icons/fi';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const RegisterPage = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        state => state.auth
    );
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        if (isSuccess || user) {
            navigate('/inicio');
            ToastChakra('Bienvenido', message, 'success', 1500, 'top-right');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch, toast]);

    const handleRegister = (e) => {
        e.isDefaultPrevented();
        try {
            const userData = {
                nombre,
                correo,
                password,
            };
            dispatch(register(userData));
        } catch (err) {
            ToastChakra('Error', err, 'error', 2000, 'top-right');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    const content = isLoading ? (
        <Center h={'100vh'} w={'full'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="xl" fontWeight="bold">
                    {' '}
                    Registrando Datos ...{' '}
                </Text>
                <Spinner
                    thickness="4px"
                    speed="0.5s"
                    emptyColor="gray.200"
                    color="messenger.500"
                    size="xl"
                />
            </Stack>
        </Center>
    ) : (
        <form onSubmit={handleRegister}>
            <HStack spacing={2} w={'full'} h={'100vh'} bgImage={bgAuth} px={{ base: 4, lg: 28 }} py={{ base: 14, lg: 20 }}>
                <Flex w="full" h="full" display={{ base: 'none', lg: 'flex' }}>
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
                    <Box borderWidth={1} w="full" h="full" px={{ base: 8, lg: 10 }} mr={2} bg="white" _dark={{ bg: 'primary.900' }} alignItems={'center'} justifyContent={'center'} borderRadius="lg" boxShadow={'base'}>
                        <Stack w="full" h="full" spacing={2} alignItems="center" justifyContent="center">
                            <Image src="https://react-material.fusetheme.com/assets/images/logo/logo.svg" w={16} />
                            <Heading textAlign={'center'} fontSize="xl" fontWeight="bold" mt={2}>
                                Sistema de Administración de una API
                            </Heading>
                            <FormControl id="name">
                                <FormLabel>Nombre</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        _dark={{ color: 'gray.400' }}
                                        children={<FaRegUser color="gray.500" fontSize={18}/>}
                                    />
                                    <Input
                                        type="text"
                                        value={nombre}
                                        placeholder="Ingrese el nombre completo"
                                        onChange={e => setNombre(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Correo</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        _dark={{ color: 'gray.400' }}
                                        children={<FiMail color="gray.500" fontSize={20}/>}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Ingrese el correo electrónico"
                                        onChange={e => setCorreo(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.500"
                                        _dark={{ color: 'gray.400' }}
                                        children={<FiLock color="gray.500" fontSize={20}/>}
                                    />
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        placeholder="Ingrese el password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <InputRightElement width="3rem">
                                        <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                            {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <Button
                                    mt={4}
                                    w="full"
                                    colorScheme={'messenger'}
                                    _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }}
                                    type="submit"
                                    disabled={(nombre === '' && correo === '') || (password === '')}
                                >
                                    Registrarse
                                </Button>
                            </FormControl>
                            <NavLink to="/login">
                                <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
                                    ¿Ya tiene una cuenta? Iniciar sesión
                                </Text>
                            </NavLink>
                        </Stack>
                    </Box>
                </Flex>
            </HStack>
        </form>
    );

    return content;
};

export default RegisterPage;
