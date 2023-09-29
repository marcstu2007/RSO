import React, { useContext,useState  } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {TaskContext} from "../../context/TaskContext"

ChartJS.register(ArcElement, Tooltip, Legend);

// console.log();

export default function PiesCPU() {
  const {datosCpu} = useContext(TaskContext)
   console.log("pies cpu",datosCpu[0])

  const data = {

      labels: ["uso de CPU", "CPU libre"],
      datasets: [
        {
          label: "% de CPU",
          data: datosCpu[0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    
  return <Pie data={data} />;
}
