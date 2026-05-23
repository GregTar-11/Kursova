# План разработки Ramblers — Чек-лист задач

_Последнее обновление: 2026-05-23. Сверяйся с этим файлом перед каждым шагом._

---

## Фаза 1 — Фундамент ✅ ЗАВЕРШЕНА

- [x] Инициализация проекта Next.js 16.2.6 + TypeScript + Tailwind CSS v4
- [x] `src/lib/firebase.ts` — инициализация Firebase (db, auth)
- [x] `src/types/index.ts` — типы Camper, Order, AppUser, CamperFeatures
- [x] `src/app/globals.css` — brand-переменные Tailwind v4 (c-accent, c-secondary, c-bg и т.д.)
- [x] `src/app/layout.tsx` — корневой layout с метаданными и шрифтом Inter
- [x] `src/app/(client)/layout.tsx` — клиентский layout-wrapper (заглушка)
- [x] `src/app/(client)/page.tsx` — главная страница (ЗАГЛУШКА — нужна реализация)
- [x] `src/constant/routes.ts` — все маршруты приложения
- [x] `src/constant/collections.ts` — имена коллекций Firestore
- [x] `src/constant/regular.ts` — константы валидации (regex, лимиты, статусы)
- [x] `src/schemas/index.ts` — Yup схемы (loginSchema, orderSchema, camperSchema)
- [x] `src/helpers/cn.ts` — утилита объединения CSS классов (clsx + tailwind-merge)
- [x] `src/helpers/formatDate.ts` — форматирование дат в ru-RU локали
- [x] `src/services/auth.service.ts` — login, logout, getUser
- [x] `src/services/camper.service.ts` — getAll, getTopAvailable, getById, create, update, delete
- [x] `src/services/order.service.ts` — create, getAll, updateStatus, subscribeToOrders
- [x] `src/context/AuthContext.tsx` — провайдер + хук useAuth
- [x] `src/hooks/useFormCustom.ts` — обёртка react-hook-form с yupResolver
- [x] `src/lib/notifier.ts` — Singleton для уведомлений (react-hot-toast)
- [x] `src/components/ui/Button.tsx` — кнопки (primary|outline|ghost|error, small|medium|big)
- [x] `src/components/ui/Input.tsx` — текстовое поле с ошибками валидации
- [x] `src/components/ui/InputPassword.tsx` — поле пароля с toggle видимости
- [x] `src/components/ui/ErrorMessage.tsx` — компонент сообщения об ошибке
- [x] `src/components/ui/Form.tsx` — FormProvider обёртка (big|small|full)
- [x] `src/components/ui/Textarea.tsx` — многострочное поле (maxLength=1000)
- [x] `src/components/ui/ToastMessage/ToastMessage.tsx` — кастомный toast компонент
- [x] `src/components/ui/ToastMessage/renderCustomToast.tsx` — утилита создания toast

---

## Фаза 2 — Публичная часть (клиентская) 🔄 В РАБОТЕ

### 2.1 Шапка и подвал
- [x] `src/components/features/Header/Header.tsx` — навигация (лого, ссылки Главная / Каталог)
- [x] `src/components/features/Footer/Footer.tsx` — простой footer с копирайтом
- [x] `src/components/Providers.tsx` — AuthProvider + Toaster (добавлен в root layout)
- [x] Обновить `src/app/(client)/layout.tsx` — добавить Header + Footer + Toaster

### 2.2 Карточка кемпера (переиспользуется на главной и в каталоге)
- [ ] `src/components/features/CamperCard/CamperCard.tsx` — карточка кемпера (фото, цена, характеристики, кнопка)

### 2.3 Форма заказа (переиспользуется на главной и на странице кемпера)
- [ ] `src/components/features/OrderForm/OrderForm.tsx` — форма (имя, телефон, camperId скрытый), submit → order.service.create

### 2.4 Главная страница — полная реализация
- [ ] `src/app/(client)/page.tsx` — секция Hero (промо-баннер, кнопка в каталог)
- [ ] `src/app/(client)/page.tsx` — секция TopCampers (SSR, getTopAvailable, 4 карточки)
- [ ] `src/app/(client)/page.tsx` — секция с формой быстрого заказа (без camperId)

