#!/bin/sh

cd "${HOME}/school-dining-room-menu"

OLD=$(docker compose images -q backend frontend docs)
docker compose pull backend frontend docs
NEW=$(docker compose images -q backend frontend docs)

if [ "$OLD" != "$NEW" ]; then
    make down
    make deploy
fi

