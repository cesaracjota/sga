import React, { useEffect } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportesCEBA, reset } from '../../../features/reporteSlice';
import { SpinnerComponent } from '../../../helpers/spinner';
import ReporteEstudiantes from './ResporteEstudiantes';
import ReportePagos from './ReportePagos';

const IndexReportesCEBA = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesCEBA, isLoading, message } = useSelector((state) => state.reportes);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        if (!user.token) {
            navigate('/login');
        }

        dispatch(getReportesCEBA());

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
                    <ReporteEstudiantes reportesCEBA={reportesCEBA} />
                </TabPanel>
                <TabPanel>
                    <ReportePagos reportesCEBA={reportesCEBA} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default IndexReportesCEBA;