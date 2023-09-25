import {useContext, useState} from 'react'
import {TaskContext} from '../context/TaskContext'
import LinesChart from './graphics/LinesChart';
import Pies from './graphics/PiesChart'


function TaskCard({ tasks }) {
  function mostrarAlerta() {
    alert(tasks.id);
  }

  const {deleteTask} = useContext(TaskContext)

  return (
      <div className='bg-gray-800 text-white p-4 rounded-md '>
        <h1 className='text-xl font-bold capitalize text-center'>{tasks.title}</h1>
        <p className='text-gray-500 text-sm'> {tasks.descripcion}</p>
        {/* <button className='bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400' onClick={() => deleteTask(tasks.id)}>Eliminar tarea</button> */}
        <Pies/>
        
      </div>
  );
}

export default TaskCard;
