import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/010cdc45-b2f6-47e5-b9eb-221033457d47/files/f14278c0-5117-4493-a6bb-63444ef98724.jpg';

const NAV = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'diagnostics', label: 'Диагностика' },
  { id: 'disassembly', label: 'Разборка' },
  { id: 'parts', label: 'Запчасти' },
];

const UNITS = [
  { name: 'Двигатель V6', code: 'ENG-V6-24', type: 'Авто', parts: 248, status: 'OK', icon: 'Cog' },
  { name: 'КПП роботизированная', code: 'TRN-DSG-7', type: 'Авто', parts: 162, status: 'WARN', icon: 'Settings2' },
  { name: 'Тормозная система', code: 'BRK-ABS-4', type: 'Авто', parts: 86, status: 'OK', icon: 'Disc3' },
  { name: 'Подвеска передняя', code: 'SUS-FR-22', type: 'Мото', parts: 54, status: 'OK', icon: 'Waypoints' },
  { name: 'Сцепление', code: 'CLT-MT-09', type: 'Мото', parts: 41, status: 'CRIT', icon: 'CircleDot' },
  { name: 'Система впуска', code: 'INT-TBO-3', type: 'Авто', parts: 73, status: 'OK', icon: 'Wind' },
];

const DIAGNOSTICS = [
  { label: 'Давление масла', value: 92, unit: '%', color: 'primary' },
  { label: 'Ресурс ремня ГРМ', value: 64, unit: '%', color: 'primary' },
  { label: 'Износ сцепления', value: 38, unit: '%', color: 'accent' },
  { label: 'Температура агрегата', value: 78, unit: '%', color: 'primary' },
];

const STEPS = [
  { n: 1, title: 'Снятие защитного кожуха', tool: 'Ключ Torx T30', time: '4 мин' },
  { n: 2, title: 'Отключение разъёмов датчиков', tool: 'Съёмник фишек', time: '6 мин' },
  { n: 3, title: 'Демонтаж навесного оборудования', tool: 'Головка 13 мм', time: '12 мин' },
  { n: 4, title: 'Извлечение основного узла', tool: 'Подъёмная траверса', time: '15 мин' },
];

const PARTS = [
  { name: 'Поршневая группа', code: 'PST-117', price: 12400 },
  { name: 'Комплект ГРМ', code: 'TMG-204', price: 8750 },
  { name: 'Сцепление в сборе', code: 'CLT-339', price: 15200 },
  { name: 'Турбокомпрессор', code: 'TBO-051', price: 34900 },
];

const statusColor = (s: string) =>
  s === 'OK' ? 'text-primary' : s === 'WARN' ? 'text-yellow-400' : 'text-destructive';

type CartItem = { code: string; name: string; price: number; qty: number };

const fmt = (n: number) => n.toLocaleString('ru-RU');

