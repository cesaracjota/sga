import React, { useEffect } from 'react'
import { Badge, Box, Button, HStack, Icon, IconButton, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
// import { CgExport } from 'react-icons/cg';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SpinnerComponent } from '../../helpers/spinner';
import { customStyles } from '../../helpers/customStyles';
import { getActivos, reset } from '../../features/activoSlice';
import { AlertEliminar } from './AlertEliminar';
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { MdCategory } from 'react-icons/md';
import { CgEyeAlt } from 'react-icons/cg';
import moment from 'moment';

const Activos = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { activos, isLoading, isError, message } = useSelector((state) => state.activos);

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getActivos());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const columns = [
        {
            name: 'MODELO',
            selector: row => row.modelo,
            sortable: true,
            cellExport: row => row.modelo,
            resizable: true,
            wrap: true
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true,
            cellExport: row => row.marca,
            resizable: true,
            wrap: true
        },
        {
            name: 'TIPO',
            selector: row => row.tipo_activo?.nombre,
            sortable: true,
            cellExport: row => row.tipo_activo?.nombre,
            resizable: true,
            wrap: true
        },
        {
            name: 'CANTIDAD',
            selector: row => row.cantidad !== null ? row.cantidad : 0,
            sortable: true,
            cellExport: row => row.cantidad !== null ? row.cantidad : 0,
            resizable: true,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={'purple'}
                        variant="solid"
                        w={20}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.cantidad !== null ? row.cantidad : 0}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === 'activo' ? 'green' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell: row => (
                <div>
                    <Link to={{
                            pathname: '/ebr/equipos/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<CgEyeAlt />}
                                    fontSize="xl"
                                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                                    colorScheme="blue"
                                    variant="ghost"
                                />
                            </Tooltip>
                    </Link>

                    <Link to={{
                            pathname: '/ebr/equipos/editar/' + row._id,
                            state: { row }
                        }}>
                            <Tooltip hasArrow label='Editar' placement='auto'>
                                <IconButton
                                    aria-label="Editar"
                                    colorScheme="blackAlpha" 
                                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                                    icon={<Icon as={VscEdit}
                                    fontSize="2xl" />}
                                    variant="ghost"
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: activos,
    }

    createTheme('solarized', {
        text: {
            primary: '#FFF',
            secondary: '#FFF',
            tertiary: '#FFF',
            error: '#FFF',
            warning: '#FFF',
        },
        background: {
            default: '##131516',
            hover: '##131516',
            active: '##131516'
        },
        context: {
            background: '##131516',
            text: '#FFF',
        },
        divider: {
            default: '#FFF opacity 92%',
        },
    });

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <>
            <Box
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.800" }}
            >
                <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
                    <HStack spacing={4} direction="row">
                        <Link 
                            to={{
                                pathname : '/ebr/equipos/agregar'
                            }}
                        >
                            <Button
                                colorScheme="messenger"
                                _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.600" } }}
                                aria-label="Agregar"
                                leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
                                variant="solid"
                                rounded={'none'}
                            >
                                Nuevo Registro
                            </Button>
                        </Link>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Link
                            to={{
                                pathname : '/ebr/equipos/categorias'
                            }}
                        >
                            <Button
                                colorScheme="whatsapp" 
                                _dark={{ bg: "whatsapp.600", 
                                color: "white", _hover: { bg: "whatsapp.700" } }}
                                leftIcon={<Icon as={MdCategory} fontSize="2xl" />}
                                variant="solid"
                                rounded={'none'}
                            >
                                Gestionar Categorias
                            </Button>
                        </Link>
                        {/* <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" /> */}
                        {/* 8<IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.700" } }} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" /> */}
                    </HStack>
                </Stack>
            </Box>
            <Box
                borderRadius="xs"
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.800" }}
                mt={2}
                pt={2}
            >
                <DataTableExtensions
                    {...tableData}
                    print={false}
                    exportHeaders={true}
                    filterPlaceholder="BUSCAR"
                    numberOfColumns={7}
                    fileName={'EQUIPOS' + moment().format('DD-MM-YYYY')}
                >
                    <DataTable
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination={true}
                        paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationRowsPerPageOptions={[5, 10, 25, 50]}
                        paginationPerPage={10}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por pagina:',
                            rangeSeparatorText: 'de',
                            noRowsPerPage: false,
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }}
                        theme={themeTable}
                        customStyles={customStyles}
                        pointerOnHover={true}
                        responsive={true}
                        noDataComponent={<Text mb={4} fontSize="lg">NO HAY DATOS PARA MOSTRAR</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Activos;