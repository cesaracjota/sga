import React from 'react';
import Dashboard from '../../components/layout/Dashboard';
import ReporteChartCEBA from '../../components/reportes/CEBA/IndexReportesCEBA';
import IndexChartEBR from '../../components/reportes/EBR/IndexReportesEBR';
import IndexReportesRESIDENCIA from '../../components/reportes/RESIDENCIA/IndexReportesRESIDENCIA';

export const ReportesEBRPage = () => {
    return ( <Dashboard componente={<IndexChartEBR />} /> )
}

export const ReportesCEBAPage = () => {
    return ( <Dashboard componente={<ReporteChartCEBA />} /> )
}

export const ReportesRESIDENCIAPage = () => {
    return ( <Dashboard componente={<IndexReportesRESIDENCIA />} /> )
}
