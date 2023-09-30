import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

function Detail() {
  const [process, setProcess] = useState([]);
  const { idPid, creatTasksPID } = useContext(TaskContext);

  const makeAPICall = async () => {
    console.log('makeAPICall')
    try {
      const response = await fetch("http://34.16.164.106:3000/tareas", {
        mode: "cors",
      });
      const data = await response.json();
      console.log("datoss: "+data[1].name)
      setProcess([...data]);
      // console.log("datos: "+data.rendimiento.ram.processes)
      creatTasksPID(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);


  

  const cargarPIDs = (ev, id) => {
    if (ev.pid >= id) {
      return (
        <div
          className="grid grid-cols-5 border-4 border-slate-700 border-x-indigo-900"
          key={ev.pid}
        >
          <h3 className="text-white">{"PID: " + ev.pid}</h3>
          <h3 className="text-white">{"Nombre: " + ev.name}</h3>
          <h3 className="text-white">{"Usuario: " + ev.user}</h3>
          <h3 className="text-white">{"Estado: " + ev.state}</h3>
          <h3 className="text-white">{"RAM: " + ev.ram + " %"}</h3>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-800 ">
      <h3 className="text-xl font-bold capitalize text-center text-white">
        Procesos en ejecución
      </h3>
      {process.map((ev) => cargarPIDs(ev, idPid))}
    </div>
  );
}
export default Detail;
