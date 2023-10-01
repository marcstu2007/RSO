import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

function Detail() {
  const [process, setProcess] = useState([]);
  const { idPid, creatTasksPID, ipElegido } = useContext(TaskContext);
  const [infoP, setInfoP] = useState([]);


  const consultarProcesos = async () => {
    if (ipElegido == "") {
      return;
    }

    try {
      console.log("ip: ",ipElegido);
      const respuesta = await fetch(`http://backendo_node:3000/tareasip`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "ip": ipElegido }),
      });
      const recursos = await respuesta.json();
      // console.log("::: ",recursos.rendimiento.ram.processes)
       setInfoP([
        ...recursos.rendimiento.ram.processes
      ]);
      creatTasksPID(recursos.rendimiento.ram.processes)
    } catch (error) {
      console.error(error);
    }
  };




  
  // console.log("===> ",infoP)


  // const makeAPICall = async () => {
  //   console.log('makeAPICall')
  //   try {
  //     const response = await fetch("http://backendo_node:3000/tareas", {
  //       mode: "cors",
  //     });
  //     const data = await response.json();
  //     console.log("datoss: "+data[1].name)
  //     setProcess([...data]);
  //     // console.log("datos: "+data.rendimiento.ram.processes)
  //     creatTasksPID(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  useEffect(() => {
    consultarProcesos()
    // makeAPICall();
  }, [ipElegido]);

  const cargarPIDs = (ev, id) => {
    console.log("Me ejecute ")
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
      {
      infoP.map((ev) => cargarPIDs(ev, idPid))}
    </div>
  );
}
export default Detail;
