import React from 'react'
import {
    Box,
    Flex,
    Icon,
    Image,
    Link,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddIcon } from '@chakra-ui/icons';
import { RiBook3Fill, RiComputerFill, RiHome5Fill, RiMapPin4Fill, RiUserStarFill } from 'react-icons/ri';
import { FaChalkboardTeacher, FaClipboardCheck, FaQuoteRight, FaUsers, FaVest } from 'react-icons/fa';
import { MdGrade, MdMonetizationOn, MdScience, MdSettings, MdTableChart } from 'react-icons/md';
import { FcPieChart } from 'react-icons/fc';

const NavItem = (props) => {

    const activeLinkcolor = useColorModeValue("white", "white");
    const bgActiveLinkColor = useColorModeValue("#ffffff1f", "#ffffff1f")

    const { icon, children, ...rest } = props;

    return (
        <Flex
            align="center"
            py="9px"
            cursor="pointer"
            _hover={{
                bg: bgActiveLinkColor,
                color: activeLinkcolor,
            }}
            role="group"
            fontWeight="semibold"
            transition=".5s ease"
            scrollMarginY={10}
            {...rest}
        >
            {icon && (
                <Icon
                    mx="2"
                    ml={{ base: "2", md: "4" }}
                    fontSize="xl"
                    _groupHover={{
                        color: activeLinkcolor,
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};


const SidebarContent = (props) => {

    const activeLinkcolor = "gray.50";
    const bgActiveLinkColor = "primary.700";

    const { user } = useSelector(state => state.auth);

    const listIcons = [
        {
            icon: RiHome5Fill,
            name: "RiHome5Fill",
        },
        {
            icon: FaUsers,
            name: "FaUsers",
        },
        {
            icon: RiUserStarFill,
            name: "RiUserStarFill",
        },
        {
            icon: FaChalkboardTeacher,
            name: "FaChalkboardTeacher",
        },
        {
            icon: MdMonetizationOn,
            name: "MdMonetizationOn",
        },
        {
            icon: RiComputerFill,
            name: "RiComputerFill",
        },
        {
            icon: RiBook3Fill,
            name: "RiBook3Fill",
        },
        {
            icon: MdTableChart,
            name: "MdTableChart",
        },
        {
            icon: FaVest,
            name: "FaVest",
        },
        {
            icon: FaClipboardCheck,
            name: "FaClipboardCheck",
        },
        {
            icon: MdGrade,
            name: "MdGrade",
        },
        {
            icon: FaQuoteRight,
            name: "FaQuoteRight",
        },
        {
            icon: MdSettings,
            name: "MdSettings",
        },
        {
            icon: RiMapPin4Fill,
            name: "RiMapPin4Fill",
        },
        {
            icon: MdScience,
            name: "MdScience",
        },
        {
            icon: FcPieChart,
            name: "FcPieChart",
        },
    ]

    function getIconosNames(name) {
        const icon = listIcons.find((item) => item.name === name);
        return icon.name;
    }

    function getIconIcons(icono) {
        const icon = listIcons.find((item) => item.name === icono);
        return icon.icon;
    }

    return (
        <>
            <Box
                as="nav"
                pos="fixed"
                top="0"
                left="0"
                zIndex="sticky"
                h="full"
                pb="10"
                overflowX="hidden"
                overflowY="auto"
                bg="primary.900"
                border
                color="#fffffff9"
                boxShadow="0px 3px 5px -1px rgba(0,0,0,.2),0px 5px 8px 0px rgba(0,0,0,.14),0px 1px 14px 0px rgba(0,0,0,.12)"
                w="240px"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: useColorModeValue('rgba(0,0,0,.3)', 'rgba(0,0,0,.4)'),
                        borderRadius: '24px',
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'rgba(0,0,0,.5)'
                    },
                    '&::-webkit-scrollbar-thumb:active': {
                        backgroundColor: 'rgba(0,0,0,.6)'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#d4d4d4',
                        borderRadius: '24px',
                    },
                    '&::-webkit-scrollbar-track:hover': {
                        background: '#d4d4d4',
                    },
                    '&::-webkit-scrollbar-track:active': {
                        background: '#d6d6d6',
                    },
                }}
                {...props}
            >
                <Flex px="2" py="14px" direction={'row'} alignItems="center" justifyContent="center" >
                    <Image src={'https://react-material.fusetheme.com/assets/images/logo/logo.svg'} w={"30px"} alt="logo Agyl" />
                    <Text fontWeight="bold" fontSize="2xl" marginLeft={3} textAlign="center">SGA</Text>
                </Flex>
                <Flex
                    direction="column"
                    as="nav"
                    fontSize="15px"
                    mx={0}
                    color="#ffffffa1"
                    aria-label="Main Navigation"
                    borderTopRadius={'3xl'}
                >
                    {user?.menu?.map((item, index) => (
                        <Link
                            key={index}
                            mb={'5px'}
                            as={NavLink}
                            to={item.path}
                            _activeLink={{
                                color: activeLinkcolor,
                                bg: bgActiveLinkColor,
                                borderRight: "4px solid #0063d1"
                            }}
                            _hover={{ textDecoration: 'none' }}
                        >
                            <NavItem icon={
                                item.icono === getIconosNames(item.icono) ? getIconIcons(item.icono) : AddIcon
                            }>{item.titulo}</NavItem>
                        </Link>
                    ))}
                </Flex>
            </Box>
        </>
    )
}

export default SidebarContent