import { Headphones, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Banner = () => {
  return (
    <div className='w-full bg-white py-6'>
      <div className='container mx-auto flex flex-wrap justify-between gap-6 px-4 md:px-8'>
        {/* Item 1 */}
        <div className='flex items-center gap-3'>
          <Headphones className='w-8 h-8 text-gray-700' />
          <div>
            <h5 className='text-lg font-semibold'>Atención 24/7</h5>
            <p className='text-sm text-gray-500'>
              Servicio al cliente disponible todo el día
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className='flex items-center gap-3'>
          <ShieldCheck className='w-8 h-8 text-gray-700' />
          <div>
            <h5 className='text-lg font-semibold'>Seguro</h5>
            <p className='text-sm text-gray-500'>
              Marketplace certificado desde 2025
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className='flex items-center gap-3'>
          <Truck className='w-8 h-8 text-gray-700' />
          <div>
            <h5 className='text-lg font-semibold'>Envíos</h5>
            <p className='text-sm text-gray-500 flex flex-row'>
              Gratis sobre los $20.000, rápidos y confiables en todo Chile
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className='flex items-center gap-3'>
          <RefreshCw className='w-8 h-8 text-gray-700' />
          <div>
            <h5 className='text-lg font-semibold'>Transparente</h5>
            <p className='text-sm text-gray-500'>
              Política de devoluciones sin complicaciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
