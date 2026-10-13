export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'Все проекты' },
  { id: 'web', label: 'Веб-разработка' },
  { id: 'telegram', label: 'Telegram-боты' },
  { id: 'gamedev', label: 'Игры Unreal & Unity' },
  { id: 'vr', label: 'VR игры' },
  { id: 'tours360', label: 'Виртуальные туры & Фото 360' },
  { id: 'arduino', label: 'Arduino & Микроконтроллеры' },
  { id: 'apps', label: 'Приложения & Сервисы' }
]

export const INITIAL_PROJECTS = [
  {
    id: 'proj-web',
    title: 'DoomHex Cloud Hub & Web-сервисы',
    category: 'Веб-разработка',
    breathing: 'sun',
    description: 'Высоконагруженная веб-платформа с реактивным интерфейсом на React 19, оптимизированной компонентной архитектурой, аналитическими графиками в реальном времени и REST API.',
    tags: ['React 19', 'TypeScript', 'Vite', 'REST API', 'Web Development'],
    demoUrl: 'https://vercel.com',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Production', techStack: 'React / Vite', speed: '< 80ms' },
    date: '2026-03'
  },
  {
    id: 'proj-tg',
    title: 'CyberCrow Telegram Bot & Mini App',
    category: 'Telegram-боты',
    breathing: 'thunder',
    description: 'Интеллектуальный Telegram-бот с привязанным Telegram Mini App (TMA), интеграцией онлайн-оплаты, автоматической выдачей контента и удобной веб-панелью администратора.',
    tags: ['Telegram Bot API', 'Node.js', 'Telegram WebApp', 'PostgreSQL', 'Payments'],
    demoUrl: 'https://t.me',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Active Bot', techStack: 'Node / Telegraf', speed: 'Instant' },
    date: '2026-02'
  },
  {
    id: 'proj-games',
    title: 'Shadow Blade: 3D Arena (Unreal Engine 5 & Unity)',
    category: 'Игры Unreal & Unity',
    breathing: 'moon',
    description: 'Динамичный 3D слэшер с кинематографичным неоновым освещением Lumen в Unreal Engine 5 и мобильным портом на Unity. Физическая боёвка на клинках, система комбо и спецэффекты.',
    tags: ['Unreal Engine 5', 'Unity 3D', 'C++', 'C#', 'GameDev', '60 FPS'],
    demoUrl: 'https://github.com/Doomhex',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Playable Demo', techStack: 'UE5 / Unity', speed: 'Smooth 60fps' },
    date: '2026-02'
  },
  {
    id: 'proj-vr',
    title: 'Katana Sanctum VR: Immersion Combat',
    category: 'VR игры',
    breathing: 'water',
    description: 'Иммерсивная VR-игра для гарнитур виртуальной реальности (Meta Quest 2/3, SteamVR) с 6DOF отслеживанием движений рук, физикой разрезания мечом и пространственным звуком.',
    tags: ['Unity XR', 'OpenXR', 'Meta Quest', 'SteamVR', 'Spatial 3D', 'VR Dev'],
    demoUrl: 'https://github.com/Doomhex',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'VR Ready', techStack: 'OpenXR / Unity', speed: '90 FPS VR' },
    date: '2026-01'
  },
  {
    id: 'proj-tours360',
    title: 'Infinity Castle 360: Виртуальный Тур & Панорамы',
    category: 'Виртуальные туры & Фото 360',
    breathing: 'sun',
    description: 'Интерактивный виртуальный 3D-тур на основе панорамных фото 360 высокой четкости. Интерактивные точки перехода, инфо-метки, автоповорот и поддержка гироскопа мобильных телефонов.',
    tags: ['Three.js', 'Panolens', 'WebGL', 'Фото 360', 'Виртуальный тур', 'HDRi'],
    demoUrl: 'https://vercel.com',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Live 360', techStack: 'WebGL / Three.js', speed: 'Ultra HD' },
    date: '2026-01'
  },
  {
    id: 'proj-arduino',
    title: 'CyberBlade RGB Controller & IoT Hub (Arduino)',
    category: 'Arduino & Микроконтроллеры',
    breathing: 'thunder',
    description: 'Аппаратно-программный комплекс на базе микроконтроллеров Arduino и ESP32. Управление адресной светодиодной подсветкой меча, гироскопические датчики взмаха (MPU-6050) и управление по Wi-Fi/Bluetooth.',
    tags: ['Arduino C++', 'ESP32', 'MPU-6050', 'FastLED', 'IoT', 'Микроконтроллеры'],
    demoUrl: 'https://github.com/Doomhex',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Hardware V2', techStack: 'Arduino / C++', speed: 'Realtime' },
    date: '2025-12'
  },
  {
    id: 'proj-apps',
    title: 'SlayerForge: Мультиплатформенный Сервис',
    category: 'Приложения & Сервисы',
    breathing: 'moon',
    description: 'Кроссплатформенное приложение и облачный SaaS-сервис на любой вкус: десктопный и мобильный клиент, синхронизация данных в реальном времени, офлайн-режим и чистая архитектура.',
    tags: ['React', 'Electron', 'Node.js', 'SaaS', 'Tailwind', 'Cross-Platform'],
    demoUrl: 'https://vercel.com',
    githubUrl: 'https://github.com/Doomhex',
    stats: { status: 'Production', techStack: 'React / Electron', speed: '< 50ms' },
    date: '2025-11'
  }
]
