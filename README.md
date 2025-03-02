# Запуск проекта
1. Установить зависимости
```shell
npm install
```

2. Поднять сборку
```shell
docker compose up --build
```

3. Применить миграции
```shell
docker compose exec app npx prisma migrate dev
```

4. Сидирование таблиц
```shell
docker compose exec app npx prisma db seed
```

## Swagger
### Панель swagger доступна по адресу
```
http://localhost:3000/api
```

### Генерация open api схемы доступна по адресу
```http request
http://localhost:3000/open-api
```
