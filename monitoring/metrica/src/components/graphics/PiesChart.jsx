import React, { useContext,useState  } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import {TaskContext} from "../../context/TaskContext"

ChartJS.register(ArcElement, Tooltip, Legend);

// console.log();

export default function Pies( datos) {
  const {datosRam} = useContext(TaskContext)
  // console.log(datosRam[0])

  const data = {
 

    //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      labels: ["RAM en uso", "RAM libre"],
      datasets: [
        {
          label: "% de RAM",
          data: datosRam[0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    
  return <Pie data={data} />;
}
