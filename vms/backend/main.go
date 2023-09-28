package main

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"time"
	// Importa la biblioteca CORS
)

var direccion string

func main() {
	// Lanzar un goroutine que ejecute la función cada n segundos
	interval := 10 // segundos
	ticker := time.NewTicker(time.Second * time.Duration(interval))

	defer ticker.Stop()

	// Función para habilitar CORS
	enableCors := func(w http.ResponseWriter) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
	}

	http.HandleFunc("/kill", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		MatarID(w, r)
	})

	http.HandleFunc("/live", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Live.\n")
	})

	http.HandleFunc("/stress", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		estres(w, r)
		fmt.Fprintf(w, "Estres")
	})

	http.HandleFunc("/ip", func(w http.ResponseWriter, r *http.Request) {
		enableCors(w)
		obtenerIP(w, r)
		fmt.Fprintf(w, "IP")
	})

	// Manejador para otras rutas
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		ruta := r.URL.Path
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Error: ruta no valida  '%s'", ruta)
	})

	// Inicia el servidor HTTP
	go func() {
		fmt.Println("Servidor en ejecución en el puerto :3010")
		http.ListenAndServe(":3010", nil)
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

func enviarDatosAlServidor(data string) error {
	serverIP := os.Getenv("SERVER_IP")
	// serverIP := "localhost"

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

func estres(w http.ResponseWriter, r *http.Request) {
	// Execute the 'stress' command with desired options
	cmd := exec.Command("stress", "-c", "4") // Modify options as needed

	// Capture the command's output
	output, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, fmt.Sprintf("Error al ejecutar 'stress' comando: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the command's output as the HTTP response
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write(output)
}

func obtenerIP(w http.ResponseWriter, r *http.Request) {
	// Execute the 'stress' command with desired options
	cmd := exec.Command("curl", "ifconfig.me") // Modify options as needed

	// Capture the command's output
	output, err := cmd.CombinedOutput()
	direccion = string(output)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error ejecutar 'curl' comando: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the command's output as the HTTP response
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write(output)
}
