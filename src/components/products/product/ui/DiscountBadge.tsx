import { Badge } from '@/components/ui/badge';

interface Props {
  discount: number;
  text?: string;
}

export const DiscountBadge = ({ discount, text }: Props) => {
  return (
    <Badge variant='success'>
      {discount}
      {text}
    </Badge>
  );
};
