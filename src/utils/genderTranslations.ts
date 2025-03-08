import { Gender } from '@prisma/client';

export const genderTranslations: Record<Gender, string> = {
  men: 'Hombre',
  women: 'Mujer',
  kid: 'Niño',
  unisex: 'Unisex',
};
