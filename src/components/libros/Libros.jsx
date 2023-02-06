import React, { useEffect } from 'react'
import { Badge, Box, Button, HStack, Icon,IconButton,Stack,Text, useColorModeValue } from '@chakra-ui/react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getLibros, reset } from '../../features/libroSlice';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SpinnerComponent } from '../../helpers/spinner';
import { customStyles } from '../../helpers/customStyles';
import ModalAgregarLibro from './ModalAgregarLibro';
import ModalDetallesLibro from './ModalDetallesLibro';
import { AlertEliminar } from './AlertEliminarLibro';
import { ModalEditarLibro } from './ModalEditarLibro';
import { getGrados } from '../../features/gradoSlice';
import { RiContactsBookUploadFill } from 'react-icons/ri';

const Libros = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { libros, isLoading, isError, message } = useSelector((state) => state.libros);

    const { grados } = useSelector((state) => state.grados);

    
    useEffect(() => {
        
        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }
        
        dispatch(getLibros());
        dispatch(getGrados());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            resizable: true,
            wrap: true
        },
        {
            name: 'GRADO',
            selector: row => row.grado?.nombre,
            sortable: true,
            cellExport: row => row.grado?.nombre,
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
            selector: row => { return row.estado === true ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === true ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        colorScheme={row.estado === true ? 'green' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell : row => (
                <div>

                    <ModalDetallesLibro libro={row}/>
                    <ModalEditarLibro row={row} grados = { grados } />
                    <AlertEliminar row={row} /> 
                </div>
            ),
            width : '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: libros,
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
                            <ModalAgregarLibro grados = { grados } />
                        </HStack>
                        <HStack direction="row">
                            <Link
                                to={{
                                    pathname : '/ebr/libros/prestamos'
                                }}
                            >
                                <Button
                                    colorScheme="orange" 
                                    _dark={{ bg: "orange.600", color: "white", _hover: { bg: "orange.700" } }}
                                    rightIcon={<Icon as={RiContactsBookUploadFill} fontSize="2xl" />}
                                    variant="solid"
                                    rounded={'none'}
                                    display={{ base: 'none', lg: 'flex' }}
                                >
                                    Prestamos
                                </Button>
                            </Link>
                            <Link
                                to={{
                                    pathname : '/ebr/libros/prestamos'
                                }}
                            >
                                <IconButton
                                    colorScheme="orange" 
                                    _dark={{ bg: "orange.600", color: "white", _hover: { bg: "orange.700" } }}
                                    icon={<Icon as={RiContactsBookUploadFill} fontSize="2xl" />}
                                    variant="solid"
                                    rounded={'none'}
                                    display={{ base: 'flex', lg: 'none' }}

                                />
                            </Link>
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
                        fileName={'LIBROS'}
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

export default Libros;