#!/bin/sh

BACKEND_OLD_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-backend --format {{.Id}})"
FRONTEND_OLD_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-frontend --format {{.Id}})"

docker-compose -f "${HOME}/school-dining-room-menu/compose.yaml" down

docker rmi laptopcoder/school-dining-room-menu-backend:latest > /dev/null
docker rmi laptopcoder/school-dining-room-menu-frontend:latest  > /dev/null

docker pull laptopcoder/school-dining-room-menu-backend:latest > /dev/null
docker pull laptopcoder/school-dining-room-menu-frontend:latest  > /dev/null

BACKEND_NEW_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-backend --format {{.Id}})"
FRONTEND_NEW_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-frontend --format {{.Id}})"


if [ "$BACKEND_OLD_IMAGE_ID" != "$BACKEND_NEW_IMAGE_ID" ]; then
    echo "The backend image on the Docker Hub was updated, restarting container..."
    docker restart menu-backend
else
    echo "The backend image on the Docker Hub was not updated."
fi;

if [ "$FRONTEND_OLD_IMAGE_ID" != "$FRONTEND_NEW_IMAGE_ID" ]; then
    echo "The frontend image on the Docker Hub was updated, restarting container..."
    docker restart menu-frontend
else
    echo "The frontend image on the Docker Hub was not updated."
fi;


docker-compose -f "${HOME}/school-dining-room-menu/compose.yaml" up -d
