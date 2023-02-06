import React from 'react';
import { Routes, Route } from "react-router-dom";
// import Dashboard from '../components/layout/Dashboard';
import HomeContent from '../pages/home';
import SettingsPage from '../pages/settings';
import PersonasPage from '../pages/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
// import RegisterPage from '../pages/auth/Register';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
// import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import LibrosPage from '../pages/libros';
import GradosPage from '../pages/grados';
import UniformesPage from '../pages/uniformes';
import CarpetasPage from '../pages/carpetas';
import { ActivosPage, AgregarActivoPage, DetallesActivosPage, EditarActivoPage } from '../pages/activos';
import MiPerfilPage from '../pages/perfil';
import { EstudiantesPage, EstudiantesPageAgregar, EstudiantesPageDetalles, EstudiantesPageEditar, EstudiantesPageHistorialPagos } from '../pages/estudiantes/EBR';
import CategoriasEquipoPage from '../pages/activos/categorias';
import { DocentesPage, DocentesPageDetalles, DocentesPageAgregar } from '../pages/docentes';
import CategoriasUniformePage from '../pages/uniformes/categorias';
import { PrestamoLibrosPage, PrestamoLibrosPageRegistro } from '../pages/libros/prestamos';
import { MapasPage, MapasPageAgregar } from '../pages/mapas';
import { LaboratoriosPage, LaboratoriosPageAgregar, LaboratoriosPageDetalles, LaboratoriosPageEditar } from '../pages/laboratorios';
import { VentasUniformePage, VentasUniformePageDetalles } from '../pages/uniformes/ventas';
import { EstudiantesCEBAPage, EstudiantesCEBAPageAgregar, EstudiantesCEBAPageDetalles, EstudiantesCEBAPageEditar, EstudiantesCEBAPageHistorialPagos } from '../pages/estudiantes/CEBA';
import { PrestamoMapasPage } from '../pages/mapas/prestamos';
import { PagosPage, PagosPageDetalles } from '../pages/pagos/EBR';
import { EstudiantesRESIDENCIAPage, EstudiantesRESIDENCIAPageAgregar, EstudiantesRESIDENCIAPageDetalles, EstudiantesRESIDENCIAPageEditar, EstudiantesRESIDENCIAPageHistorialPagos } from '../pages/estudiantes/RESIDENCIA';
import { PagosCEBAPage, PagosCEBAPageDetalles } from '../pages/pagos/CEBA';
import { PagosRESIDENCIAPage, PagosRESIDENCIAPageDetalles } from '../pages/pagos/RESIDENCIA';
import { ReportesCEBAPage, ReportesEBRPage, ReportesRESIDENCIAPage } from '../pages/reportes';

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />} >
                <Route path="/" element={<HomeContent />} />
                <Route path="/inicio" element={<HomeContent />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/profile' element={<MiPerfilPage />} />
                <Route path='/usuarios' element={<PersonasPage />} />
                <Route path="/grados" element={<GradosPage />} />

                {/* Routes EBR */}

                <Route path='/ebr/libros/' element={<LibrosPage />} />
                <Route path='/ebr/libros/prestamos' element={<PrestamoLibrosPage />} />
                <Route path='/ebr/libros/prestamos/agregar' element={<PrestamoLibrosPageRegistro />} />

                <Route path='/ebr/uniformes/' element={<UniformesPage />} />
                <Route path='/ebr/uniformes/ventas' element={<VentasUniformePage />} />
                <Route path='/ebr/uniformes/ventas/:id' element={<VentasUniformePageDetalles />} />

                <Route path='/ebr/inmobiliarios/' element={<CarpetasPage />} />
                
                <Route path='/ebr/equipos/' element={<ActivosPage />} />
                <Route path='/ebr/equipos/:id' element={<DetallesActivosPage />} />
                <Route path='/ebr/equipos/agregar' element={<AgregarActivoPage />} />
                <Route path='/ebr/equipos/editar/:id' element={<EditarActivoPage />} />
                <Route path='/ebr/equipos/categorias' element={<CategoriasEquipoPage />} />
                
                <Route path='/ebr/estudiantes/' element={<EstudiantesPage />} />
                <Route path='/ebr/estudiantes/agregar' element={<EstudiantesPageAgregar />} />
                <Route path='/ebr/estudiantes/:id' element={<EstudiantesPageDetalles />} />
                <Route path='/ebr/estudiantes/editar/:id' element={<EstudiantesPageEditar />} />
                <Route path='/ebr/estudiantes/pagos/:id' element={<EstudiantesPageHistorialPagos />} />


                <Route path='/ebr/docentes/' element={<DocentesPage />} />
                <Route path='/ebr/docentes/agregar' element={<DocentesPageAgregar />} />
                <Route path='/ebr/docentes/:id' element={<DocentesPageDetalles />} />
                
                <Route path='/ebr/uniformes/categorias' element={<CategoriasUniformePage />} />
                <Route path='/ebr/pagos/' element={<PagosPage />} />
                <Route path='/ebr/pagos/:id' element={<PagosPageDetalles />} />
                
                <Route path='/ebr/mapas/' element={<MapasPage />} />
                <Route path='/ebr/mapas/agregar' element={<MapasPageAgregar />} />
                <Route path='/ebr/mapas/prestamos' element={<PrestamoMapasPage />} />

                <Route path='/ebr/laboratorios' element={<LaboratoriosPage />} />
                <Route path='/ebr/laboratorios/agregar' element={<LaboratoriosPageAgregar />} />
                <Route path='/ebr/laboratorios/editar/:id' element={<LaboratoriosPageEditar />} />
                <Route path='/ebr/laboratorios/:id' element={<LaboratoriosPageDetalles />} />

                <Route path='/ebr/reportes' element={<ReportesEBRPage />} />

                {/* Routes CEBA */}

                <Route path='/ceba/estudiantes/' element={<EstudiantesCEBAPage />} />
                <Route path='/ceba/estudiantes/agregar' element={<EstudiantesCEBAPageAgregar />} />
                <Route path='/ceba/estudiantes/:id' element={<EstudiantesCEBAPageDetalles />} />
                <Route path='/ceba/estudiantes/editar/:id' element={<EstudiantesCEBAPageEditar />} />
                <Route path='/ceba/estudiantes/pagos/:id' element={<EstudiantesCEBAPageHistorialPagos />} />

                <Route path='/ceba/pagos/' element={<PagosCEBAPage />} />
                <Route path='/ceba/pagos/:id' element={<PagosCEBAPageDetalles />} />

                <Route path='/ceba/reportes' element={<ReportesCEBAPage />} />

                {/* Routes RESIDENCIA */}

                <Route path='/residencia/estudiantes/*' element={<EstudiantesRESIDENCIAPage />} />
                <Route path='/residencia/estudiantes/agregar' element={<EstudiantesRESIDENCIAPageAgregar />} />
                <Route path='/residencia/estudiantes/:id' element={<EstudiantesRESIDENCIAPageDetalles />} />
                <Route path='/residencia/estudiantes/editar/:id' element={<EstudiantesRESIDENCIAPageEditar />} />
                <Route path='/residencia/estudiantes/pagos/:id' element={<EstudiantesRESIDENCIAPageHistorialPagos />} />

                <Route path='/residencia/pagos/' element={<PagosRESIDENCIAPage />} />
                <Route path='/residencia/pagos/:id' element={<PagosRESIDENCIAPageDetalles />} />
                <Route path='/residencia/reportes' element={<ReportesRESIDENCIAPage />} />

            </Route>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}