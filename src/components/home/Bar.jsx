import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class GraficoBar extends PureComponent {

    render() {
        
        const { reportesEBR, reportesCEBA, reportesRESIDENCIA } = this.props;

        var data = [];

        if(reportesEBR.estudiantes && reportesCEBA.estudiantes && reportesRESIDENCIA.estudiantes){
            data = [
                {
                    name: 'ESTUDIANTES EBR',
                    femenino: reportesEBR?.estudiantes[0]?.estudiantes_femeninos,
                    masculino: reportesEBR?.estudiantes[0]?.estudiantes_masculinos,
                    total: reportesEBR?.estudiantes[0]?.total_estudiantes,
                },
                {
                    name: 'ESTUDIANTES CEBA',
                    femenino: reportesCEBA?.estudiantes[0]?.estudiantes_femeninos,
                    masculino: reportesCEBA?.estudiantes[0]?.estudiantes_masculinos,
                    total: reportesCEBA.estudiantes[0].total_estudiantes,
                },
                {
                    name: 'ESTUDIANTES RESIDENCIA',
                    femenino: reportesRESIDENCIA?.estudiantes[0]?.estudiantes_femeninos,
                    masculino: reportesRESIDENCIA?.estudiantes[0]?.estudiantes_masculinos,
                    total: reportesRESIDENCIA?.estudiantes[0]?.total_estudiantes,
                },
            ];
        }

        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="10 10" />

                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ color: 'black' }}/>
                    <Legend />
                    <Bar dataKey="masculino" fill="#8884d8" />
                    <Bar dataKey="femenino" fill="#82ca9d" />
                    <Bar dataKey="total" fill="gray" />
                    <Cell fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}