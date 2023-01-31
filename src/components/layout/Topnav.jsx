import React, { useEffect } from 'react'
import {
    Avatar,
    Box,
    Center,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'
import { RiMenu4Fill } from 'react-icons/ri';
import { MdNotifications } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import SidebarContent from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/authSlice';
import { getPersona } from '../../features/personaSlice';

const Topnav = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);

    const { persona } = useSelector((state) => state.personas);

    useEffect(() => {

        dispatch(getPersona(user?.usuario?.uid))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    const ROL = {
        ADMIN: 'ADMIN_ROLE',
        USER: 'USER_ROLE',
    }

    const handleLogout = () => {
        dispatch(logout());
        setTimeout(() => {
            navigate('/login');
            dispatch(reset());
        }, 2000);
    }

    return (
        <>
        <Box>
            <Flex
                as="header"
                pos={{ base: "fixed", md: "fixed" }}
                zIndex="2"
                top="0"
                align="space-between"
                px="4"
                w="full"
                py={2}
                bg="white"
                _dark={{ bg: "#1e1e1e", boxShadow:"0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)" }}
                boxShadow="0 3px 6px -1px rgba(0,0,0,.1)"
            >
                <Drawer
                    isOpen={props.isOpen}
                    onClose={props.onClose}
                    placement="left"
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <SidebarContent w="full" borderRight="none" />
                    </DrawerContent>
                </Drawer>
                <IconButton
                    aria-label="Menu"
                    display={{ base: "flex", lg: "none" }}
                    onClick={props.onOpen}
                    fontSize="2xl"
                    variant="ghost"
                    icon={<RiMenu4Fill />}
                    size="lg"
                />
                <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} justifyContent={{base: "flex-end", lg: "space-between"}} w={'full'} display="inline-flex">
                    <HStack display={{ base: "none", lg: "flex"}} ml = { 242 }>
                        <Text fontWeight="black" fontSize="2xl" marginLeft={4} textAlign="center">
                            SISTEMA DE GESTIÓN ADMINISTRATIVA - <Text as="span" fontWeight={'black'} color="messenger.600">{user?.usuario?.modalidad}</Text>
                        </Text>
                    </HStack>
                    <HStack>
                        <IconButton
                            size="lg"
                            aria-label={'Notificaciones'}
                            marginLeft="2"
                            fontSize="xl"
                            variant={'ghost'}
                            rounded={'full'}
                            colorScheme="gray"
                            icon={<MdNotifications />} 
                        />
                        <ColorModeSwitcher />
                        <Menu>
                            <MenuButton>
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    w="full"
                                    rounded="md"
                                    cursor="pointer"
                                >
                                    <VStack
                                        display='none'
                                        alignItems="flex-start"
                                        spacing="1px"
                                    >
                                        <Text fontSize="12px" fontWeight={'bold'} textTransform={'uppercase'}>{user?.usuario?.nombre}</Text>
                                        <Text fontSize="10px" color="gray.700" _dark={{ color: "gray.300"}} textAlign="center">
                                            {user?.usuario?.rol === ROL.ADMIN ? 'ADMINISTRADOR' : 'SUB ADMINISTRADOR'}
                                        </Text>
                                    </VStack>
                                    <Image
                                        src={ persona?.img }
                                        alt="avatar"
                                        objectFit='cover'
                                        w="10"
                                        h="10"
                                        rounded="full"
                                        fallbackSrc='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                                    />
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'primary.800')}
                                borderColor={useColorModeValue('gray.200', 'primary.700')}
                                alignItems={'center'}
                                bgSize={'md'}
                                zIndex="50"
                            >
                                <Center>
                                    <Avatar
                                        mt={1}
                                        size={'lg'}
                                        color={'white'}
                                        fontWeight={'black'}
                                        bg={'messenger.500'}
                                        name={persona?.nombre}
                                        src={persona?.img}
                                        boxShadow={'base'}
                                    />
                                </Center>
                                <Center>
                                    <VStack mt="2">
                                        <Text fontSize="sm" mx={8} fontWeight="bold" textTransform={'uppercase'}>{persona.nombre}</Text>
                                        <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>{persona.correo}</Text>
                                        <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>{user?.usuario?.rol === ROL.ADMIN ? 'ADMINISTRADOR' : 'USUARIO'}</Text>
                                        <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.400" }}>{user?.usuario?.modalidad}</Text>
                                    </VStack>
                                </Center>
                                <MenuDivider />
                                <Link as={NavLink} to={'/profile'}_hover={{ textDecoration: 'none' }}>
                                    <MenuItem icon={<FaUserCircle size={20} />}  _dark={{ bg: 'primary.800', _hover: { bg: 'primary.700'} }}>Mi Perfil</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem icon={<AiFillSetting size={20} />} _dark={{ bg: 'primary.800', _hover: { bg: 'primary.700'} }} mr={10}>Configuraciones</MenuItem>
                                <MenuDivider />
                                <MenuItem icon={<FiLogOut size={20} />} onClick={handleLogout}  _dark={{ bg: 'primary.800', _hover: { bg: 'primary.700'} }}>Cerrar Sesión</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>
            </Flex>
        </Box>
        </>
    )
}

export default Topnav