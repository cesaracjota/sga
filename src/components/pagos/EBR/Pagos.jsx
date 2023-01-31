import React, { useEffect } from 'react';
import {
    Avatar,
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
// import Moment from 'moment';
import { MdFilterList } from 'react-icons/md';
import { CgExport, CgEyeAlt } from 'react-icons/cg';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SpinnerComponent } from '../../../helpers/spinner';
import { customStyles } from '../../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getAllPagos, reset } from '../../../features/pagos/EBR/pagoSlice';
import ModalRegistrarPago from './ModalRegistrarPago';
import ModalGenerarBoleta from './ModalGenerarBoleta';

const Pagos = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { pagos, isLoading, isError, message } = useSelector((state) => state.pagos_ebr);

    useEffect(() => {

        if (isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getAllPagos())

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
            name: 'ESTUDIANTE',
            selector: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            resizable: true,
            cell: row => (
                <div>
                    <Link
                        to={`/ebr/estudiantes/${row?.estudiante?._id}`}
                    >
                        <Stack spacing={1} direction="row" align={'center'}>
                            <Avatar
                                size="sm"
                                name={row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}
                                src={row?.estudiante?.img}
                                fontWeight="bold"
                                fontSize="sm"
                                color="white"
                                display={{ base: "none", lg: "flex" }}
                            />
                            <Text fontSize="12px" color={'blue.500'} _hover={{ color: 'blue.800' }}>{row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}</Text>
                        </Stack>
                    </Link>
                </div>
            ),
            width: '200px'
        },
        {
            name: 'MESES',
            selector: row => row.meses?.map(mes => mes).join(', '),
            sortable: true,
            cellExport: row => row.meses?.map(mes => mes).join(', '),
            resizable: true,
        },
        {
            name: 'AÑO',
            selector: row => row.anio,
            sortable: true,
            cellExport: row => row.anio,
            resizable: true
        },
        {
            name: 'MONTO PAGADO',
            selector: row => row.monto,
            sortable: true,
            cellExport: row => row.monto,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        bg={'messenger.600'}
                        variant="solid"
                        px={4}
                        py={2}
                        textAlign="center"
                        rounded="full"
                        color="white"
                    >
                        S/ {row.monto}
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
                        colorScheme={row.estado === 'PENDIENTE' ? 'red' : row.estado === 'INCOMPLETO' ? 'orange' : 'green'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell: row => (
                <div>
                    <ModalGenerarBoleta pago={row} />
                    <Link to={{
                        pathname: '/ebr/pagos/' + row._id
                    }}
                    >
                        <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                            <IconButton
                                aria-label="Ver"
                                icon={<CgEyeAlt />}
                                fontSize="2xl"
                                _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                                colorScheme="blue"
                                variant={'ghost'}
                            />
                        </Tooltip>
                    </Link>
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '220px'
        }
    ]

    const tableData = {
        columns: columns,
        data: pagos,
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
                        <ModalRegistrarPago />
                        {/* <ModalAgregarPersona /> */}
                        {/* <IconButton colorScheme="red" _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.700" }}} aria-label='Eliminar' icon={<Icon as={MdDelete} fontSize="2xl" />} variant="solid" rounded="full" /> */}
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" />
                        <IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.700" } }} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" />
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
                    fileName={'PAGO_EBR' + new Date().toLocaleDateString()}
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
                        noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Pagos;