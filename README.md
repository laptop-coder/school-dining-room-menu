# School Dining Room Menu

Menu for the school dining room.

[![Latest](https://img.shields.io/github/v/release/laptop-coder/school-dining-room-menu?style=flat-square&label=latest)](https://github.com/laptop-coder/school-dining-room-menu/releases) [![Release](https://img.shields.io/github/actions/workflow/status/laptop-coder/school-dining-room-menu/release.yaml?branch=main&style=flat-square&label=release)](https://github.com/laptop-coder/school-dining-room-menu/actions/workflows/release.yaml)

## Tech Stack

- **Backend:** Go, SQLite
- **Frontend:** SolidJS
- **Deploy:** Docker, Docker Compose, Nginx

## Getting Started
```bash
# Clone the repository
git clone https://github.com/laptop-coder/school-dining-room-menu.git
cd ./school-dining-room-menu
# Set up env variables
cp .env.example .env
vi .env
# First run (deploy + enable CI/CD)
make first-run
```

## Available `make` commands

| Command     | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `cron`      | install nightly cron job from `crontab.tasks` for automatic updates  |
| `deploy`    | start all application services in detached mode                      |
| `first-run` | perform initial setup: start services and install cron               |
| `logs`      | follow logs from all running docker compose services                 |
| `down`      | stop and remove docker compose services                              |
| `dev`       | run development stack with build                                     |
| `dev-down`  | like `down` but for development mode                                 |
| `help`      | show available make targets with short descriptions                  |
