export const HERO_IMG = 'https://cdn.poehali.dev/projects/010cdc45-b2f6-47e5-b9eb-221033457d47/files/f14278c0-5117-4493-a6bb-63444ef98724.jpg';

export const NAV = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'disassembly', label: 'Разборка' },
  { id: 'parts', label: 'Запчасти' },
];

export const UNITS = [
  { name: 'Двигатель V6', code: 'ENG-V6-24', type: 'Авто', parts: 248, status: 'OK', icon: 'Cog' },
  { name: 'КПП роботизированная', code: 'TRN-DSG-7', type: 'Авто', parts: 162, status: 'WARN', icon: 'Settings2' },
  { name: 'Тормозная система', code: 'BRK-ABS-4', type: 'Авто', parts: 86, status: 'OK', icon: 'Disc3' },
  { name: 'Подвеска передняя', code: 'SUS-FR-22', type: 'Мото', parts: 54, status: 'OK', icon: 'Waypoints' },
  { name: 'Сцепление', code: 'CLT-MT-09', type: 'Мото', parts: 41, status: 'CRIT', icon: 'CircleDot' },
  { name: 'Система впуска', code: 'INT-TBO-3', type: 'Авто', parts: 73, status: 'OK', icon: 'Wind' },
];

export const DIAGNOSTICS = [
  { label: 'Давление масла', value: 92, unit: '%', color: 'primary' },
  { label: 'Ресурс ремня ГРМ', value: 64, unit: '%', color: 'primary' },
  { label: 'Износ сцепления', value: 38, unit: '%', color: 'accent' },
  { label: 'Температура агрегата', value: 78, unit: '%', color: 'primary' },
];

export const STEPS = [
  { n: 1, title: 'Снятие защитного кожуха', tool: 'Ключ Torx T30', time: '4 мин' },
  { n: 2, title: 'Отключение разъёмов датчиков', tool: 'Съёмник фишек', time: '6 мин' },
  { n: 3, title: 'Демонтаж навесного оборудования', tool: 'Головка 13 мм', time: '12 мин' },
  { n: 4, title: 'Извлечение основного узла', tool: 'Подъёмная траверса', time: '15 мин' },
];

export const PARTS = [
  { name: 'Поршневая группа', code: 'PST-117', price: 12400 },
  { name: 'Комплект ГРМ', code: 'TMG-204', price: 8750 },
  { name: 'Сцепление в сборе', code: 'CLT-339', price: 15200 },
  { name: 'Турбокомпрессор', code: 'TBO-051', price: 34900 },
];

export type CartItem = { code: string; name: string; price: number; qty: number };

export type Part = { name: string; code: string; price: number };

export type VinResult = { found: boolean; car?: string; year?: string; parts?: Part[] } | null;

export const fmt = (n: number) => n.toLocaleString('ru-RU');

export const statusColor = (s: string) =>
  s === 'OK' ? 'text-primary' : s === 'WARN' ? 'text-yellow-400' : 'text-destructive';
