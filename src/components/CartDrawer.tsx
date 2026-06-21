import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { CartItem, fmt } from '@/components/data';

interface CartDrawerProps {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  onClose: () => void;
  onChangeQty: (code: string, delta: number) => void;
  onRemove: (code: string) => void;
}

export default function CartDrawer({ cartItems, cartCount, cartTotal, onClose, onChangeQty, onRemove }: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in-up" onClick={onClose} />
      <aside className="absolute top-0 right-0 h-full w-full max-w-md bg-card border-l border-primary/30 border-glow flex flex-col" style={{ animation: 'fade-in-up 0.3s ease' }}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} className="text-primary" />
            <span className="font-display font-bold text-lg uppercase tracking-wider">Корзина</span>
            <span className="font-mono text-xs text-muted-foreground">/ {cartCount} шт</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
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
                  <button onClick={() => onChangeQty(item.code, -1)} className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <Icon name="Minus" size={14} />
                  </button>
                  <span className="font-mono text-sm w-5 text-center">{item.qty}</span>
                  <button onClick={() => onChangeQty(item.code, 1)} className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <Icon name="Plus" size={14} />
                  </button>
                  <button onClick={() => onRemove(item.code)} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
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
  );
}
