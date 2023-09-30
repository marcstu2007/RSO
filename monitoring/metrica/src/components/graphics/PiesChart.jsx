import React, { useContext, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TaskContext } from "../../context/TaskContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiesCPU() {
  const { ipElegido } = useContext(TaskContext);
  const [infoRAM, setInfoRAM] = useState([]);

  // Función para consultar el uso de CPU
  const consultarProcesos = async () => {
    if (ipElegido == "") {
      return;
    }

    try {
      const respuesta = await fetch(`http://34.16.164.106:3000/rendimiento`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "ip": ipElegido }),
      });
      const recursos = await respuesta.json();
      setInfoRAM([
        Number(recursos[0].ram_porcentaje_en_uso),
        100 - Number(recursos[0].ram_porcentaje_en_uso),
      ]);
      console.log("-----",recursos)
    } catch (error) {
      console.error(error);
    }
  };

  console.log("ejecución: ",infoRAM);
  // Consulta inicial al cargar el componente
  useEffect(() => {
    consultarProcesos();
  }, [ipElegido]);

  // Establecer un intervalo para actualizar cada 10 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      consultarProcesos();
    }, 10000); // 10 segundos en milisegundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(intervalId);
    };
  }, [ipElegido]);

  const data = {
    labels: ["uso de RAM", "RAM libre"],
    datasets: [
      {
        label: "% de RAM",
        data: infoRAM,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