### 2.5 Страница каталога
- [ ] `src/components/features/CatalogFilters/CatalogFilters.tsx` — фильтры (статус, цена min/max)
- [ ] `src/app/(client)/catalog/page.tsx` — список всех кемперов + фильтры (Client Component)

### 2.6 Страница кемпера (SSR)
- [ ] `src/app/(client)/catalog/[id]/page.tsx` — SSR страница: getById + generateMetadata, детали кемпера + OrderForm

---

## Фаза 3 — Панель администратора

### 3.1 Авторизация
- [ ] `src/app/admin/login/page.tsx` — форма входа (email + пароль, auth.service.login)
- [ ] `src/app/admin/layout.tsx` — Admin Guard: проверка useAuth → redirect на /admin/login если не авторизован

### 3.2 Дашборд / Заказы
- [ ] `src/components/features/OrdersTable/OrdersTable.tsx` — таблица заказов с реал-тайм подпиской
- [ ] `src/app/admin/page.tsx` — страница управления заказами (таблица + смена статуса)

### 3.3 Управление кемперами
- [ ] `src/components/features/CamperForm/CamperForm.tsx` — форма создания/редактирования кемпера
- [ ] `src/app/admin/campers/page.tsx` — список кемперов + кнопки редактировать/удалить + форма создания

---

## Фаза 4 — Завершение

- [ ] `.env.local` — шаблон переменных Firebase (NEXT_PUBLIC_FIREBASE_*)
- [ ] `.claude/rules/frontend-style-guide.md` — документация дизайн-системы
- [ ] Финальный тест: все страницы, формы, CRUD кемперов, смена статуса заказов
- [ ] Проверка адаптивности (мобильный / десктоп)

---

## Следующая микро-задача ▶️

**2.1.1** — Создать `src/components/features/Header/Header.tsx` (навигация с логотипом и ссылками), затем `Footer.tsx`, затем обновить клиентский layout.

---

## Лог выполнения

### 2026-05-23 — Сессия 1: Аудит + Фундамент

**Сделано:**
- Проведён аудит `src/` — обнаружено 27 файлов (Фаза 1 полностью готова)
- Создан `frontend-style-guide.md` в `.claude/rules/`
- Создан этот файл `tasks-completed.md`

**Сделано в этой же сессии (шаг 2.1):**
- `src/components/Providers.tsx` — клиентская обёртка AuthProvider + Toaster
- `src/components/features/Header/Header.tsx` — навигация с активной ссылкой через usePathname
- `src/components/features/Footer/Footer.tsx` — подвал с копирайтом и ссылками
- `src/app/layout.tsx` — обновлён: добавлен `<Providers>`, исправлен `lang="ru"`
- `src/app/(client)/layout.tsx` — обновлён: Header + main + Footer, flex min-h-screen

**TypeScript:** ошибок нет (tsc --noEmit → exit 0)

**Следующий шаг:** 2.2 — `CamperCard` компонент

### 2026-05-23 — Шаг 2.2: CamperCard

**Сделано:**
- `src/components/features/CamperCard/CamperCard.tsx` — Server Component, принимает `camper: Camper`
  - Изображение через `next/image` (aspect 4/3, fill + sizes)
  - Бейдж статуса (available → зелёный, booked → серый)
  - Характеристики: двигатель, кровати, бак
  - Цена в формате ru-RU с ₽
  - Кнопка-ссылка "Подробнее →" (variant outline)
- TypeScript: ошибок нет

**Следующий шаг:** 2.3 — `OrderForm` компонент, затем 2.4 — полная главная страница

### 2026-05-23 — Глобальный перевод UI на украинский язык

**Изменено:**
- `src/app/layout.tsx` — metadata title/description → uk
- `src/components/features/Header/Header.tsx` — "Головна", "Каталог"
- `src/components/features/Footer/Footer.tsx` — "Усі права захищені", ссылки → uk
- `src/constant/regular.ts` — CAMPER_STATUS_LABELS и ORDER_STATUS_LABELS → uk
- `src/schemas/index.ts` — все validation messages → uk, телефон формат +380XXXXXXXXX
- `src/helpers/formatDate.ts` — локаль ru-RU → uk-UA
- `src/components/features/CamperCard/CamperCard.tsx` — "ліжка", "л бак", "Детальніше →", ₽→₴, "доба", uk-UA, метки берутся из CAMPER_STATUS_LABELS

