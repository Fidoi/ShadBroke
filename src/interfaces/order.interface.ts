import { User } from './user.interface';

export interface Order {
  id: string;
  total: number;
  subTotal: number;
  itemsInOrder: number;
  isPaid: boolean;
  createdAt: string;
  user: Pick<User, 'name' | 'email' | 'image'>;
  transactionId?: string | null;
}
