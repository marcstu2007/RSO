import { useState, useContext } from "react";
import { TaskContext } from "./context/TaskContext";
import Detalle from './components/route/Detail'
import axios from 'axios';

function TaskPID() {
  const { searchIdPid, idPid, tasksPID, ipElegido, maquina} = useContext(TaskContext);

  function existPID(PID){
    console.log('Estoy buscando')
    console.log(tasksPID)
    const encontrado = tasksPID.filter((elemento)=> parseInt(elemento.pid)==PID)
    if (encontrado.length == 0) {
      alert("PID No encontrado")
      return []
    }else{
      return encontrado
    }
  }

  const handledSubmit = (e) => {
    e.preventDefault();
    if (idPid===0 ){
      alert("Por favor ingresa un PID");
    }else{
      searchIdPid(idPid);
      let taskL=existPID(idPid)
      if (taskL.length===0) return
      console.log("Busqueda: ",idPid);
    }
  };

function MatarPID(PID){
  let taskL=existPID(PID)
  if (taskL.length===0) return
  console.log("Eliminado ", PID)

  // Crear un objeto JSON que quieres enviar
  const data = {
    "pid": PID,
    "ip": ipElegido,
  };

  // Realizar la solicitud POST usando Axios
  axios
    .post(`http://${maquina}:3000/pid`, data, {
      headers: {
        "Content-Type": "application/json", // Asegúrate de que el servidor pueda entender JSON
      },
    })
    .then((response) => {
      // Realizar acciones con la respuesta del servidor
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Fin de envio
}


  function handleSubmitID(e) {


    e.preventDefault();
    console.log("You clicked submit.");

    if (idPid===0 ){
      alert("Por favor ingresa un PID");
    }else{
      MatarPID(idPid)
    }
  }
  function handleSubmitValor(e) {
    searchIdPid(e.target.value);
    e.preventDefault();

    // console.log('---'+e.target.value)
  }

  return (
    <form onSubmit={handledSubmit} className="bg-slate-800 p-10 mb-4 ">
      <div className="flex">
        <div className="w-1/4 p-4">
          <h2 className="text-2xl font-bold text-white mb-3 text-right">PID</h2>
        </div>

        <div className="w-2/4 p-4">
          <input
            placeholder="Escribe el PID"
            //     onChange={
            //         (e)=>{
            //         setTitle(e.target.value);
            //     }
            // }
            // value={title}
            className="bg-slate-300 p-3 w-full mb-2"
            autoFocus
            onChange={handleSubmitValor}
          />
        </div>

        <div className="w-1/4 p-4">
          <button
            className="bg-green-700 px-2 py-1 rounded-md mt-4 hover:bg-lime-400 hover:text-black text-white"
            onClick={handledSubmit}
          >
            Buscar
          </button>
        </div>
        <div className="w-1/4 p-4">
          <button
            className="bg-red-500 px-2 py-1 rounded-md mt-4 hover:bg-red-400 hover:text-black text-white"
            onClick={handleSubmitID}
          >
            Matar proceso
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskPID;
