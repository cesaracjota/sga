import React, { useEffect } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ReporteChartEBR from './ReporteEstudiantesEBR'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportesEBR, reset } from '../../../features/reporteSlice';
import { SpinnerComponent } from '../../../helpers/spinner';
import ReportePagos from './ReportePagos';
import PrestamoLibros from './PrestamoLibrosMapas';
import ReporteVentaUniformes from './ReporteVentaUniformes';
import { ToastChakra } from '../../../helpers/toast';

const IndexChartEBR = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesEBR, isLoading, message, isError } = useSelector((state) => state.reportes);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        if (!user.token) {
            navigate('/login');
        }

        dispatch(getReportesEBR());

        return () => {
            dispatch(reset());
        }

    }, [dispatch, navigate, user]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <Tabs isFitted variant='enclosed-colored' colorScheme='blue'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>ESTUDIANTES</Tab>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>PAGOS</Tab>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>LIBROS / MAPAS</Tab>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>VENTA UNIFORMES</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ReporteChartEBR reportesEBR={reportesEBR} />
                </TabPanel>
                <TabPanel>
                    <ReportePagos reportesEBR={reportesEBR} />
                </TabPanel>
                <TabPanel>
                    <PrestamoLibros reportesEBR={reportesEBR} />
                </TabPanel>
                <TabPanel>
                    <ReporteVentaUniformes reportesEBR={reportesEBR} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default IndexChartEBR