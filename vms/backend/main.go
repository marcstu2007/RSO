package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"time"

	"github.com/rs/cors" // Importa la biblioteca CORS
)

func main() {
	// Lanzar un goroutine que ejecute la función cada n segundos
	interval := 10 // segundos
	ticker := time.NewTicker(time.Second * time.Duration(interval))
	defer ticker.Stop()

	// Configura CORS con las opciones deseadas
	corsOptions := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Permite solicitudes desde cualquier origen
	})

	// Crea un manejador HTTP con CORS
	handler := corsOptions.Handler(http.HandlerFunc(handleRequest))

	// Inicia el servidor HTTP
	go func() {
		fmt.Println("Servidor en ejecución en el puerto :3010")
		http.ListenAndServe(":3010", handler)
	}()

	for {
		select {
		case <-ticker.C:
			fmt.Println("DATOS OBTENIDOS DESDE EL MODULO DE RAM y CPU:")
			fmt.Println("")

			cmd := exec.Command("sh", "-c", "cat /proc/ram_201122934")
			out, err := cmd.CombinedOutput()
			if err != nil {
				fmt.Println(err)
			}
			output := string(out[:])

			// Ejecutando CPU
			cmdCPU := exec.Command("sh", "-c", "cat /proc/cpu_201122934")
			outCPU, errCPU := cmdCPU.CombinedOutput()
			if errCPU != nil {
				fmt.Println(errCPU)
			}
			outputCPU := string(outCPU[:])
			fmt.Println(output)
			fmt.Println(outputCPU)

			// Ejecutar la función para enviar datos al servidor
			maquina := "1"
			if err := enviarDatosAlServidor("{\"idpc\": " + maquina + ",\n \"rendimiento\":" + output + outputCPU + "\n}"); err != nil {
				fmt.Println("Error al enviar datos al servidor:", err)
			}
		}
	}
}

func MatarID(w http.ResponseWriter, r *http.Request) {
	//http://localhost:3010/kill?pid=16298
	pidStr := r.URL.Query().Get("pid")
	if pidStr == "" {
		http.Error(w, "Debes proporcionar un ID de proceso (pid)", http.StatusBadRequest)
		return
	}

	// Convertir el parámetro "pid" a un número entero
	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "El ID de proceso (pid) debe ser un número válido", http.StatusBadRequest)
		return
	}

	// Construir el comando para matar el proceso
	cmd := exec.Command("kill", fmt.Sprintf("%d", pid))

	// Redirigir la salida estándar y de error del comando al de la respuesta HTTP
	cmd.Stdout = w
	cmd.Stderr = w

	// Ejecutar el comando para matar el proceso
	if err := cmd.Run(); err != nil {
		fmt.Fprintf(w, "Error al matar el proceso: %v\n", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Proceso con ID %d ha sido terminado.\n", pid)
}

// handleRequest maneja la solicitud de envío de datos
func handleRequest(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodGet {
		MatarID(w, r)
		return
	} else if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Lee el cuerpo de la solicitud
	var buf bytes.Buffer
	_, err1 := buf.ReadFrom(r.Body)
	if err1 != nil {
		http.Error(w, "Error al leer el cuerpo de la solicitud", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Datos recibidos exitosamente")
}

// HadleRequest maneja la solicitud de matar proceso
func handleRequest1(w http.ResponseWriter, r *http.Request) {
	http.HandleFunc("/kill", func(w http.ResponseWriter, r *http.Request) {
		// Obtener el parámetro "pid" de la solicitud
		pidStr := r.URL.Query().Get("pid")
		if pidStr == "" {
			http.Error(w, "Debes proporcionar un ID de proceso (pid)", http.StatusBadRequest)
			return
		}

		// Convertir el parámetro "pid" a un número entero
		pid, err := strconv.Atoi(pidStr)
		if err != nil {
			http.Error(w, "El ID de proceso (pid) debe ser un número válido", http.StatusBadRequest)
			return
		}

		// Construir el comando para matar el proceso
		cmd := exec.Command("kill", fmt.Sprintf("%d", pid))

		// Redirigir la salida estándar y de error del comando al de la respuesta HTTP
		cmd.Stdout = w
		cmd.Stderr = w

		// Ejecutar el comando para matar el proceso
		if err := cmd.Run(); err != nil {
			fmt.Fprintf(w, "Error al matar el proceso: %v\n", err)
			return
		}

		fmt.Fprintf(w, "Proceso con ID %d ha sido terminado.\n", pid)
	})
}

func enviarDatosAlServidor(data string) error {
	serverIP := os.Getenv("SERVER_IP")

	// url := "http://172.19.0.4:3000/insert" // Reemplaza con la URL de tu servidor y endpoint
	url := "http://" + serverIP + ":3000/insert" // Reemplaza con la URL de tu servidor y endpoint

	payload := []byte(data)

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(payload))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Error en la solicitud: %s", resp.Status)
	}

	return nil
}