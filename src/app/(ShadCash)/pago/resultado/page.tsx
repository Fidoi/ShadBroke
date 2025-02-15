import { commitWebpayTransaction } from '@/actions/transbank/commit';

interface Props {
  searchParams: Promise<{ token_ws?: string }>;
}

export default async function ResultadoPago({ searchParams }: Props) {
  const params = await searchParams;
  const token = params.token_ws;

  if (!token) {
    return (
      <div className='p-8 text-red-500'>
        <h1 className='text-2xl font-bold'>Error: Token no proporcionado</h1>
      </div>
    );
  }

  try {
    const result = await commitWebpayTransaction(token);

    return (
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>Resultado del Pago</h1>
        <div className='space-y-2'>
          <p>
            <strong>Orden:</strong> {result.buy_order}
          </p>
          <p>
            <strong>Monto:</strong> ${result.amount.toLocaleString()}
          </p>
          <p
            className={`text-${
              result.status === 'AUTHORIZED' ? 'green' : 'red'
            }-500`}
          >
            <strong>Estado:</strong> {result.status}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='p-8 text-red-500'>
        <h1 className='text-2xl font-bold'>Error en el pago</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
}
