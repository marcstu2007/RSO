#!/bin/bash

# Carga los módulos de kernel
sudo insmod modulos/cpu/cpu_201122934.ko
sudo insmod modulos/ram/ram_201122934.ko

# Ejecuta tu aplicación principal
# exec "$@"
