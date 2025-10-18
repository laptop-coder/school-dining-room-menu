#!/bin/sh
BACKEND_OLD_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-backend --format {{.Id}})"
FRONTEND_OLD_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-frontend --format {{.Id}})"
docker pull laptopcoder/school-dining-room-menu-backend:latest > /dev/null
docker pull laptopcoder/school-dining-room-menu-frontend:latest  > /dev/null
BACKEND_NEW_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-backend --format {{.Id}})"
FRONTEND_NEW_IMAGE_ID="$(docker inspect laptopcoder/school-dining-room-menu-frontend --format {{.Id}})"


if [ "$BACKEND_OLD_IMAGE_ID" != "$BACKEND_NEW_IMAGE_ID" ] || [ "$FRONTEND_OLD_IMAGE_ID" != "$FRONTEND_NEW_IMAGE_ID" ]; then
    echo "The image(s) on the Docker Hub was(were) updated, restarting the project..."
    docker restart menu-backend
    docker restart menu-frontend
else
    echo "The images on the Docker Hub were not updated."
fi;
