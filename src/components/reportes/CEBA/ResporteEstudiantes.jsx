import React from 'react'
import Highcharts from 'highcharts'
import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import BarChart from "highcharts-react-official";
import AreaChart from "highcharts-react-official";

require("highcharts/modules/exporting.js")(Highcharts);
require("highcharts/modules/export-data.js")(Highcharts);
require('highcharts/modules/histogram-bellcurve')(Highcharts);

const ReporteEstudiantes = ({ reportesCEBA }) => {

    const bgChart = useColorModeValue('white', '#1e1e1e');

    var data_estudiantesCEBA = [];

    if (reportesCEBA?.estudiantes) {
        data_estudiantesCEBA = reportesCEBA?.estudiantes[0];
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
            text: 'CANTIDAD DE ESTUDIANTES POR ESTADO'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/estudiantes">Más Detalles</a>'
        },
        xAxis: {
            categories: ['Estudiantes Por Estados'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad de Estudiantes'
            }
        },
        series: [
            {
                name: 'ACTIVOS',
                data: [data_estudiantesCEBA?.estado_activo],
                color: '#38a169'
            },
            {
                name: 'INACTIVOS',
                data: [data_estudiantesCEBA?.estado_inactivo],
                color: '#e53e3e'
            },
            {
                name: 'EGRESADOS',
                data: [data_estudiantesCEBA?.estado_egresado],
                color: '#3182CE'
            },
            {
                name: 'TOTAL',
                data: [data_estudiantesCEBA?.total_estudiantes],
                color: '#4a5568'
            },
        ],
        exporting: {
            showTable: false,
        },
    }

    const BarOptions2 = {
        chart: {
            backgroundColor: bgChart,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'bar',
        },
        title: {
            text: 'CANTIDAD DE ESTUDIANTES POR MODALIDAD'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/estudiantes">Más Detalles</a>'
        },
        xAxis: {
            categories: ['Estudiantes Por Modalidad'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad de Estudiantes'
            }
        },
        series: [
            {
                name: 'RESIDENCIA',
                data: [data_estudiantesCEBA?.estudiantes_residencia],
                color: '#38a169'
            },
            {
                name: 'EXTERNOS',
                data: [data_estudiantesCEBA?.estudiantes_externa],
                color: '#e53e3e'
            },
            {
                name: 'OTROS',
                data: [data_estudiantesCEBA?.estudiantes_otro],
                color: '#3182CE'
            },
            {
                name: 'TOTAL',
                data: [data_estudiantesCEBA?.total_estudiantes],
                color: '#4a5568'
            },
        ],
        exporting: {
            showTable: false,
        },
    }

    const PieOptions = {
        chart: {
            backgroundColor: bgChart,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'CANTIDAD ESTUDIANTES: <b>{point.y}</b><br/>'
        },
        title: {
            text: 'CANTIDAD DE ESTUDIANTES POR TURNO DE ESTUDIO'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/estudiantes">Más Detalles</a>'
        },
        xAxis: {
            categories: 'Estudiantes Por Turno',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 10,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            colorByPoint: true,
            showInLegend: true,
            data: [
                {
                    name: 'TURNO MAÑANA',
                    y: data_estudiantesCEBA?.turno_manana,
                    color: '#38a169'
                },
                {
                    name: 'TURNO TARDE',
                    y: data_estudiantesCEBA?.turno_tarde,
                    color: '#e53e3e'
                },
                {
                    name: 'TURNO NOCHE',
                    y: data_estudiantesCEBA?.turno_noche,
                    color: '#3182CE'
                }
            ]
        }],
        exporting: {
            showTable: false,
        },
    }

    const Barras = {
        chart: {
            backgroundColor: bgChart,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'column'
        },
        title: {
            text: 'ESTUDIANTES POR GENERO'
        },
        subtitle: {
            text: 'Source: <a href="/ebr/estudiantes">Más Detalles</a>'
        },
        xAxis: {
            categories: ['CANTIDAD DE ESTUDIANTES POR GENERO'],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'CANTIDAD DE ESTUDIANTES'
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
        series: [{
            name: 'FEMENINOS',
            data: [data_estudiantesCEBA?.estudiantes_residencia],
            color: '#e53e3e'
        },
        {
            name: 'MASCULINOS',
            data: [data_estudiantesCEBA?.estudiantes_residencia],
            color: '#38a169'
        }
        ]
    }

    return (
        <>
            <Stack spacing='40px' direction={"column"} w={'full'}>

                <Box height='100%' borderRadius="xs" boxShadow={'base'}>
                    <BarChart
                        highcharts={Highcharts}
                        options={BarOptions}
                    />
                </Box>

                <Box height='100%' borderRadius="xs" boxShadow={'base'}>
                    <BarChart
                        highcharts={Highcharts}
                        options={BarOptions2}
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
                        options={PieOptions}
                    />
                </Box>
            </Stack>
        </>
    )

}

export default ReporteEstudiantes;