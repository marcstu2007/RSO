#!/bin/bash

# Carga los módulos de kernel
sudo insmod kernel_modules/cpu_201122934.ko
sudo insmod kernel_modules/ram_201122934.ko

# Ejecuta tu aplicación principal
# exec "$@"
