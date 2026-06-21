import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { NAV } from '@/components/data';

interface AppHeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onVinOpen: () => void;
}

export default function AppHeader({ cartCount, onCartOpen, onVinOpen }: AppHeaderProps) {
  return (
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
          onClick={onVinOpen}
          className="hidden sm:flex items-center gap-2 px-3 py-2 border border-border hover:border-primary text-muted-foreground hover:text-primary text-sm font-mono uppercase tracking-wider transition-colors clip-tech"
        >
          <Icon name="ScanSearch" size={15} /> VIN-поиск
        </button>
        <Button variant="outline" onClick={onCartOpen} className="relative border-primary/40 hover:border-primary gap-2">
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
  );
}
