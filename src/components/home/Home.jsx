import React, { useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chart2 from './Chart2';
import GraficoBar from './Bar';
// import VerticalComposedChart from './VerticalComposedChart';
// import CustomActiveShapePieChart from './CustomActiveShapePieChart';
// import CustomContentTooltip from './CustomContentTooltip';
import { getReportesCEBA, getReportesEBR, getReportesRESIDENCIA, reset } from '../../features/reporteSlice';
import { SpinnerComponent } from '../../helpers/spinner';
import { ToastChakra } from '../../helpers/toast';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'primary.900');

  const { user } = useSelector((state) => state.auth);
  
  const { reportesEBR, reportesCEBA, reportesRESIDENCIA, isLoading, isError, message } = useSelector((state) => state.reportes);

  useEffect(() => {

    if (!user) {
      navigate('/login');
    }else{
      navigate('/inicio');
    }

    if (!user.token) {
      navigate('/login');
    }else{
      navigate('/inicio');
    }

    dispatch(getReportesEBR());
    dispatch(getReportesCEBA());
    dispatch(getReportesRESIDENCIA());

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
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      mb={4}
    >
      <Stack spacing={4} w="full" direction={'column'}>
        <Box shadow="base" bg={bg} color="white" w="full" py={3} px={4}>
          <Heading fontWeight="bold" _light={{color: 'primary.900'}} fontSize={{ base: "sm", lg: "2xl" }} textAlign={'center'}>
            BIENVENIDA AL SISTEMA DE GESTIÓN ADMINISTRATIVA
          </Heading>
        </Box>
        <Box>
          <Stack
            w="full"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: "primary.800" }}
              w="full"
            >
              <Text fontSize={{ base: "xs", lg: "xl" }} fontWeight="bold" mb={4} textAlign={'center'}>Cantidad de estudiantes por genero de cada modalidad</Text>
              <GraficoBar
                reportesEBR={reportesEBR}
                reportesCEBA={reportesCEBA}
                reportesRESIDENCIA={reportesRESIDENCIA}
              />
            </Box>
            <Box
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: "primary.800" }}
              w="full"
            >
              <Text fontSize={{ base: "xs", lg: "xl" }} fontWeight="bold" mb={4} textAlign={'center'}>Monto recaudado anual / total</Text>
              <Chart2
                reportesEBR={reportesEBR}
                reportesCEBA={reportesCEBA}
                reportesRESIDENCIA={reportesRESIDENCIA}
              />
            </Box>
            {/* <Box
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: "primary.800" }}
              w="full"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>Grafica 1</Text>
              <VerticalComposedChart />
            </Box>
            <Box
              mt={2}
              p={4}
              boxShadow={'base'}
              bg="white"
              _dark={{ bg: "primary.800" }}
              w="full"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>Grafica 2</Text>
              <CustomActiveShapePieChart />
            </Box> */}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Home;