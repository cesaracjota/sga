import React, { useEffect } from 'react'
import { Badge, Box, HStack, Icon, IconButton, Stack, Tag, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { SpinnerComponent } from '../../../helpers/spinner';
import { customStyles } from '../../../helpers/customStyles';
// import { AlertEliminar } from './AlertEliminar';
// import { getUniformes, reset } from '../../features/uniformeSlice';
// import ModalDetallesUniforme from './ModalDetallesUniforme';
// import ModalAgregarUniforme from './ModalAgregarUniforme';
// import { getCategoriasUniforme } from '../../features/categoriaUniformeSlice';
// import { ModalEditarUniforme } from './ModalEditarUniforme';
import { getAllVentaUniformes, reset } from '../../../features/venta_uniformeSlice';
import { FaArrowLeft } from 'react-icons/fa';
import ModalRegistrarVentaUniforme from './ModalRegistrarVentaUniforme';
import { getUniformes } from '../../../features/uniformeSlice';
import { AlertEliminar } from './AlertEliminar';
import { CgEyeAlt } from 'react-icons/cg';
import ModalGenerarBoleta from './ModalGenerarBoleta';

const VentasUniforme = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { ventas_uniforme, isLoading, isError, message } = useSelector((state) => state.ventas_uniforme);

    const { uniformes } = useSelector((state) => state.uniformes);

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1000);
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getAllVentaUniformes());
        dispatch(getUniformes());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch]);

    const columns = [
        {
            name: 'CODIGO VENTA',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true
        },
        {
            name: 'NOMBRE ESTUDIANTE',
            selector: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            resizable: true,
            wrap: true
        },
        {
            name: 'MONTO PAGADO',
            selector: row => `S/ ${row.monto_pagado}`,
            sortable: true,
            cellExport: row => row.monto_pagado,
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
                        {`S/ ${row.monto_pagado}`}
                    </Badge>
                </div>
            )
        },
        {
            name: 'FECHA VENTA',
            selector: row => row.fecha_venta,
            sortable: true,
            cellExport: row => row.fecha_venta,
            resizable: true,
            center: true
        },
        {
            name: 'ESTADO',
            selector: row => row.estado,
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === 'CANCELADO' ? 'green' : 'red'}
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
            sortable: true,
            export: false,
            center: true,
            cell: row => (
                <div>
                    <ModalGenerarBoleta venta_uniforme={row} />
                    <Link to={{
                            pathname: '/ebr/uniformes/ventas/' + row._id
                        }}>
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
            width: '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: ventas_uniforme,
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
                        <Link to={'/ebr/uniformes'}>
                            <IconButton icon={<FaArrowLeft />} colorScheme="blue" rounded="full" />
                        </Link>
                        <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                    </HStack>
                    <HStack spacing={4} direction="row">
                        <Text fontSize="lg" fontWeight={'black'}>Gestión de Venta de Uniformes</Text>
                    </HStack>
                </Stack>
            </Box>
            <Box
                borderRadius="xs"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={4}
                _dark={{ bg: "primary.800" }}
            >
                <Stack spacing={4} direction="row" justifyContent="space-between" p={4}>
                    <HStack spacing={4} direction="row">
                        <ModalRegistrarVentaUniforme uniformes={ uniformes } />
                        {/* <ModalAgregarUniforme categorias = { categoria_uniformes } /> */}
                        
                    </HStack>
                    <HStack direction="row">
                        <Text fontSize="md" fontWeight={'black'}>Total de Ventas: </Text>
                        <Tag variant='solid' rounded={'full'} colorScheme='yellow' fontSize={'md'}>
                            {ventas_uniforme.length}
                        </Tag>
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
                    fileName={'VENTAS_UNIFORME' + new Date().toLocaleDateString()}
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

export default VentasUniforme;