import React, { useEffect } from 'react'
import { Badge, Box, Card, Divider, Image, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { getPersona, reset } from '../../features/personaSlice';
import { SpinnerComponent } from '../../helpers/spinner';

const DetallesPerfil = ({ usuario }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { persona, isLoading, isError, message } = useSelector((state) => state.personas);

    useEffect(() => {

        if(isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getPersona(usuario.uid))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch, usuario.uid]);

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <>
            <Box w="full" h="full">
                <Stack direction="column" spacing={4} justifyContent="stretch">
                    <Stack direction={"column"} spacing={4} justifyContent="center" minW={"420px"}>
                        <Image 
                            objectFit='cover' 
                            rounded={'full'} 
                            boxSize="200"
                            alignSelf={"center"}
                            name={persona?.nombre}
                            src={persona?.img}
                            alt={persona?.nombre}
                            border={'1px'}
                            borderColor="gray.200"
                            fallbackSrc='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        />
                    </Stack>
                    <Card w="full" h="full" p={6} borderRadius="none" _dark={{ bg: "primary.900" }}>
                        <Stack direction="column" spacing={4} justifyContent="stretch">
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ID: </Text>
                                <Text>{ persona?.uid }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>NOMBRES: </Text>
                                <Text>{ persona?.nombre }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>CORREO ELECTRÓNICO </Text>
                                <Text>{ persona?.correo }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ESTADO: </Text>
                                <Badge 
                                    colorScheme={persona?.estado === true ? 'green' : 'red'}
                                    variant="solid"
                                    w={24}
                                    textAlign="center"
                                    py={2}
                                    rounded="full"
                                >
                                    {persona?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                </Badge>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ROL: </Text>
                                <Badge
                                    bg={persona.rol === 'ADMIN_ROLE' ? 'messenger.600' : 'red.600'}
                                    variant="solid"
                                    w={36}
                                    textAlign="center"
                                    py={2}
                                    rounded="full"
                                    color="white"
                                >
                                    {persona.rol === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO'}
                                </Badge>
                            </Stack>
                            <Divider />
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </>
    )
}

export default DetallesPerfil