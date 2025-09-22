#!/bin/sh

if [ "$DEV_MODE" = "true" ]; then
    echo "Starting frontend in the DEVELOPMENT mode via HTTPS..."
    ln -sf /app/nginx.dev.conf /etc/nginx/conf.d/default.conf
elif [ "$DEV_MODE" = "false" ]; then
    echo "Starting frontend in the PRODUCTION mode via HTTP..."
    ln -sf /app/nginx.prod.conf /etc/nginx/conf.d/default.conf
else
    echo "Error. Environment variable DEV_MODE should be \"true\" or \"false\""
    exit
fi

nginx -g "daemon off;"

