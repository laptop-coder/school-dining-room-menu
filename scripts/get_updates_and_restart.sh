#!/bin/sh

docker-compose -f "${HOME}/school-dining-room-menu/compose.yaml" down

docker rmi laptopcoder/school-dining-room-menu-backend:latest > /dev/null
docker rmi laptopcoder/school-dining-room-menu-frontend:latest  > /dev/null
docker rmi laptopcoder/school-dining-room-menu-docs:latest  > /dev/null

docker pull laptopcoder/school-dining-room-menu-backend:latest > /dev/null
docker pull laptopcoder/school-dining-room-menu-frontend:latest  > /dev/null
docker pull laptopcoder/school-dining-room-menu-docs:latest  > /dev/null

docker-compose -f "${HOME}/school-dining-room-menu/compose.yaml" up -d
