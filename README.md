# ЛЕПИМ — React + Vite + Tailwind CSS

## Быстрый старт

```bash
npm install
npm run dev
```

Откроется на http://localhost:5173

## Структура проекта

```
src/
├── App.jsx                  # Корневой компонент, собирает все блоки
├── main.jsx                 # Точка входа React
├── index.css                # Только базовые определения (переменные, курсор, анимации)
│
├── assets/
│   └── data/
│       ├── products.js      # Все блюда: название, цена, состав, фото
│       ├── reviews.js       # Отзывы и рейтинг
│       └── content.js       # Все тексты сайта по разделам
│
└── components/
    ├── Cursor.jsx           # Кастомный курсор
    ├── Nav.jsx              # Навигация
    ├── Hero.jsx             # Главный экран
    ├── MarqueeBand.jsx      # Бегущая строка
    ├── Catalog.jsx          # Каталог с горизонтальным скроллом
    ├── ProductModal.jsx     # Модальное окно блюда (состав)
    ├── Story.jsx            # Наша история
    ├── HowItWorks.jsx       # Как это работает
    ├── Promo.jsx            # Промо-акция
    ├── Reviews.jsx          # Отзывы + форма
    └── Footer.jsx           # Подвал
```

## Как вносить правки

### Изменить тексты
`src/assets/data/content.js` — все тексты сайта в одном файле.

### Добавить/изменить блюдо
`src/assets/data/products.js` — массив блюд. Добавьте объект по образцу.

### Изменить цвета
`tailwind.config.js` → `theme.extend.colors` — вся палитра.

### Заменить фотографии
В `products.js` замените `image` и `thumb` на путь к своим файлам:
```js
image: '/src/assets/images/mypelimeni.jpg',
thumb: '/src/assets/images/mypelimeni-sm.jpg',
```

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка в папку `dist/` |
| `npm run preview` | Предпросмотр сборки |