**Правило:** весь UI — украинский (₴, uk-UA). Общение с разработчиком — русский.

**Следующий шаг:** 2.3 — OrderForm компонент

### 2026-05-23 — Шаг 2.3: OrderForm

**Сделано:**
- `src/components/features/OrderForm/OrderForm.tsx` — Client Component
  - Принимает `camperId?: string` (пустая строка = быстрый заказ без конкретного кемпера)
  - `useFormCustom` + `orderSchema` (валидация: ім'я, телефон)
  - Скрытый input для camperId
  - При успехе → `notifier.success` с украинским текстом
  - Кнопка: "Замовити" / "Відправлення..." во время отправки
- TypeScript: ошибок нет

**Следующий шаг:** 2.4 — Полная главная страница (Hero + TopCampers + OrderForm)

### 2026-05-23 — Шаг 2.4: Головна сторінка (повна реалізація)

**Сделано:**
- `src/app/(client)/page.tsx` — async Server Component, три секції:
  1. **Hero** — `bg-c-secondary`, заголовок "Мандруй у своєму темпі", підзаголовок, кнопка → каталог
  2. **Топ пропозиції** — SSR через `CamperService.getTopAvailable()`, сітка 1→2→3→4 колонки, кнопка "Весь каталог", empty state якщо немає кемперів
  3. **Швидке замовлення** — `OrderForm` без camperId (загальна заявка)
- Помилки Firebase обробляються через `.catch(() => [])` — сторінка не падає
- TypeScript: ошибок нет

**Следующий шаг:** 2.5 — Сторінка каталогу (фільтри + сітка всіх кемперів)

### 2026-05-23 — Шаг 2.5: Сторінка каталогу

**Сделано:**
- `src/app/(client)/catalog/page.tsx` — Server Component, SSR-запит `CamperService.getAll()`, metadata, шапка сторінки
- `src/components/features/CatalogContent/CatalogContent.tsx` — Client Component:
  - Фільтр статусу: таб-кнопки "Усі / Доступний / Заброньований"
  - Фільтр ціни: два інпути "від / до" з перевіркою на цифри
  - Кнопка "Скинути фільтри" (з'являється при активних фільтрах)
  - Лічильник "Знайдено: N кемперів"
  - Сітка адаптивна 1→2→3→4, empty state
  - Фільтрація через useMemo на клієнті
- TypeScript: ошибок нет

**Следующий шаг:** 2.6 — Сторінка кемпера [id] (SSR + generateMetadata + OrderForm)

### 2026-05-23 — Рефакторинг: хук useCatalogFilters

**Сделано:**
- `src/hooks/useCatalogFilters.ts` — окремий хук, експортує `CatalogFilters` інтерфейс + логіку: `filters`, `filtered`, `setStatus`, `setPrice`, `resetFilters`, `hasActiveFilters`
- `CatalogContent.tsx` — очищений від логіки, тільки UI; використовує `useCatalogFilters`
- TypeScript: ошибок нет

**Следующий шаг:** 2.6 — Сторінка кемпера [id]

### 2026-05-23 — Шаг 2.6: Сторінка кемпера [id]

**Сделано:**
- `src/app/(client)/catalog/[id]/page.tsx` — async Server Component
  - `await params` (Next.js 16 — params це Promise)
  - `generateMetadata` — динамічний title + description (перші 160 символів)
  - `notFound()` якщо кемпер не знайдено
  - Hero image (aspect 16/6, priority)
  - Посилання "← Назад до каталогу"
  - Бейдж статусу (зелений/сірий)
  - Ціна з форматуванням uk-UA + ₴/доба
  - Характеристики у трьох картках (двигун, місця, бак)
  - Опис з `whitespace-pre-line`
  - `OrderForm` з `camperId` у sticky-блоці праворуч
  - Desktop: 2 колонки (деталі + форма), mobile: стек
- TypeScript: ошибок нет

**Фаза 2 ЗАВЕРШЕНА ✅**
**Следующий шаг:** Фаза 3 — Адмін-панель: login + guard layout
