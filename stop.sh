#!/usr/bin/env bash

echo "🛑 Stopping services..."

if [ -f php-fpm.pid ]; then
  kill -TERM $(cat php-fpm.pid) && echo "✅ PHP-FPM stopped." || echo "⚠️ Failed to stop PHP-FPM"
  rm php-fpm.pid
else
  pkill php-fpm && echo "✅ PHP-FPM killed." || echo "⚠️ No PHP-FPM running."
fi

# nginx -s stop && echo "✅ Nginx stopped." || echo "⚠️ Nginx may not be running"
