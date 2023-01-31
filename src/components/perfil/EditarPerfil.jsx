import { Box, Button, Card, FormControl, FormLabel, Image, Input, Icon, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { SpinnerComponent } from '../../helpers/spinner';
import { getPersona, reset, updatePersona } from '../../features/personaSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const EditarPerfil = ({ usuario }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { isLoading, isError, message } = useSelector((state) => state.personas);

    const initialValues = {
        uid: null,
        nombre: '',
        correo: '',
        password: '',
        img: '',
    }

    const [indice, setIndice] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    useEffect(() => {

        if(isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getPersona(usuario.uid)).then((res) => {
            setIndice(res.payload)
        });

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch, usuario.uid]);

    const handleUpdate = () => {
        dispatch(updatePersona(indice)).then(() => {
            navigate("/profile");
            window.location.reload();
        });
        setIndice(initialValues);
    }

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <Box w="full" h="full">
            <Stack direction="column" spacing={4} justifyContent="stretch">

                <Stack direction={"column"} spacing={4} justifyContent="center" minW={"420px"}>

                    <Image 
                        objectFit='cover'
                        rounded={'full'}
                        boxSize="200"
                        alignSelf="center"
                        name="Segun Adebayo"
                        src={indice?.img} 
                        border={'1px'}
                        borderColor="gray.200"
                        fallbackSrc='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    />

                    <Input 
                        type="text"
                        placeholder="https://usuario/perfil.png"
                        value={indice?.img}
                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                    />

                </Stack>

                <Card w="full" h="full" p={6} borderRadius="none" _dark={{ bg: "primary.900" }}>
                    <Stack direction="column" spacing={4} justifyContent="stretch">
                        <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input 
                                    type="text" 
                                    placeholder="Nombre"
                                    defaultValue={indice?.nombre}
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Correo Electronico</FormLabel>
                                <Input 
                                    type="email" 
                                    placeholder="Email"
                                    defaultValue={indice?.correo}
                                    onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Contraseña Nueva</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        placeholder='Ingrese su contraseña nueva'
                                        autoComplete='off'
                                        value={initialValues.password}
                                        onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                    />
                                    <InputRightElement width="3rem">
                                    <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                        {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" spacing={4}>
                            <Button 
                                colorScheme="blue" 
                                alignSelf={'end'}
                                onClick={handleUpdate}
                            >
                                Guardar Cambios
                            </Button>
                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}

export default EditarPerfil