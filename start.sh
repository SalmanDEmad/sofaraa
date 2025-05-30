#!/usr/bin/env bash

set -e

ROOT_DIR=$(pwd)
echo $ROOT_DIR
# NGINX_CONF="$ROOT_DIR/etc/nginx/nginx.local.conf"
PHP_FPM_CONF="$ROOT_DIR/etc/php-fpm.conf"

echo "🔁 Starting PHP-FPM..."
php-fpm -y "$PHP_FPM_CONF" &

# echo "🚀 Starting Nginx..."
# nginx -c "$NGINX_CONF" -p "$ROOT_DIR"

echo "✅ Laravel is live at: https://videoapp.test".