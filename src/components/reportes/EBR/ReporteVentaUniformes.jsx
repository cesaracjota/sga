import React from 'react'
import Highcharts from 'highcharts'
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import BarChart from "highcharts-react-official";
import AreaChart from "highcharts-react-official";
import moment from 'moment';

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ReporteVentaUniformes = ({ reportesEBR }) => {

    const bgChart = useColorModeValue('white', '#1e1e1e');

    var ventaUniformes = [];

    if (reportesEBR?.venta_uniformes) {
        ventaUniformes = reportesEBR?.venta_uniformes[0];
    }

    const BarOptions = {
        chart: {
            backgroundColor: bgChart,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'bar',
        },
        title: {
            text: 'CANTIDAD DE VENTAS'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/uniformes/ventas">Más Detalles</a>'
        },
        xAxis: {
            categories: ['VENTAS POR ESTADO'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'VENTAS'
            }
        },
        series: [
            {
                name: 'CANCELADOS',
                data: [ventaUniformes?.pagos_cancelados],
                color: '#38a169'
            },
            {
                name: 'PENDIENTES',
                data: [ventaUniformes?.pagos_pendientes],
                color: '#e53e3e'
            },
            {
                name: 'INCOMPLETOS',
                data: [ventaUniformes?.pagos_incompletos],
                color: '#3182CE'
            },
            {
                name: 'TOTAL',
                data: [ventaUniformes?.cantidad_uniformes_vendidos],
                color: '#4a5568'
            },
        ],
        exporting: {
            showTable: false,
        },
    }

    const Barras = {
        chart: {
            backgroundColor: bgChart,
            responsive: true,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'METODOS DE PAGO UTILIZADOS'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/uniformes/ventas">Más Detalles</a>'
        },
        xAxis: {
            categories: ['METODOS DE PAGO'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'CANTIDAD DE VECES UTILIZADOS'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}<br/>'
        },
        plotOptions: {
            column: {
                stacking: 'number'
            }
        },
        series: [
            {
                name: 'EFECTIVO',
                data: [ventaUniformes?.pagos_efectivo],
                color: '#e53e3e'
            },
            {
                name: 'TARJETA DE CRÉDITO',
                data: [ventaUniformes?.pagos_tarjeta],
                color: '#3498db'
            },
            {
                name: 'TRANSFERENCIA BANCARIA',
                data: [ventaUniformes?.pagos_transferencia],
                color: '#34495e'
            },
            {
                name: 'YAPE',
                data: [ventaUniformes?.pagos_yape],
                color: '#7d3c98'
            },
            {
                name: 'DEPOSITO BANCARIO',
                data: [ventaUniformes?.pagos_deposito],
                color: '#d4ac0d'
            },
            {
                name: 'OTROS',
                data: [ventaUniformes?.pagos_otros],
                color: '#b03a2e'
            },
        ]
    }

    const AreaOptions = {
        chart: {
            backgroundColor: bgChart,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'area',
        },
        title: {
            text: 'VENTAS DE UNIFORMES'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/uniformes/ventas">Más Detalles</a>'
        },
        yAxis: {
            title: {
                text: 'VENTAS'
            }
        },
        series: [{
            name: 'VENTAS TOTALES Y PROMEDIO DE VENTAS',
            showInLegend: true,
            color: '#3498db',
            data: [{
                name: 'PROMEDIO DE VENTAS',
                y: ventaUniformes?.promedio_ventas_uniformes,
                color: '#e53e3e'
            },
            {
                name: 'VENTAS TOTALES',
                y: ventaUniformes?.total_venta_uniformes,
                color: '#3498db'
            }],
            type: "area",
        }],
        exporting: {
            showTable: false,
        },
    }

    return (
        <>
            <Stack spacing='40px' direction={"column"} w={'full'}>

                <Box height='100%' borderRadius="xs" boxShadow={'base'} py={4} bg="white" _dark={{ bg: "primary.800" }}>
                    <Text fontSize='xl' fontWeight='bold' textAlign='center'>FECHA DE LA ULTIMA VENTA</Text>
                    <Text fontSize='sm' textAlign='center'>{moment(ventaUniformes?.ultima_venta_uniforme).format("DD - MM - YYYY - HH:mm:ss A")}</Text>
                </Box>

                <Box height='100%' borderRadius="xs" boxShadow={'base'}>
                    <BarChart
                        highcharts={Highcharts}
                        options={BarOptions}
                    />
                </Box>
                <Box height='100%' borderRadius="xs" boxShadow={'base'}>
                    <BarChart
                        highcharts={Highcharts}
                        options={Barras}
                    />
                </Box>
                <Box height='100%' borderRadius="xs" boxShadow={'base'}>
                    <AreaChart
                        highcharts={Highcharts}
                        options={AreaOptions}
                    />
                </Box>

            </Stack>
        </>
    )

}

export default ReporteVentaUniformes;