import CartIcon from '@/components/icons/CartIcon';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
import { Separator } from '../ui/separator';

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <CartIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className='text-primary mb-6'>
            Carrito de compras
          </SheetTitle>
          <Separator />
          <SheetDescription asChild>
            <div>
              <ProductsInCart />
            </div>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <OrderSummary />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
