import { createContext } from "react";
import { useState, useEffect } from "react";
import { tasks as data } from "../data/tasks.js";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]); // % de CPU y RAM
  const [idPid, setIdPid] = useState(0); // Id de busqueda
  const [tasksPID, setTasksPID] = useState([]); // Array completo cargado con datos de PID
  const [datosRam, setDatosRam] = useState([0.5,0.5]); // Array RAM
  const [datosCpu, setDatosCpu] = useState([0.5,0.5]); // Array CPU
  const [ipElegido, setIpElegido] = useState([]); //IP elegido

  function createIPElegido(value) {
    setIpElegido([value]);
    // console.log("Inicio:::  ",value);
  }

  function createDatosRAM(value) {
    // console.log("inicio: ",value);
    setDatosRam([value])
  }
  function createCPU(value) {
    console.log("inicio CPU: ",value);
    setDatosCpu([value])
  }

function creatTasksPID(value) {
  setTasksPID([...value]);
}

  function creatEncontrado(value){
    setEncontrado(value);
  }

  function createTask(task) {
    setTasks([
      ...tasks,
      {
        title: task.title,
        id: tasks.length,
        descripcion: task.descripcion,
      },
    ]);
  }


  function searchIdPid(id){
    setIdPid(id)
    // console.log(id,"===",idPid)
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
    // console.log(tasks,"======",taskId)
  }



  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    // <>
    //     <h1>Componente Context</h1>
    //     {props.children}
    // </>
    <TaskContext.Provider
      value={{
        tasks,
        deleteTask,
        createTask,
        searchIdPid,
        idPid,
        creatTasksPID,
        tasksPID,
        createDatosRAM,
        datosRam,
        createCPU,
        datosCpu,
        ipElegido,
        createIPElegido,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
