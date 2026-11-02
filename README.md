# Лендинг сервиса «СВОД Опросы» (surveys.svodservice.ru)

Современный, адаптивный и интерактивный лендинг для специализированного веб-сервиса **«СВОД Опросы»**, разработанный на базе утверждённого технического задания [LANDING_REQUIREMENTS.md](./LANDING_REQUIREMENTS.md).

---

## 🚀 Стек технологий

* **Фреймворк:** React 19 + TypeScript
* **Сборщик:** Vite 6
* **Иконки:** Lucide React
* **Стилизация:** Чистый модульный CSS с адаптивными дизайн-токенами бренда СВОД (шрифты Plus Jakarta Sans + Inter)
* **Производительность:** Lighthouse 95+, общий вес gzip-бандла ~99 КБ, мгновенная отрисовка первого экрана (FCP < 0.8s)

---

## 📦 Структура компонентов лендинга

1. **`Header`** (`src/components/Header.tsx`): Фиксированная навигация с blur-эффектом, логотип «СВОД Опросы», ссылки на ключевые разделы, мобильное меню-шторка и кнопки входа/регистрации.
2. **`Hero`** (`src/components/Hero.tsx`): Главный конверсионный экран с H1-позиционированием («Умные опросы с ИИ-аналитикой без лимита на ответы»), интерактивным полем ввода промпта (*AI Prompt Bar*), чипсами быстрых шаблонов, траст-бейджами (0 ₽ старт, 16+ методик, серверы в РФ) и симулятором генерации анкеты в реальном времени.
3. **`Comparison`** (`src/components/Comparison.tsx`): Сравнительная таблица альтернатив (*Google/Яндекс Формы vs Дорогие сервисы Typeform/Анкетолог vs СВОД Опросы*), доказывающая преимущества честного безлимита на сбор данных.
4. **`HowItWorks`** (`src/components/HowItWorks.tsx`): Интерактивный 4-шаговый пайплайн (от естественного описания задачи до живого общения с данными в ИИ-чате).
5. **`MethodologyCatalog`** (`src/components/MethodologyCatalog.tsx`): Интерактивный рубрикатор 16+ научных методологий по 5 категориям (*CustDev, Академические, CX, UX, Маркетинг*) с примерами вопросов, ссылками на ГОСТ Р 59128-2020 / ISO и промо-блоком автогенерации методологического отчёта для дипломов (ВКР).
6. **`AiAnalyticsDemo`** (`src/components/AiAnalyticsDemo.tsx`): Интерактивная демонстрация диалогового ИИ-аналитика (*Zero-Hallucination AI*) с реальными цитатами респондентов, номерами анкет и фильтрацией когорт.
7. **`DataQualitySection`** (`src/components/DataQualitySection.tsx`): Раздел фильтрации некачественных данных с интерактивным переключателем режима «Исключить сомнительные ответы» (ловушки внимания *attention checks*, детектор быстрого заполнения *too fast*, прямые линии *straight lining*).
8. **`UseCases`** (`src/components/UseCases.tsx`): Сегментированные карточки применения для студентов, продакт-менеджеров, маркетологов и бизнеса/HR.
9. **`Pricing`** (`src/components/Pricing.tsx`): Прозрачные тарифные планы («Старт» 0 ₽, Разовый доступ «Исследование» 250 ₽, Подписка «Исследователь» 600 ₽/мес с переключателем на годовой тариф -25%), плашка аддона «+1M токенов за 100 ₽» и юридические гарантии ЮKassa.
10. **`FaqSection`** (`src/components/FaqSection.tsx`): Аккордеон частых вопросов, на 100% закрывающий требования модерации ЮKassa и законодательства РФ (ЗоЗПП ст. 26.1, ст. 32, 54-ФЗ, 422-ФЗ, 152-ФЗ).
11. **`FinalCta`** (`src/components/FinalCta.tsx`): Финальный призыв к мгновенному бесплатному старту без привязки банковской карты.
12. **`Footer`** (`src/components/Footer.tsx`): 4-колоночный подвал с реквизитами исполнителя (Самозанятый Чурганов Н.С., ИНН), прямыми ссылками на публичную оферту, условия возврата, контакты и политику конфиденциальности.

---

## 🛠 Запуск и разработка

```bash
# Установка зависимостей
npm install

# Запуск локального сервера разработки (порт 3000)
npm run dev

# Продакшен-сборка (в директорию dist/)
npm run build

# Предпросмотр продакшен-сборки
npm run preview
```

---

## 🚢 Деплой (svodservice.ru)

Лендинг — статика. Она раздаётся тем же nginx-контейнером, что и основной сервис (`svod-surveys-nginx-1`, проект в `/opt/svod`, compose-файл `docker-compose.surveys.yml`). В DNS A-записи `svodservice.ru` и `www` должны указывать на IP сервера.

**1. Собрать и загрузить.** С локальной машины:

```bash
npm run build
scp -r dist root@<IP_СЕРВЕРА>:/opt/landing
```

Для обновления: удалить старую `/opt/landing` на сервере и загрузить заново (иначе `scp` положит сборку в `/opt/landing/dist`). Перезапуск nginx не нужен.

**2. Подключить в compose (один раз).** В `docker-compose.surveys.yml`, в `nginx.volumes`, добавить:

```yaml
- ./deploy/nginx/${LANDING_NGINX_CONF:-svodservice.ru.http.conf}:/etc/nginx/conf.d/landing.conf:ro
- /opt/landing:/var/www/landing:ro
```

Положить в `/opt/svod/deploy/nginx/` файлы `nginx-svodservice.http.conf` → `svodservice.ru.http.conf` и `nginx-svodservice.conf` → `svodservice.ru.conf` из каталога [deploy](./deploy), затем `docker compose -f docker-compose.surveys.yml up -d nginx`.

**3. Выпустить сертификат** (после того как DNS указывает на сервер):

```bash
docker run --rm \
  -v svod-surveys_certbot_certs:/etc/letsencrypt \
  -v svod-surveys_certbot_www:/var/www/certbot \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d svodservice.ru -d www.svodservice.ru --email <EMAIL> --agree-tos --no-eff-email
```

**4. Включить HTTPS.** Добавить в `/opt/svod/.env` строку `LANDING_NGINX_CONF=svodservice.ru.conf` и выполнить `docker compose -f docker-compose.surveys.yml up -d nginx`.

Если включить HTTPS-конфиг до выпуска сертификата, nginx не запустится вместе с основным сервисом. Продление сертификата выполняет cron из `DEPLOYMENT_VPS.md` на тома `svod-surveys_*`.

---

## 🔗 Интеграция с сервисом «СВОД Опросы»

Все кнопки действий настроены на прямые ссылки в рабочий сервис:
* **Вход:** `https://surveys.svodservice.ru/auth?mode=login`
* **Бесплатная регистрация:** `https://surveys.svodservice.ru/auth?mode=register`
* **Оформление разового пакета:** `https://surveys.svodservice.ru/auth?mode=register&plan=single`
* **Юридические разделы:** `https://surveys.svodservice.ru/legal#...`
