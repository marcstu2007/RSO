import React, { useContext, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TaskContext } from "../../context/TaskContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PiesCPU() {
  const { tasksPID,ipSeleccionado } = useContext(TaskContext);
  console.log("::= ",tasksPID)
  const [data, setData] = useState({
    labels: ["uso de CPU", "CPU libre"],
    datasets: [
      {
        label: "% de CPU",
        data: [50,50],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const updateData = async () => {
      if (ipSeleccionado === "") {
        return;
      }

      try {
        const respuesta = await fetch(`http://34.16.164.106:3000/rendimiento`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip: ipSeleccionado }),
        });

        const recursos = await respuesta.json();
        const setCPU = [
          Number(recursos[0].ram_porcentaje_en_uso),
          100 - Number(recursos[0].ram_porcentaje_en_uso),
        ];

        setData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: setCPU,
            },
          ],
        }));
        console.log(setCPU);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(updateData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [ipSeleccionado]);

  return <Pie data={data} />;
}
