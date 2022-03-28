<h1 align="center">Book shop api</h1>

## Описание проекта
Это учебное приложение, написанное в ходе изучения курса Нетологии backend разработка на Javascript.
Приложение представляет из себя сильно упрощенный сайта со списком книг.

## Стек технологий
<p align="center">
  <img src="https://img.shields.io/badge/-NodeJS-%233c873a">
  <img src="https://img.shields.io/badge/-express-yellow">
  <img src="https://img.shields.io/badge/-ejs-red">
  <img src="https://img.shields.io/badge/-MongoDB-brightgreen">
  <img src="https://img.shields.io/badge/-Docker-0db7ed">
  <img src="https://img.shields.io/badge/-Redis-critical">
</p>

Приложение состоит из основной бизнес логики [Папка BookShop](https://github.com/Shkaffez/BookShop/tree/module2_1_4/BookShop)
разделенной на модели данных, роуты, сервисы и view. Для уменьшения связности кода используется IoC контейнер.

И [Counter](https://github.com/Shkaffez/BookShop/tree/module2_1_4/Counter) на Redis, реализующего подсчет просмотров книги.

Сервисы запускаются через Docker-compose.

## Запуск проекта
Для запуска проекта нужно выполнить комаду
`docker-compose up`

Heroku: https://shkaffez-ejs.herokuapp.com/

Docker Hub: https://hub.docker.com/repositories
