# Запуск на сервере

1. Клонируйте репозиторий
```sh
git clone https://github.com/laptop-coder/school-dining-room-menu.git
```
2. Установите переменные окружения
```sh
cp .env.example .env
vi .env
```

:::info На всякий случай;)
Для выхода из Vi с сохранением нажмите `:wq`, без сохранения --- `:q!`.
:::

3. При желании настройте CD (см. соответствующий раздел)
```sh
sh -c "( crontab -l; cat ./crontab.tasks )" | crontab -
```
4. Запустите проект:
```sh
docker compose up -d
```
или

```sh
docker-compose up -d
```
