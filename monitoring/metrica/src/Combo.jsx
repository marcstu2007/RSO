import { useEffect, useState, useContext } from "react";
import { TaskContext} from "./context/TaskContext";

function Combo() {
  const [info, setInfo] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const {createIpSeleccionado} = useContext(TaskContext)

  // Obtiene los ultimas ip de los ultimos 10 minutos, limitado a 4 resultados
  const consultarIP = async () => {
    try {
      const respuesta = await fetch(`http://34.16.164.106:3000/listaip`, {
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


  const consultarProcesos = async (req, res, next) => {
    createIpSeleccionado(selectedOption)
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
