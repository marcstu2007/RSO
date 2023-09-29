CREATE DATABASE IF NOT EXISTS dbProyecto;
USE dbProyecto;

-- todo en mb
-- cpu / 100
CREATE TABLE IF NOT EXISTS Recurso(
    iduso INT PRIMARY KEY AUTO_INCREMENT,
    idpc VARCHAR(150),
    ram_total INT,
    ram_usada INT,
    ram_libre INT,
    ram_cache INT,
    ram_porcentaje_en_uso DECIMAL(5, 2),
    cpu_porcentaje_en_uso DECIMAL(5, 2),
    running INT,
    sleeping INT,
    zombie INT,
    stoppeds INT,
    total INT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Es necesario dividir entre 100
CREATE TABLE IF NOT EXISTS Tarea(
    IdTarea INT PRIMARY KEY AUTO_INCREMENT,
    idpc INT,
    pid INT,
    nombre VARCHAR(150),
    usuario INT,
    estado INT,
    ram INT,
    cpu_percentaje DECIMAL(5, 2),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Instrucciones
INSERT INTO Uso(idpc, ram_total,ram_usada,ram_libre,ram_cache,ram_porcentaje_en_uso,cpu_porcentaje_en_uso, running,sleeping, zombie, stoppeds,total) VALUES(idpc, ram_total,ram_usada,ram_libre,ram_cache,ram_porcentaje_en_uso,cpu_porcentaje_en_uso, running,sleeping, zombie, stoppeds,total);
INSERT INTO Tarea(idpc, pid, nombre, usuario, estado, ram, cpu_percentaje) VALUES(idpc, pid, nombre, usuario, estado, ram, cpu_percentaje);

INSERT INTO Recurso(idpc,ram_total,ram_usada,ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stoppeds, total) VALUES(1,400,450,100, 10, 10.20, 75.20, 2, 1, 1, 3, 4);

*/