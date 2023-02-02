import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {

    render() {
        const { reportesEBR, reportesCEBA, reportesRESIDENCIA } = this.props;

        var data = [];

        if(reportesEBR.pagos && reportesCEBA.pagos && reportesRESIDENCIA.pagos){

            data = [
                {
                    name: 'MODALIDAD EBR',
                    total_pagos_año_actual: reportesEBR.pagos[0]?.monto_total_pagos_por_anio,
                    total_pagos: reportesEBR.pagos[0]?.monto_total_pagos,
                },
                {
                    name: 'MODALIDAD CEBA',
                    total_pagos_año_actual: reportesCEBA.pagos[0]?.monto_total_pagos_por_anio,
                    total_pagos: reportesCEBA.pagos[0]?.monto_total_pagos,
                },
                {
                    name: 'MODALIDAD RESIDENCIA',
                    total_pagos_año_actual: reportesRESIDENCIA.pagos[0]?.monto_total_pagos_por_anio,
                    total_pagos: reportesRESIDENCIA.pagos[0]?.monto_total_pagos,
                },
            ];
        }

        return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={data}
                >
                    <CartesianGrid strokeDasharray="10 10" />

                    <XAxis dataKey="name" />

                    <YAxis />
                    <Tooltip 
                        contentStyle={{ color: 'black' }}
                        formatter={(value, name, props) => {
                            return [value, name];
                        }}
                        shared
                    />
                    <Legend />
                    <Line type="monotone" dataKey="total_pagos_año_actual" stroke="#8884d8" />
                    <Line type="monotone" dataKey="total_pagos" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    {/* <Cell fill="#8884d8" /> */}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}