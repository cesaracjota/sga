import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import categoriaReducer from "../features/categoriaSlice";
import fraseReducer from "../features/fraseSlice";
import personaReducer from "../features/personaSlice";
import libroReducer from "../features/libroSlice";
import gradoReducer from "../features/gradoSlice";
import modalidadReducer from "../features/modalidadSlice";
import uniformeReducer from "../features/uniformeSlice";
import categoriaUniformeReducer from "../features/categoriaUniformeSlice";
import inmobiliarioReducer from "../features/inmobiliarioSlice";
import activoReducer from "../features/activoSlice";
import tipoActivoReducer from "../features/tipoActivoSlice";
import estudiante_ebrReducer from "../features/estudiantes/EBR/estudianteSlice";
import estudiante_cebaReducer from "../features/estudiantes/CEBA/estudianteSlice";
import estudiante_residenciaReducer from "../features/estudiantes/RESIDENCIA/estudianteSlice";
import docenteReducer from "../features/docenteSlice";
import prestamoLibroReducer from "../features/prestamo_libroSlice";
import mapaReducer from "../features/mapaSlice";
import laboratorioReducer from "../features/laboratorioSlice";
import venta_uniformeReducer from "../features/venta_uniformeSlice";
import prestamoMapaReducer from "../features/prestamo_mapaSlice";
import pago_ebrReducer from "../features/pagos/EBR/pagoSlice";
import pago_cebaReducer from "../features/pagos/CEBA/pagoSlice";
import pago_residenciaReducer from "../features/pagos/RESIDENCIA/pagoSlice";
import reporteReducer from "../features/reporteSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categorias: categoriaReducer,
        frases: fraseReducer,
        personas : personaReducer,
        libros: libroReducer,
        grados: gradoReducer,
        modalidades: modalidadReducer,
        uniformes: uniformeReducer,
        categoria_uniformes: categoriaUniformeReducer,
        inmobiliarios: inmobiliarioReducer,
        activos: activoReducer,
        tipo_activos: tipoActivoReducer,
        estudiantes_ebr: estudiante_ebrReducer,
        estudiantes_ceba: estudiante_cebaReducer,
        estudiantes_residencia: estudiante_residenciaReducer,
        pagos_ebr: pago_ebrReducer,
        pagos_ceba: pago_cebaReducer,
        pagos_residencia: pago_residenciaReducer,
        docentes: docenteReducer,
        prestamo_libros: prestamoLibroReducer,
        mapas: mapaReducer,
        laboratorios: laboratorioReducer,
        ventas_uniforme: venta_uniformeReducer,
        prestamo_mapas: prestamoMapaReducer,
        reportes: reporteReducer,
    },
})