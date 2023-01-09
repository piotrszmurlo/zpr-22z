#!/bin/bash
cd zpr-front/emsdk
./emsdk install latest
./emsdk activate latest
. ./emsdk_env.sh
cd .. 
make
cd ..
docker compose up 