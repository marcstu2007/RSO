#!/bin/bash
git clone https://github.com/marcstu2007/RSO.git
cd RSO/vms/modulos/cpu
make all
sudo insmod cpu_201122934.ko
cd ..
cd ram
make all
sudo insmod ram_201122934.ko
cd ..
