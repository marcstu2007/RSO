#!/bin/bash

sudo apt update -y
sudo apt install gcc-12 -y
export CC=gcc-12
sudo apt update -y
sudo apt install make -y
sudo apt update -y

sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update -y
apt-cache policy docker-ce 
sudo apt install docker-ce -y

sudo apt install stress -y


git clone https://github.com/marcstu2007/RSO.git
cd RSO/vms/modulos/cpu
make all
sudo insmod cpu_201122934.ko
cd ..
cd ram
make all
sudo insmod ram_201122934.ko
cd ..
cd ..
sudo docker compose up