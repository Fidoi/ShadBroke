import { Comuna, Provincia, Region } from './region.interface';

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  region: Region;
  provincia: Provincia;
  comuna: Comuna;
  phone: string;
}
