import { useEffect, useState, useContext } from "react";
import { TaskContext} from "./context/TaskContext";

function Combo() {
  const [info, setInfo] = useState([]);
  const [processIP, setProcessIP] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const {createDatosRAM, createCPU, createIPElegido} = useContext(TaskContext)

  // Obtiene los ultimas ip de los ultimos 10 minutos, limitado a 4 resultados
  const consultarIP = async () => {
    try {
      const respuesta = await fetch(`http://backendo_node:3000/listaip`, {
        mode: "cors",
      });
      setInfo(await respuesta.json());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    consultarIP();
  }, []);

  useEffect(() => {
    consultarProcesos();
  }, [selectedOption]);

// Consultar por dirección IP
  const consultarProcesos = async (req, res, next) => {
    // console.log("Dirección IP: ",selectedOption, " ", typeof selectedOption)
    createIPElegido(selectedOption)
    if (selectedOption === "") {
      return;
    }
    const cabecera = {
      "ip" : selectedOption,
    }

    try {
      const respuesta = await fetch(`http://backendo_node:3000/rendimiento`, {
        method: 'POST',
        mode: "cors",
        headers:{
          'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
        },
        body: JSON.stringify(cabecera)
      })
      const recursos = await respuesta.json();
      setProcessIP(recursos)
      const ram_en_uso =recursos[0].ram_usada/recursos[0].ram_total
      const setDatos=[ram_en_uso*100, (1-ram_en_uso)*100]
      const setCPU =[Number(recursos[0].cpu_porcentaje_en_uso*10), 100-(Number(recursos[0].cpu_porcentaje_en_uso)*10)]
      // console.log("procesos: ",recursos)
      console.log("procesos: ",setCPU)
      // console.log("procesos: ",setDatos)
      createDatosRAM(setDatos)
      createCPU(setCPU)
    } catch (error) {
      console.error(error)      
    }
  }



  // Función para manejar el cambio en la selección
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    consultarProcesos(event.target.value);
  };

  return (
    <div>
        <label htmlFor="combo" className="text-white text-1xl">Selecciona una IP:  </label>
      <select id="combo" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Elige una IP</option>
        {info.map((element, index) => (
          <option key={index} value={element.idpc}>
            {element.idpc}
          </option>
        ))}
      </select>
      <p className="text-slate-400 text-1xl">IP seleccionado: {selectedOption}</p>
    </div>
  );
}

export default Combo;
