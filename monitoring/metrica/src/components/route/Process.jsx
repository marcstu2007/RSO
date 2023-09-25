import axios from 'axios';

// Crear un objeto JSON que quieres enviar
const data = {
  key1: 'value1',
  key2: 'value2',
};

// Realizar la solicitud POST usando Axios
axios.post('http://backendo_node:3000/pid', data, {
  headers: {
    'Content-Type': 'application/json', // Asegúrate de que el servidor pueda entender JSON
  },
})
  .then(response => {
    // Realizar acciones con la respuesta del servidor
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
