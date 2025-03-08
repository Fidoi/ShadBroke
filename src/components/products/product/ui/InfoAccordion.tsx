import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BadgeCheck, Shirt, Truck } from 'lucide-react';

export const InfoAccordion = () => {
  return (
    <Accordion type='single' collapsible className='w-full '>
      <AccordionItem value='item-1'>
        <AccordionTrigger className='hover:no-underline'>
          <span className='flex flex-row gap-x-2'>
            <BadgeCheck />
            Características
          </span>
        </AccordionTrigger>
        <AccordionContent className='text-gray-600 '>
          ✅ Material de alta calidad: Algodón premium con mezcla de poliéster
          para mayor durabilidad y suavidad.
          <br /> ✅ Diseño: Estilo versátil para cualquier ocasión.
          <br />✅ Variedad de colores: Disponible en varios tonos para todos
          los gustos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger className='hover:no-underline'>
          <span className='flex flex-row gap-x-2'>
            <Shirt />
            Cuidado
          </span>
        </AccordionTrigger>
        <AccordionContent className='text-gray-600'>
          Lavar a mano o en ciclo suave con agua fría, secar al aire.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-3'>
        <AccordionTrigger className='hover:no-underline '>
          <span className='flex flex-row gap-x-2'>
            <Truck />
            Envio
          </span>
        </AccordionTrigger>
        <AccordionContent className='text-gray-600'>
          Envío gratis en todos los pedidos superiores a $20.000
          <br />
          Tiempo estimado de entrega: 3-5 días hábiles.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
