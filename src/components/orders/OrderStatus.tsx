import { Badge } from '../ui/badge';

interface Props {
  isPaid: boolean;
}
export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <Badge variant={isPaid ? 'success' : 'destructive'}>
      {isPaid ? 'Pagado' : 'No pagado'}
    </Badge>
  );
};
