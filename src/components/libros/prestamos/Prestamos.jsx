import React, { useEffect } from 'react';
import {
    Badge, 
    Box,
    HStack, 
    Icon,
    IconButton,
    Stack,
    Text, 
    Tooltip, 
    useColorModeValue
} from '@chakra-ui/react';
import Moment from 'moment';
import { MdFilterList } from 'react-icons/md';
import { CgExport } from 'react-icons/cg';
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
import { getPrestamoLibros, reset} from '../../../features/prestamo_libroSlice';
import { FaArrowLeft } from 'react-icons/fa';
import DetallesPrestamo from './DetallesPrestamo';
import ModalRegistrarDevolucion from './ModalRegistroDevolucion';
import { VscAdd } from 'react-icons/vsc';

const PrestamoLibros = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { prestamo_libros, isLoading, isError, message } = useSelector((state) => state.prestamo_libros);

    useEffect(() => {

        if(isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getPrestamoLibros())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true
        },
        {
            name: 'LIBRO',
            selector: row => row?.libro?.titulo,
            sortable: true,
            cellExport: row => row?.libro?.titulo,
            resizable: true,
            wrap: true,
        },
        {
            name: 'PRESTADO A',
            selector: row => row.estudiante ? row.estudiante?.nombres + ' ' + row.estudiante?.apellidos : row.docente?.nombres + ' ' + row.docente?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante ? row.estudiante?.nombres + ' ' + row.estudiante?.apellidos : row.docente?.nombres + ' ' + row.docente?.apellidos,
            resizable: true,
            wrap: true,
        },
        {
            name: 'FECHA PRESTAMO',
            selector: row => Moment(row.fecha_prestamo).format('DD/MM/YYYY - hh:mm:ss A'),
            sortable: true,
            cellExport: row => Moment(row.fecha_prestamo).format('DD/MM/YYYY - hh:mm:ss A'),
            resizable: true,
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
                        colorScheme={ row?.estado === 'PRESTADO' ? 'green' : row?.estado === 'DEVUELTO' ? 'blue' : 'green' }
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        { row?.estado }
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            right: true,
            cell : row => (
                <div>
                    { row?.estado !== 'DEVUELTO' ? (
                            <ModalRegistrarDevolucion row = {row} />
                        ) : ( null ) }
                    <DetallesPrestamo libro_prestamo={row} />
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '220px'
        }
    ]

    const tableData = {
        columns: columns,
        data: prestamo_libros,
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
                        <Link to={'/ebr/libros'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Tabla de Prestamo de Libros</Text>
                    </HStack>
                </Stack>
            </Box>
            <Box
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={2}
                _dark={{ bg: "primary.800" }}
            >
                    <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
                        <HStack spacing={4} direction="row">
                            <Link to={'/ebr/libros/prestamos/agregar'}>
                                <Tooltip hasArrow label='Registrar nuevo prestamo' placement='auto'>
                                    <IconButton
                                        colorScheme="messenger"
                                        _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                                        aria-label="Agregar"
                                        icon={<Icon as={VscAdd} fontSize="2xl" />}
                                        variant="solid"
                                    />
                                </Tooltip>
                            </Link>
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
                        filterPlaceholder="BUSCAR"
                        numberOfColumns={7}
                        fileName={'PRESTAMO_DE_LIBROS'}
                    >
                        <DataTable
                            defaultSortField = "createdAt"
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
                            noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                        />
                    </DataTableExtensions>
            </Box>
        </>
    )
}

export default PrestamoLibros;