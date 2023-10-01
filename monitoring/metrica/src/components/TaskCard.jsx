import { useContext, useState } from 'react'
import { TaskContext } from '../context/TaskContext'
import LinesChart from './graphics/LinesChart';
import LinesChartRAM from './graphics/LinesChartRAM';
import Pies from './graphics/PiesChart'
import PiesCPU from './graphics/PiesChartCPU'



function TaskCard({ tasks }) {
  function mostrarAlerta() {
    alert(tasks.id);
  }

  const { deleteTask } = useContext(TaskContext)

  return (
    <>
      <div className='bg-gray-800 text-white p-4 rounded-md '>
        <h2 className='text-xl font-bold capitalize text-center'>{tasks.title}</h2>
        {/* <button className='bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400' onClick={() => deleteTask(tasks.id)}>Eliminar tarea</button> */}
        <Pies />
        <br></br>
        <h2 className='text-xl font-bold capitalize text-center'> RAM en tiempo real</h2>
        <div>
        <LinesChartRAM />
      </div>
      </div>

      <div className='bg-gray-800 text-white p-4 rounded-md '>
        <h2 className='text-xl font-bold capitalize text-center'>CPU</h2>
        <PiesCPU />
        <div>
        <br></br>
        <h2 className='text-xl font-bold capitalize text-center'>CPU en tiempo real</h2>
        <LinesChart />
      </div>
      </div>

    </>
  );
}

export default TaskCard;
