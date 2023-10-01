import { Line } from "react-chartjs-2";
import React, { useContext, useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { TaskContext } from "../../context/TaskContext";

export default function LinesChartRAM() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

    const { ipElegido, maquina } = useContext(TaskContext);
    const [infoCPU, setInfoCPU] = useState([]);

    // Función para consultar el uso de CPU
    const consultarProcesos = async () => {
        if (ipElegido === "") {
            return;
        }

        try {
            const respuesta = await fetch(`http://${maquina}:3000/rendimiento`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "ip": ipElegido }),
            });
            const recursos = await respuesta.json();
            const cpuPorcentajes = recursos.map((dato) => parseFloat(dato.ram_porcentaje_en_uso));
            setInfoCPU([...cpuPorcentajes]);
            // console.log("CPU porcentaje ==> ", cpuPorcentajes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        consultarProcesos();

        // Establecer la actualización cada 10 segundos
        const intervalId = setInterval(() => {
            consultarProcesos();
        }, 10000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [ipElegido]);

    var beneficios = [...infoCPU];
    var meses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11","12"];

    var midata = {
        labels: meses,
        datasets: [
            {
                label: "RAM",
                data: beneficios,
                tension: 0.5,
                fill: true,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                pointRadius: 5,
                pointBorderColor: "rgba(255, 99, 132)",
                pointBackgroundColor: "rgba(255, 99, 132)",
            },
        ],
    };

    var misoptions = {
        scales: {
            y: {
                min: 0,
            },
            x: {
                ticks: { color: "rgb(255, 99, 132)" },
            },
        },
    };

    return <Line data={midata} options={misoptions} />;
}
