import React, { useEffect } from 'react';
import {
    Avatar,
    Badge, 
    Box,
    Button,
    HStack, 
    Icon,
    IconButton,
    Stack,
    Text, 
    Tooltip, 
    useColorModeValue
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import { CgExport, CgEyeAlt } from 'react-icons/cg';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SpinnerComponent } from '../../../helpers/spinner';
import { customStyles } from '../../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getEstudiantes, reset } from '../../../features/estudiantes/EBR/estudianteSlice';
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { FaFileInvoice } from 'react-icons/fa';

const Estudiantes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { estudiantes, isLoading, isError, message } = useSelector((state) => state.estudiantes_ebr);

    useEffect(() => {
        
        if (!user) {
            navigate("/login");
        }

        if(isError) {
            console.log(message);
            ToastChakra('Error', message, 'error', 1000);
        }

        dispatch(getEstudiantes())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const columns = [
        {
            name: 'NOMBRES',
            selector: row => row.apellidos + ' ' + row.nombres,
            sortable: true,
            cellExport: row => row.apellidos + ' ' + row.nombres,
            resizable: true,
            cell : row => (
                <div>
                    <Stack spacing={2} direction="row">
                        <Avatar
                            size="sm" 
                            name={row.apellidos + ' ' + row.nombres}
                            src={row?.img}
                            fontWeight="bold"
                            fontSize="sm"
                            color="white"
                            display = {{ base: "none", lg: "flex"}}
                        />
                        <Text ml={2} fontSize="12px" alignSelf={"center"}>{row.apellidos + ' ' + row.nombres}</Text>
                    </Stack>
                </div>
            )
        },
        {
            name: 'DNI',
            selector: row => row.dni,
            sortable: true,
            cellExport: row => row.dni,
            resizable: true
        },
        {
            name: 'TURNO',
            selector: row => row.turno,
            sortable: true,
            cellExport: row => row.turno,
            resizable: true
        },
        {
            name: 'GRADO',
            selector: row => row.grado?.nombre,
            sortable: true,
            cellExport: row => row.grado?.nombre,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        bg={'red.600'}
                        variant="solid"
                        p={2}
                        textAlign="center"
                        rounded="full"
                        color="white"
                    >
                        {row.grado?.nombre}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado },
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        colorScheme={row.estado === 'ACTIVO' ? 'green' : row.estado === 'RETIRADO' ? 'blue' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        { row.estado }
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell : row => (
                <div>
                    <Link to={{
                            pathname: '/ebr/estudiantes/pagos/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Historial de Pagos' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<FaFileInvoice />}
                                    fontSize="2xl"
                                    colorScheme="yellow"
                                    variant={'ghost'}
                                />
                            </Tooltip>
                    </Link>
                    <Link to={{
                            pathname: '/ebr/estudiantes/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<CgEyeAlt />}
                                    fontSize="2xl"
                                    colorScheme="blue"
                                    variant={'ghost'}
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    <Link to={{
                            pathname: '/ebr/estudiantes/editar/' + row._id,
                            state: { row }
                        }}>
                            <Tooltip hasArrow label='Editar' placement='auto'>
                                <IconButton
                                    aria-label="Editar"
                                    colorScheme="blackAlpha" 
                                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                                    icon={<Icon as={VscEdit} fontSize="2xl" />}
                                    variant="ghost"
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '240px'
        }
    ]

    const tableData = {
        columns: columns,
        data: estudiantes,
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
            default: '#1e1e1e',
            hover: '#131516',
            active: '#131516'
        },
        context: {
            background: '#1e1e1e',
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
                                pathname : '/ebr/estudiantes/agregar'
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
                            {/* <IconButton colorScheme="red" _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.700" }}} aria-label='Eliminar' icon={<Icon as={MdDelete} fontSize="2xl" />} variant="solid" rounded="full" /> */}
                        </HStack>
                        <HStack spacing={4} direction="row">
                            <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" />
                            <IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.700" }}} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" />
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
                        filterPlaceholder="BUSCAR ESTUDIANTE"
                        numberOfColumns={7}
                        fileName={'ESTUDIANTES_EBR'}
                    >
                        <DataTable
                            defaultSortField = "nombre"
                            defaultSortAsc={false}
                            defaultSortOrder="desc"
                            pagination={true}
                            paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationRowsPerPageOptions={[5 ,10, 25, 50]}
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
                            noDataComponent={<Text mb={4} fontSize="lg">NO HAY REGISTROS</Text>}
                        />
                    </DataTableExtensions>
            </Box>
        </>
    )
}

export default Estudiantes;