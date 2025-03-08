import { Badge } from '@/components/ui/badge';
interface Props {
  discount: number;
}

export const DiscountBadge = ({ discount }: Props) => {
  return <Badge variant='success'>{discount}% off</Badge>;
};
