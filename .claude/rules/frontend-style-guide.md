# Ramblers — Frontend Style Guide

Этот файл — источник истины для дизайна. Читай его перед созданием любого UI-компонента.

---

## Цвета (Tailwind CSS v4 — только `c-*` переменные)

| Переменная | Hex | Назначение |
|---|---|---|
| `bg-c-accent` | #E8873A | Основной CTA (кнопки, акценты) |
| `bg-c-accent-dark` | #C96B20 | Hover для accent |
| `bg-c-accent-light` | #F5A96B | Фон лёгких акцентов |
| `bg-c-secondary` | #2D5A27 | Вторичные действия, значки статуса |
| `bg-c-secondary-dark` | #1E3F1A | Hover для secondary |
| `bg-c-bg` | #FAFAF8 | Фон страниц |
| `bg-c-white` | #FFFFFF | Фон карточек, форм |
| `text-c-headline` | #1A1A1A | Заголовки |
| `text-c-muted` | #6B7280 | Вспомогательный текст |
| `text-c-base` | #9CA3AF | Плейсхолдеры |
| `border-c-border` | #E5E1D8 | Границы, разделители |
| `text-c-error` | #EF4444 | Ошибки |
| `text-c-success` | #22C55E | Успех |
| `text-c-warning` | #F59E0B | Предупреждения |

**Запрещено:** `bg-orange-500`, `text-gray-700` и другие произвольные Tailwind-цвета — только `c-*` переменные.

---

## Типографика

- Шрифт: Inter (подключён через `next/font`)
- Заголовки: `font-bold text-c-headline`
  - H1: `text-4xl md:text-5xl`
  - H2: `text-2xl md:text-3xl`
  - H3: `text-xl`
- Обычный текст: `text-base text-c-headline`
- Вспомогательный: `text-sm text-c-muted`

---

## Радиусы

| Переменная | Значение | Когда использовать |
|---|---|---|
| `rounded-sm` → `0.375rem` | Маленькие бейджи, теги |
| `rounded-md` → `0.75rem` | Поля ввода, карточки внутренние |
| `rounded-lg` → `1.25rem` | Карточки кемперов, модалки |
| `rounded-full` | Аватары, индикаторы |

---

## Компоненты Button

Уже реализован в `src/components/ui/Button.tsx`. Всегда используй его.

```tsx
// Основной CTA
<Button variant="primary" size="big">Забронировать</Button>

// Вторичный
<Button variant="outline" size="medium">В каталог</Button>

// Опасное действие
<Button variant="error" size="small">Удалить</Button>
```

**Hover-состояния** — уже встроены в компонент.

---

## Компоненты формы

Всегда используй существующие компоненты — не создавай новые `<input>` напрямую.

- `<Input />` — текстовое поле (интегрировано с react-hook-form)
- `<InputPassword />` — поле пароля с toggle
- `<Textarea />` — многострочный ввод
- `<Form />` — обёртка FormProvider (variant: big|small|full)

---

## Сетки и отступы

- Контейнер страниц: `max-w-7xl mx-auto px-4 md:px-8`
- Сетка каталога: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Секции: `py-12 md:py-20`
- Карточки: `p-4 md:p-6 rounded-lg bg-c-white border border-c-border`

---

## Карточка кемпера (шаблон)

```
┌─────────────────────────────────┐
│  [Фото кемпера]  (aspect 4/3)   │
├─────────────────────────────────┤
│  Название кемпера               │
│  ★ Двигатель · Кроватей · Бак   │
│  Цена: X 000 ₽ / сутки          │
│  [Подробнее →]  (outline)       │
└─────────────────────────────────┘
```

---

## Header

```
[RAMBLERS лого]      [Главная]  [Каталог]
```
- Фон: `bg-c-white border-b border-c-border`
- Лого: `text-xl font-bold text-c-accent`
- Ссылки: `text-c-headline hover:text-c-accent transition-colors`
- Активная ссылка: `text-c-accent font-semibold`

---

## Адаптивность (обязательно)

- Мобильный (default): одна колонка, стек вертикальный
- Планшет `md:` (768px): две колонки
- Десктоп `lg:` (1024px): три и более колонок
- Шапка на мобильном: бургер-меню или горизонтальный список с `overflow-x-auto`

---

## Состояния загрузки

- Скелетоны: `animate-pulse bg-c-border rounded-md`
- Кнопки в загрузке: `opacity-60 cursor-not-allowed` + текст "Загрузка..."

---

## Запрещённые практики

1. Произвольные цвета Tailwind (`text-red-500`, `bg-blue-300`) — только `c-*`
2. Inline-стили `style={{}}` — только Tailwind классы
3. Создание новых примитивных компонентов вместо использования существующих из `ui/`
4. `any` в TypeScript
