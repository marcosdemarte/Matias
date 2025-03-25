import React from 'react';
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const Test1 = () => {
    /*
    
        const myData1 = [9, -1, 4, -1, -1, 28]; // Datos de octubre (positivos)
        const myData2 = [-10, 2, -3, 4, 2, -25]; // Datos de septiembre (negativos)
    
        const data = {
            labels: ['Espalda y Pecho', 'Bíceps', 'Cintura', 'Cadera y Cola', 'Cuadriceps', 'Gemelos'],
            datasets: [
                {
                    label: 'Septiembre 2024',
                    data: myData2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Octubre 2024',
                    data: myData1,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };
    
        const options = {
            layout: {
                padding: { left: 0, right: 0, top: 0, bottom: 0 }
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: '#232323',
                    },
                    title: {
                        display: true,
                        text: 'Medidas en CM'
                    },
                    ticks: {
                        callback: function (value) {
                            return Math.abs(value); // Muestra los valores absolutos
                        }
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Partes del Cuerpo'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                tooltip: { xAlign: "left", enabled: true },
                title: { display: true, text: 'Comparativa Mensual' },
                datalabels: {
                    anchor: "end",
                    align: "right",
                    offset: 0,
                    color: "#fff",
                    padding: { left: 10 },
                    margin: { right: 0 }
                },
                legend: { display: true }
            },
            indexAxis: 'y', // Cambia la orientación del eje
        };
    
    */

    const myData1 = [9, 1, 4, 1, 1, 28]; // Datos de octubre (positivos)
    const myData2 = [-10, -2, -3, -4, -2, -25]; // Datos de septiembre (negativos)

    const data = {
        labels: ['Espalda y Pecho', 'Bíceps', 'Cintura', 'Cadera y Cola', 'Cuadriceps', 'Gemelos'],
        datasets: [
            {
                label: 'Septiembre 2024',
                data: myData2,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                datalabels: {
                    anchor: "start",
                    align: "right",/*
                    anchor: 'end',
                    align: 'start',*/
                    formatter: (val) => {
                        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++val")
                        console.log(val)
                        let formatoTexto = Math.abs(val);
                        return formatoTexto;

                    },
                }
            },
            {
                label: 'Octubre 2024',
                data: myData1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                datalabels: {
                    anchor: "end",
                    align: "start",/*
                    anchor: 'end',
                    align: 'start',*/
                    formatter: (val) => {
                        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++val")
                        console.log(val)
                        let formatoTexto = Math.abs(val);
                        return formatoTexto;

                    },
                }
            }
        ]
    };

    const options = {
        layout: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: '#232323',
                },
                title: {
                    display: true,
                    text: 'Medidas en CM'
                },
                ticks: {
                    callback: function (value) {
                        return Math.abs(value); // Muestra los valores absolutos
                    }
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Partes del Cuerpo'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        },
        plugins: {
            tooltip: { xAlign: "left", enabled: true },
            title: { display: true, text: 'Comparativa Mensual' },
            datalabels: {
                display: true,
                color: "#fff",
                align: (context) => context.dataset.label === 'Septiembre 2024' ? 'start' : 'end',
                anchor: (context) => context.dataset.label === 'Septiembre 2024' ? 'end' : 'start'
            },
            legend: { display: true }
        },
        indexAxis: 'y', // Cambia la orientación del eje
    };


    return (
        <>
            <div class="background-image5"></div>
            <div class="content5 ">
                <Bar data={data} options={options} plugins={[ChartDataLabels]} />
            </div>

        </>
    )
};


///////////////////////////////////////////////////

