import React, { useEffect } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportesRESIDENCIA, reset } from '../../../features/reporteSlice';
import { SpinnerComponent } from '../../../helpers/spinner';
import ReporteEstudiantes from './ResporteEstudiantes';
import ReportePagos from './ReportePagos';

const IndexReportesRESIDENCIA = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesRESIDENCIA, isLoading, message } = useSelector((state) => state.reportes);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        if (!user.token) {
            navigate('/login');
        }

        dispatch(getReportesRESIDENCIA());

        return () => {
            dispatch(reset());
        }

    }, [dispatch, message, navigate, user]);

    if (isLoading) {
        return <SpinnerComponent />
    }

    return (
        <Tabs isFitted variant='enclosed-colored' colorScheme='blue'>
            <TabList>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>ESTUDIANTES</Tab>
                <Tab _selected={{ color: 'white', bg: 'messenger.500' }}>PAGOS</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <ReporteEstudiantes reportesRESIDENCIA={reportesRESIDENCIA} />
                </TabPanel>
                <TabPanel>
                    <ReportePagos reportesRESIDENCIA={reportesRESIDENCIA} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default IndexReportesRESIDENCIA;