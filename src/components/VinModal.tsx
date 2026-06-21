import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { PARTS, Part, VinResult, fmt } from '@/components/data';

interface VinModalProps {
  onClose: () => void;
  onAddToCart: (p: Part) => void;
}

export default function VinModal({ onClose, onAddToCart }: VinModalProps) {
  const [vin, setVin] = useState('');
  const [vinResult, setVinResult] = useState<VinResult>(null);

  const searchByVin = () => {
    if (!vin.trim()) return;
    const found = vin.trim().length >= 5;
    setVinResult(found
      ? { found: true, car: 'Toyota Land Cruiser 200', year: '2018', parts: PARTS.slice(0, 3) }
      : { found: false }
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-card border border-primary/40 border-glow clip-tech animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="ScanSearch" size={18} className="text-primary" />
            <span className="font-display font-bold uppercase tracking-widest">Поиск по VIN</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
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
                        onClick={() => { onAddToCart(p); onClose(); }}
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
  );
}
