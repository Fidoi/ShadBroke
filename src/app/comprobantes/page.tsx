import { getAllTransactions } from '@/actions/transbank/get';

export default async function Comprobantes() {
  const comprobantes = await getAllTransactions();

  if (!comprobantes.success) {
    return <div>Error: {comprobantes.message}</div>;
  }

  return (
    <div>
      {comprobantes.data?.map((t) => (
        <div key={t.orderId}>
          <p>Orden: {t.orderId}</p>
          <p>Monto: {t.amount}</p>
          <p>Estado: {t.status}</p>
          <p>Fecha: {new Date(t.createdAt).toLocaleString()}</p>
          <p>Token: {t.token}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