export default function Index() {
  const [activeStep, setActiveStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [vinOpen, setVinOpen] = useState(false);
  const [vin, setVin] = useState('');
  const [vinResult, setVinResult] = useState<null | { found: boolean; car?: string; year?: string; parts?: typeof PARTS }>(null);

  const searchByVin = () => {
    if (!vin.trim()) return;
    const found = vin.trim().length >= 5;
    setVinResult(found
      ? { found: true, car: 'Toyota Land Cruiser 200', year: '2018', parts: PARTS.slice(0, 3) }
      : { found: false }
    );
  };

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  const addToCart = (p: { code: string; name: string; price: number }) => {
    setCartItems((prev) => {
      const ex = prev.find((i) => i.code === p.code);
      if (ex) return prev.map((i) => (i.code === p.code ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const changeQty = (code: string, delta: number) =>
    setCartItems((prev) =>
      prev
        .map((i) => (i.code === code ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );

  const removeItem = (code: string) => setCartItems((prev) => prev.filter((i) => i.code !== code));

  return (
    <div className="min-h-screen grid-bg">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/80">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground clip-tech">
              <Icon name="Boxes" size={20} />
            </div>
            <span className="font-display font-bold text-xl tracking-widest">TORQ<span className="text-primary">3D</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => { setVinOpen(true); setVinResult(null); setVin(''); }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 border border-border hover:border-primary text-muted-foreground hover:text-primary text-sm font-mono uppercase tracking-wider transition-colors clip-tech"
          >
            <Icon name="ScanSearch" size={15} /> VIN-поиск
          </button>
          <Button variant="outline" onClick={() => setCartOpen(true)} className="relative border-primary/40 hover:border-primary gap-2">
            <Icon name="ShoppingCart" size={16} />
            <span className="font-mono">{cartCount}</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-primary text-primary-foreground text-[10px] font-mono rounded-full">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="container grid lg:grid-cols-2 gap-10 items-center py-20">
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/40 text-primary text-xs font-mono uppercase tracking-widest clip-tech">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-ring" />
              System Online · v2.4
            </div>
            <h1 className="font-display font-bold text-5xl md:text-6xl leading-[1.05] uppercase">
              3D-моделирование <span className="text-primary text-glow">узлов</span> авто и мото
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Интерактивный разбор агрегатов, мгновенная диагностика работоспособности и точный подбор запчастей по марке и модели.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 border-glow font-display uppercase tracking-wider">
                <Icon name="Scan" size={18} /> Открыть редактор
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-primary/30 font-display uppercase tracking-wider">
                <Icon name="PlayCircle" size={18} /> Демо
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              {[['1 240+', 'моделей узлов'], ['98%', 'точность подбора'], ['24/7', 'диагностика']].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display font-bold text-2xl text-primary">{v}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float-slow">
            <div className="relative clip-tech border-glow overflow-hidden">
              <img src={HERO_IMG} alt="3D модель двигателя" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute top-4 left-4 font-mono text-xs text-primary bg-background/70 px-2 py-1">
                ◢ ENG-V6-24 · RENDER MODE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="container py-20">
        <SectionHead tag="01 / Каталог" title="Библиотека 3D-узлов" desc="Авто и мото агрегаты с детальным просмотром каждого компонента" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {UNITS.map((u, i) => (
            <div
              key={u.code}
              className="group relative bg-card border border-border hover:border-primary/60 clip-tech p-6 transition-all hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary text-primary clip-tech group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name={u.icon} size={24} />
                </div>
                <span className={`font-mono text-xs ${statusColor(u.status)}`}>● {u.status}</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground mb-1">{u.code}</div>
              <h3 className="font-display font-semibold text-xl mb-3">{u.name}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground"><Icon name="Layers" size={14} className="inline mr-1" />{u.parts} деталей</span>
                <span className="px-2 py-0.5 border border-border text-xs uppercase tracking-wider text-muted-foreground">{u.type}</span>
              </div>
              <button className="mt-5 w-full flex items-center justify-center gap-2 py-2 border border-primary/30 text-primary text-sm uppercase tracking-wider font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon name="Eye" size={15} /> Просмотр 3D
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* DIAGNOSTICS */}
      <section id="diagnostics" className="border-y border-border/60 bg-card/30">
        <div className="container py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHead tag="02 / Диагностика" title="Проверка работоспособности" desc="Анализ состояния агрегата в реальном времени по ключевым параметрам" align="left" />
            <div className="space-y-6 mt-10">
              {DIAGNOSTICS.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground uppercase tracking-wider">{d.label}</span>
                    <span className="font-mono text-primary">{d.value}{d.unit}</span>
                  </div>
                  <div className="h-2 bg-secondary overflow-hidden">
                    <div
                      className={`h-full ${d.color === 'accent' ? 'bg-accent' : 'bg-primary'}`}
                      style={{ width: `${d.value}%`, boxShadow: '0 0 12px currentColor' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-card border border-primary/30 border-glow clip-tech p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-primary uppercase">Сводный отчёт</span>
              <Icon name="Activity" size={18} className="text-primary" />
            </div>
            <div className="text-center py-6">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(220 35% 14%)" strokeWidth="6" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(187 95% 50%)" strokeWidth="6"
                    strokeDasharray="264" strokeDashoffset="48" strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <div className="font-display font-bold text-4xl text-primary text-glow">82</div>
                  <div className="text-xs text-muted-foreground uppercase">из 100</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground text-sm">Агрегат исправен. Рекомендуется замена ремня ГРМ через ~8 000 км.</p>
            </div>
            <Button className="w-full gap-2 font-display uppercase tracking-wider">
              <Icon name="FileText" size={16} /> Полный отчёт
            </Button>
          </div>
        </div>
      </section>

      {/* DISASSEMBLY */}
      <section id="disassembly" className="container py-20">
        <SectionHead tag="03 / Виртуальная разборка" title="Пошаговый демонтаж узла" desc="Последовательность операций с указанием необходимого инструмента" />
        <div className="grid lg:grid-cols-2 gap-10 mt-12">
          <div className="space-y-3">
            {STEPS.map((s) => (
              <button
                key={s.n}
                onClick={() => setActiveStep(s.n)}
                className={`w-full text-left flex items-center gap-4 p-5 border transition-all clip-tech ${
                  activeStep === s.n ? 'border-primary bg-card border-glow' : 'border-border bg-card/40 hover:border-primary/40'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center font-display font-bold clip-tech shrink-0 ${
                  activeStep === s.n ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'
                }`}>
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold">{s.title}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5">
                    <Icon name="Wrench" size={12} className="inline mr-1" />{s.tool}
                  </div>
                </div>
                <span className="font-mono text-xs text-primary">{s.time}</span>
              </button>
            ))}
          </div>
          <div className="relative bg-card border border-border clip-tech overflow-hidden flex items-center justify-center min-h-[340px]">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute top-0 left-0 right-0 h-px bg-primary/60" style={{ animation: 'scan-line 3s linear infinite' }} />
            <div className="relative text-center animate-fade-in-up" key={activeStep}>
              <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center border-2 border-primary/40 text-primary rounded-full animate-pulse-ring">
                <Icon name="Boxes" size={44} />
              </div>
              <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1">Шаг {activeStep} / {STEPS.length}</div>
              <div className="font-display font-semibold text-xl px-6">{STEPS[activeStep - 1].title}</div>
              <div className="text-muted-foreground text-sm mt-2">Инструмент: {STEPS[activeStep - 1].tool}</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTS */}
      <section id="parts" className="border-t border-border/60 bg-card/30">
        <div className="container py-20">
          <SectionHead tag="04 / Запчасти" title="Подбор по марке и модели" desc="Совместимые комплектующие с добавлением в корзину" />
          <div className="max-w-3xl mx-auto mt-10 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-background border border-border px-4 py-3 clip-tech">
              <Icon name="Car" size={18} className="text-primary" />
              <input placeholder="Марка авто / мото" className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground" />
            </div>
            <div className="flex-1 flex items-center gap-2 bg-background border border-border px-4 py-3 clip-tech">
              <Icon name="Hash" size={18} className="text-primary" />
              <input placeholder="Модель / VIN" className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground" />
            </div>
            <Button className="gap-2 font-display uppercase tracking-wider px-8">
              <Icon name="Search" size={16} /> Найти
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {PARTS.map((p, i) => (
              <div key={p.code} className="bg-card border border-border hover:border-primary/60 clip-tech p-5 transition-all animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="aspect-square bg-secondary/60 clip-tech flex items-center justify-center mb-4">
                  <Icon name="Cog" size={40} className="text-primary/60" />
                </div>
                <div className="font-mono text-xs text-muted-foreground">{p.code}</div>
                <h4 className="font-display font-semibold mb-2">{p.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-primary">{fmt(p.price)} ₽</span>
                  <button onClick={() => addToCart(p)} className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground clip-tech hover:opacity-90 transition-opacity">
                    <Icon name="Plus" size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground clip-tech">
              <Icon name="Boxes" size={18} />
            </div>
            <span className="font-display font-bold tracking-widest">TORQ<span className="text-primary">3D</span></span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">© 2026 · 3D диагностика и подбор запчастей</p>
          <div className="flex gap-3">
            {['Send', 'Github', 'Mail'].map((ic) => (
              <a key={ic} href="#" className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Icon name={ic} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* VIN SEARCH MODAL */}
      {vinOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setVinOpen(false)} />
          <div className="relative w-full max-w-xl bg-card border border-primary/40 border-glow clip-tech animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="ScanSearch" size={18} className="text-primary" />
                <span className="font-display font-bold uppercase tracking-widest">Поиск по VIN</span>
              </div>
              <button onClick={() => setVinOpen(false)} className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-muted-foreground text-sm">Введите 17-значный VIN автомобиля или мотоцикла для автоматического подбора совместимых запчастей.</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-background border border-border focus-within:border-primary px-4 py-3 clip-tech transition-colors">
                  <Icon name="Hash" size={16} className="text-primary shrink-0" />
                  <input
                    value={vin}
                    onChange={(e) => { setVin(e.target.value.toUpperCase()); setVinResult(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && searchByVin()}
                    placeholder="XTA210990Y2763456"
                    maxLength={17}
                    className="bg-transparent flex-1 outline-none font-mono text-sm tracking-widest placeholder:text-muted-foreground/50 uppercase"
                  />
                  {vin && (
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">{vin.length}/17</span>
                  )}
                </div>
                <Button onClick={searchByVin} className="gap-2 font-display uppercase tracking-wider shrink-0">
                  <Icon name="Search" size={15} /> Найти
                </Button>
              </div>

              {vinResult && !vinResult.found && (
                <div className="flex items-center gap-3 p-4 border border-destructive/40 bg-destructive/10 clip-tech text-sm">
                  <Icon name="AlertCircle" size={16} className="text-destructive shrink-0" />
                  <span>Автомобиль по данному VIN не найден. Проверьте правильность ввода.</span>
                </div>
              )}

              {vinResult?.found && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="flex items-center gap-3 p-4 border border-primary/30 bg-primary/5 clip-tech">
                    <Icon name="Car" size={18} className="text-primary shrink-0" />
                    <div>
                      <div className="font-display font-semibold">{vinResult.car}</div>
                      <div className="font-mono text-xs text-muted-foreground">Год: {vinResult.year} · VIN: {vin}</div>
                    </div>
                    <span className="ml-auto text-xs font-mono text-primary bg-primary/10 px-2 py-1">● НАЙДЕН</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">◢ Совместимые запчасти</div>
                    <div className="space-y-2">
                      {vinResult.parts?.map((p) => (
                        <div key={p.code} className="flex items-center gap-3 p-3 bg-secondary/40 border border-border clip-tech">
                          <Icon name="Cog" size={16} className="text-primary shrink-0" />
                          <span className="flex-1 font-display text-sm">{p.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{p.code}</span>
                          <span className="font-display font-bold text-primary text-sm">{fmt(p.price)} ₽</span>
                          <button
                            onClick={() => { addToCart(p); setVinOpen(false); }}
                            className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground clip-tech hover:opacity-90 transition-opacity shrink-0"
                          >
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in-up" onClick={() => setCartOpen(false)} />
          <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-primary/30 border-glow flex flex-col" style={{ animation: 'fade-in-up 0.3s ease' }}>
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="ShoppingCart" size={20} className="text-primary" />
                <span className="font-display font-bold text-lg uppercase tracking-wider">Корзина</span>
                <span className="font-mono text-xs text-muted-foreground">/ {cartCount} шт</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-20">
                  <Icon name="PackageOpen" size={48} className="text-primary/40 mb-4" />
                  <p className="font-display uppercase tracking-wider">Корзина пуста</p>
                  <p className="text-sm mt-1">Добавьте запчасти из каталога</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.code} className="flex items-center gap-3 bg-secondary/40 border border-border clip-tech p-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-card text-primary clip-tech shrink-0">
                      <Icon name="Cog" size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] text-muted-foreground">{item.code}</div>
                      <div className="font-display font-semibold text-sm truncate">{item.name}</div>
                      <div className="text-primary font-mono text-sm">{fmt(item.price)} ₽</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => changeQty(item.code, -1)} className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="font-mono text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(item.code, 1)} className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <Icon name="Plus" size={14} />
                      </button>
                      <button onClick={() => removeItem(item.code)} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm">Итого</span>
                  <span className="font-display font-bold text-2xl text-primary text-glow">{fmt(cartTotal)} ₽</span>
                </div>
                <Button className="w-full gap-2 font-display uppercase tracking-wider">
                  <Icon name="CreditCard" size={16} /> Оформить заказ
                </Button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function SectionHead({ tag, title, desc, align = 'center' }: { tag: string; title: string; desc: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}>
      <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">◢ {tag}</div>
      <h2 className="font-display font-bold text-4xl uppercase">{title}</h2>
      <p className="text-muted-foreground mt-3">{desc}</p>
    </div>
  );
}