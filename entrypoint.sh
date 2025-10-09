#!/bin/sh

# Chờ MySQL sẵn sàng
echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  sleep 5
done
echo "MySQL is up!"

# Chạy migration
echo "Running database migrations..."
npm run migration:run

# Khởi động ứng dụng
echo "Starting application..."
exec npm run start:prod