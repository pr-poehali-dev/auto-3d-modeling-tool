import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import AppHeader from '@/components/AppHeader';
import CartDrawer from '@/components/CartDrawer';
import VinModal from '@/components/VinModal';
import { HERO_IMG, UNITS, DIAGNOSTICS, STEPS, PARTS, CartItem, Part, statusColor, fmt } from '@/components/data';

function SectionHead({ tag, title, desc, align = 'center' }: { tag: string; title: string; desc: string; align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}>
      <div className="font-mono text-xs text-primary uppercase tracking-widest mb-3">◢ {tag}</div>
      <h2 className="font-display font-bold text-4xl uppercase">{title}</h2>
      <p className="text-muted-foreground mt-3">{desc}</p>
    </div>
  );
}

export default function Index() {
  const [activeStep, setActiveStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [vinOpen, setVinOpen] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0);

  const addToCart = (p: Part) => {
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
      <AppHeader
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onVinOpen={() => setVinOpen(true)}
      />

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
            <a
              href="#"
              title="Скоро в RuStore"
              className="inline-flex items-center gap-3 px-5 py-3 border border-border/60 hover:border-primary/60 bg-card/60 hover:bg-card transition-all clip-tech group w-fit"
            >
              <div className="w-9 h-9 flex items-center justify-center bg-[#1A1A2E] rounded-lg shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h7v7H4V4Z" fill="#0088FF" />
                  <path d="M13 4h7v7h-7V4Z" fill="#0088FF" opacity=".6" />
                  <path d="M4 13h7v7H4v-7Z" fill="#0088FF" opacity=".6" />
                  <path d="M13 13h7v7h-7v-7Z" fill="#0088FF" opacity=".3" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono leading-none mb-0.5">Скачать в</div>
                <div className="font-display font-bold text-base leading-none group-hover:text-primary transition-colors">RuStore</div>
              </div>
              <span className="ml-2 text-[9px] font-mono text-yellow-400 border border-yellow-400/40 px-1.5 py-0.5 uppercase tracking-wider">Скоро</span>
            </a>
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

      {vinOpen && (
        <VinModal
          onClose={() => setVinOpen(false)}
          onAddToCart={addToCart}
        />
      )}

      {cartOpen && (
        <CartDrawer
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onRemove={removeItem}
        />
      )}
    </div>
  );
}